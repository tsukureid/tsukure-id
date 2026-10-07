import { notFound } from 'next/navigation';
import { isDbConfigured } from '@/lib/db';
import { getSetting, PAYMENT_SETTING_KEY } from '@/lib/data';
import { verifyOrderToken } from '@/lib/order-token';
import { getOrderByNumber } from '@/services/order-service';
import { buildWhatsappUrl, orderConfirmationMessage, whatsappNumber } from '@/lib/whatsapp';
import { formatRupiah } from '@/lib/utils';
import { pageMeta } from '@/lib/seo';
import { ProofForm } from '@/components/proof-form';
import { eq } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db';
import { TrackExternal } from '@/components/track-link';

export const dynamic = 'force-dynamic';
export const metadata = pageMeta({ title: 'Status Pesanan', path: '/pesan', noindex: true });

export default async function OrderStatusPage({ params, searchParams }: { params: Promise<{ orderNumber: string }>; searchParams: Promise<{ k?: string }> }) {
  const { orderNumber } = await params;
  const { k } = await searchParams;
  if (!isDbConfigured() || !verifyOrderToken(orderNumber, k)) notFound();
  const found = await getOrderByNumber(orderNumber);
  if (!found) notFound();
  const { order, service, customer } = found;
  const [payment] = (await getDb().select().from(schema.payments).where(eq(schema.payments.orderId, order.id))).slice(-1);
  const instructions = await getSetting(PAYMENT_SETTING_KEY);
  const n = whatsappNumber();
  const wa = n ? buildWhatsappUrl(n, orderConfirmationMessage({ orderNumber, customerName: customer.name, serviceName: service.name, totalPrice: order.totalPrice })) : null;
  const status = payment?.status ?? 'UNPAID';
  return (
    <section className="section">
      <div className="container-x max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">Pesanan kamu sudah dibuat.</h1>
          <p className="lead mt-3">Nomor pesanan: <strong className="text-brand-navy">#{orderNumber}</strong>. Simpan halaman ini untuk memantau pembayaran.</p>
        </div>
        <dl className="card grid gap-4 sm:grid-cols-2">
          <div><dt className="text-sm text-brand-ink/60">Layanan</dt><dd className="font-semibold text-brand-navy">{service.name}</dd></div>
          <div><dt className="text-sm text-brand-ink/60">Total</dt><dd className="font-semibold text-brand-navy">{order.totalPrice == null ? 'Menunggu konfirmasi harga' : formatRupiah(order.totalPrice)}</dd></div>
          <div><dt className="text-sm text-brand-ink/60">Status pesanan</dt><dd className="font-semibold text-brand-navy">{order.status}</dd></div>
          <div><dt className="text-sm text-brand-ink/60">Status pembayaran</dt><dd className="font-semibold text-brand-navy">{status}</dd></div>
        </dl>
        <div>
          <h2 className="text-xl font-bold">Cara bayar</h2>
          {instructions
            ? <p className="mt-3 whitespace-pre-line rounded-xl bg-brand-light p-5 text-[15px] text-brand-navy">{instructions}</p>
            : <p className="mt-3 rounded-xl bg-brand-light p-5 text-[15px] text-brand-navy">Instruksi pembayaran akan kami kirim lewat WhatsApp setelah kamu mengonfirmasi pesanan.</p>}
        </div>
        {(status === 'UNPAID' || status === 'FAILED') && order.status !== 'CANCELLED' && (
          <div><h2 className="text-xl font-bold">Unggah bukti pembayaran</h2><div className="mt-3"><ProofForm orderNumber={orderNumber} token={k!} /></div></div>
        )}
        {status === 'PENDING' && <p role="status" className="rounded-xl bg-brand-light p-5 text-brand-navy">Bukti pembayaran diterima. Admin akan memeriksanya.</p>}
        {wa
          ? <TrackExternal event="whatsapp_click" href={wa} className="btn-primary w-full">Konfirmasi via WhatsApp</TrackExternal>
          : <p className="text-sm text-brand-ink/60">Nomor WhatsApp bisnis belum dikonfigurasi (WHATSAPP_NUMBER).</p>}
      </div>
    </section>
  );
}
