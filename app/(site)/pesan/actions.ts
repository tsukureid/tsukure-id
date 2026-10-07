'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { getDb, isDbConfigured, schema } from '@/lib/db';
import { checkUpload, orderSchema } from '@/lib/validation';
import { allow } from '@/lib/rate-limit';
import { orderToken, verifyOrderToken } from '@/lib/order-token';
import { storage } from '@/lib/storage';
import { createOrder, addHistory, getOrderByNumber, type UploadedFile } from '@/services/order-service';

export type FormState = { error?: string; fieldErrors?: Record<string, string> };

async function clientKey(): Promise<string> {
  const h = await headers();
  return (h.get('x-forwarded-for') ?? 'local').split(',')[0]!.trim();
}

async function readFiles(fd: FormData): Promise<{ files: UploadedFile[]; error?: string }> {
  const files: UploadedFile[] = [];
  const entries: Array<[UploadedFile['kind'], FormDataEntryValue[]]> = [['cv_lama', fd.getAll('cvLama')], ['dokumen', fd.getAll('dokumen')]];
  for (const [kind, list] of entries) {
    for (const f of list) {
      if (!(f instanceof File) || f.size === 0) continue;
      const check = checkUpload(f);
      if (!check.ok) return { files, error: `${f.name}: ${check.error}` };
      files.push({ kind, name: f.name, type: f.type, size: f.size, data: Buffer.from(await f.arrayBuffer()), ext: check.ext });
    }
  }
  if (files.length > 6) return { files, error: 'Maksimal 6 file per pesanan.' };
  return { files };
}

export async function submitOrder(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!isDbConfigured()) return { error: 'Sistem pemesanan belum aktif. Silakan hubungi kami lewat WhatsApp.' };
  if (!allow(`order:${await clientKey()}`, 5, 10 * 60_000)) return { error: 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.' };

  const parsed = orderSchema.safeParse(Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === 'string')));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return { fieldErrors, error: 'Periksa kembali isian yang ditandai.' };
  }
  const input = parsed.data;
  const { files, error } = await readFiles(fd);
  if (error) return { error };

  const db = getDb();
  const [service] = await db.select().from(schema.services).where(eq(schema.services.slug, input.serviceSlug)).limit(1);
  if (!service || !service.isPublished) return { fieldErrors: { serviceSlug: 'Layanan tidak ditemukan' }, error: 'Layanan tidak ditemukan.' };

  let price = service.startingPrice;
  const planId = fd.get('planId');
  if (typeof planId === 'string' && planId) {
    const [plan] = await db.select().from(schema.pricingPlans).where(eq(schema.pricingPlans.id, planId)).limit(1);
    if (plan?.active) price = plan.price;
  }

  let orderNumber: string;
  try {
    ({ orderNumber } = await createOrder(input, { id: service.id, name: service.name }, price, files));
  } catch (e) {
    console.error('[order] create failed', e instanceof Error ? e.message : e);
    return { error: 'Pesanan belum berhasil dibuat. Coba lagi, atau hubungi kami lewat WhatsApp.' };
  }
  redirect(`/pesan/${orderNumber}?k=${orderToken(orderNumber)}`);
}

export async function uploadProof(orderNumber: string, token: string, _prev: FormState, fd: FormData): Promise<FormState> {
  if (!verifyOrderToken(orderNumber, token)) return { error: 'Akses tidak valid.' };
  if (!allow(`proof:${await clientKey()}`, 8, 10 * 60_000)) return { error: 'Terlalu banyak percobaan. Coba lagi nanti.' };
  const f = fd.get('proof');
  if (!(f instanceof File) || f.size === 0) return { error: 'Pilih file bukti pembayaran.' };
  const check = checkUpload(f);
  if (!check.ok) return { error: check.error };
  if (f.type === 'application/msword' || f.name.toLowerCase().endsWith('.doc') || f.name.toLowerCase().endsWith('.docx')) return { error: 'Bukti pembayaran harus berupa gambar atau PDF.' };

  const found = await getOrderByNumber(orderNumber);
  if (!found) return { error: 'Pesanan tidak ditemukan.' };
  const key = await storage.save(`proofs/${found.order.id}`, Buffer.from(await f.arrayBuffer()), check.ext);
  const db = getDb();
  const [payment] = (await db.select().from(schema.payments).where(eq(schema.payments.orderId, found.order.id))).slice(-1);
  if (!payment) return { error: 'Data pembayaran tidak ditemukan.' };
  await db.update(schema.payments).set({ proofKey: key, status: 'PENDING' }).where(eq(schema.payments.id, payment.id));
  await db.update(schema.orders).set({ status: 'PAYMENT_REVIEW' }).where(eq(schema.orders.id, found.order.id));
  await addHistory(found.order.id, 'PROOF_UPLOADED', 'Pelanggan mengunggah bukti pembayaran');
  redirect(`/pesan/${orderNumber}?k=${token}`);
}
