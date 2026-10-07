'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { getDb, schema } from '@/lib/db';
import { createSession, destroySession, requireAdmin } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';
import { allow } from '@/lib/rate-limit';
import { ENTITIES, type FieldDef } from '@/lib/admin-entities';
import { ORDER_STATUSES, type OrderStatus } from '@/lib/db-schema';
import { addHistory, setOrderStatus } from '@/services/order-service';
import { manualPaymentService } from '@/services/payment-service';
import { PAYMENT_SETTING_KEY, SOCIAL_SETTING_KEYS } from '@/lib/data';

export type AdminState = { error?: string; ok?: boolean };

const DUMMY_HASH = '$2a$10$CwTycUXWue0Thq9StjUM0uJ8.3q8Kq1bYQ0x0yQ0m0y9kQe3m8m7S';

export async function login(_p: AdminState, fd: FormData): Promise<AdminState> {
  const ip = ((await headers()).get('x-forwarded-for') ?? 'local').split(',')[0]!.trim();
  if (!allow(`login:${ip}`, 5, 10 * 60_000)) return { error: 'Terlalu banyak percobaan. Coba lagi nanti.' };
  const parsed = loginSchema.safeParse({ email: fd.get('email'), password: fd.get('password') });
  if (!parsed.success) return { error: 'Email atau password salah.' };
  const [admin] = await getDb().select().from(schema.admins).where(eq(schema.admins.email, parsed.data.email)).limit(1);
  const valid = await bcrypt.compare(parsed.data.password, admin?.passwordHash ?? DUMMY_HASH);
  if (!admin || !valid) return { error: 'Email atau password salah.' };
  await createSession({ id: admin.id, email: admin.email, name: admin.name });
  redirect('/admin');
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}

function parseField(f: FieldDef, fd: FormData): { value?: unknown; error?: string } {
  const raw = fd.get(f.name);
  const str = typeof raw === 'string' ? raw.trim() : '';
  switch (f.type) {
    case 'bool': return { value: fd.get(f.name) === 'on' };
    case 'number': {
      if (!str) return f.required ? { error: `${f.label} wajib diisi` } : { value: null };
      const n = Number(str);
      if (!Number.isInteger(n) || n < 0) return { error: `${f.label} harus bilangan bulat ≥ 0` };
      return { value: n };
    }
    case 'lines': {
      const arr = str.split('\n').map((s) => s.trim()).filter(Boolean);
      return { value: arr };
    }
    case 'select': {
      if (!f.options?.includes(str)) return { error: `${f.label} tidak valid` };
      return { value: str };
    }
    default:
      if (!str) return f.required ? { error: `${f.label} wajib diisi` } : { value: null };
      return { value: str };
  }
}

export async function saveEntity(entityKey: string, id: string | null, _p: AdminState, fd: FormData): Promise<AdminState> {
  await requireAdmin();
  const def = ENTITIES[entityKey];
  if (!def) return { error: 'Data tidak dikenal.' };
  const values: Record<string, unknown> = {};
  for (const f of def.fields) {
    const r = parseField(f, fd);
    if (r.error) return { error: r.error };
    values[f.name] = r.value;
  }
  if (typeof values.slug === 'string' && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(values.slug)) return { error: 'Slug hanya huruf kecil, angka, dan tanda hubung.' };
  if (entityKey === 'testimonials' && (Number(values.rating) < 1 || Number(values.rating) > 5)) return { error: 'Rating harus 1 sampai 5.' };
  const db = getDb();
  const table = def.table as never;
  try {
    if (id) await db.update(table).set(values as never).where(eq((def.table as { id: never }).id, id as never));
    else await db.insert(table).values({ id: crypto.randomUUID(), ...values } as never);
  } catch (e) {
    console.error('[admin] save failed', e instanceof Error ? e.message : e);
    return { error: /Duplicate entry/i.test(String(e)) ? 'Slug sudah dipakai.' : 'Gagal menyimpan.' };
  }
  revalidatePath('/', 'layout');
  redirect(`/admin/${entityKey}`);
}

export async function deleteEntity(entityKey: string, id: string): Promise<void> {
  await requireAdmin();
  const def = ENTITIES[entityKey];
  if (!def) return;
  await getDb().delete(def.table as never).where(eq((def.table as { id: never }).id, id as never));
  revalidatePath('/', 'layout');
  redirect(`/admin/${entityKey}`);
}

export async function togglePublish(entityKey: string, id: string, next: boolean): Promise<void> {
  await requireAdmin();
  const def = ENTITIES[entityKey];
  if (!def?.publishField) return;
  const idCol = (def.table as { id: never }).id;
  await getDb().update(def.table as never).set({ [def.publishField]: next } as never).where(eq(idCol, id as never));
  revalidatePath('/', 'layout');
  redirect(`/admin/${entityKey}`);
}

export async function updateOrderStatus(orderId: string, fd: FormData): Promise<void> {
  const admin = await requireAdmin();
  const status = String(fd.get('status')) as OrderStatus;
  if (!ORDER_STATUSES.includes(status)) return;
  await setOrderStatus(orderId, status, admin.email);
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function saveInternalNotes(orderId: string, fd: FormData): Promise<void> {
  const admin = await requireAdmin();
  const notes = String(fd.get('internalNotes') ?? '').slice(0, 4000);
  await getDb().update(schema.orders).set({ internalNotes: notes }).where(eq(schema.orders.id, orderId));
  await addHistory(orderId, 'NOTE_UPDATED', `${admin.email} memperbarui catatan internal`);
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function verifyPayment(paymentId: string, orderId: string, outcome: 'PAID' | 'FAILED'): Promise<void> {
  const admin = await requireAdmin();
  await manualPaymentService.verifyPayment(paymentId, outcome);
  if (outcome === 'PAID') await setOrderStatus(orderId, 'CONFIRMED', admin.email);
  else await setOrderStatus(orderId, 'WAITING_PAYMENT', admin.email);
  await addHistory(orderId, outcome === 'PAID' ? 'PAYMENT_VERIFIED' : 'PAYMENT_REJECTED', admin.email);
  revalidatePath('/admin', 'layout');
}

export async function saveSettings(_p: AdminState, fd: FormData): Promise<AdminState> {
  await requireAdmin();
  const db = getDb();
  const pairs: Array<[string, string]> = [
    [PAYMENT_SETTING_KEY, String(fd.get(PAYMENT_SETTING_KEY) ?? '').trim()],
    [SOCIAL_SETTING_KEYS.instagram, String(fd.get(SOCIAL_SETTING_KEYS.instagram) ?? '').trim()],
    [SOCIAL_SETTING_KEYS.tiktok, String(fd.get(SOCIAL_SETTING_KEYS.tiktok) ?? '').trim()],
  ];
  for (const [key, value] of pairs) {
    if (key !== PAYMENT_SETTING_KEY && value && !/^https:\/\//.test(value)) return { error: 'Tautan sosial media harus diawali https://' };
  }
  for (const [key, value] of pairs) {
    if (!value) await db.delete(schema.siteSettings).where(eq(schema.siteSettings.key, key));
    else await db.insert(schema.siteSettings).values({ key, value }).onDuplicateKeyUpdate({ set: { value } });
  }
  revalidatePath('/', 'layout');
  return { ok: true };
}
