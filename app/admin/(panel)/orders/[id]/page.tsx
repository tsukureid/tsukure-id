import { notFound } from 'next/navigation';
import { asc, desc, eq } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db';
import { formatRupiah } from '@/lib/utils';
import { ORDER_STATUSES } from '@/lib/db-schema';
import { buildWhatsappUrl } from '@/lib/whatsapp';
import { saveInternalNotes, updateOrderStatus, verifyPayment } from '../../../actions';

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const [row] = await db.select({ o: schema.orders, c: schema.customers, s: schema.services }).from(schema.orders)
    .innerJoin(schema.customers, eq(schema.orders.customerId, schema.customers.id))
    .innerJoin(schema.services, eq(schema.orders.serviceId, schema.services.id)).where(eq(schema.orders.id, id)).limit(1);
  if (!row) notFound();
  const { o, c, s } = row;
  const [atts, pays, hist] = await Promise.all([
    db.select().from(schema.orderAttachments).where(eq(schema.orderAttachments.orderId, id)),
    db.select().from(schema.payments).where(eq(schema.payments.orderId, id)).orderBy(desc(schema.payments.createdAt)),
    db.select().from(schema.orderHistory).where(eq(schema.orderHistory.orderId, id)).orderBy(asc(schema.orderHistory.createdAt)),
  ]);
  const wa = buildWhatsappUrl(c.whatsapp, `Halo ${c.name}, soal pesanan #${o.orderNumber} di TSUKURE.ID.`);
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-extrabold">#{o.orderNumber}</h1>
      <section className="card grid gap-3 sm:grid-cols-2 text-sm">
        <p><b>Pelanggan:</b> {c.name}</p><p><b>Email:</b> {c.email}</p>
        <p><b>WhatsApp:</b> <a className="underline" href={wa} target="_blank" rel="noopener noreferrer">{c.whatsapp}</a></p>
        <p><b>Layanan:</b> {s.name}</p><p><b>Posisi:</b> {o.targetPosition}</p><p><b>Perusahaan:</b> {o.targetCompany ?? '-'}</p>
        <p><b>Total:</b> {formatRupiah(o.totalPrice)}</p><p><b>Sumber:</b> {[o.utmSource, o.utmMedium, o.utmCampaign, o.utmContent].filter(Boolean).join(' / ') || '-'}</p>
        {o.linkedin && <p><b>LinkedIn:</b> {o.linkedin}</p>}{o.portfolioUrl && <p><b>Portfolio:</b> {o.portfolioUrl}</p>}
        {o.notes && <p className="sm:col-span-2"><b>Catatan:</b> {o.notes}</p>}
      </section>
      <section>
        <h2 className="text-xl font-bold">Status</h2>
        <form action={updateOrderStatus.bind(null, id)} className="mt-3 flex gap-3">
          <select name="status" defaultValue={o.status} className="field max-w-xs">{ORDER_STATUSES.map((st) => <option key={st}>{st}</option>)}</select>
          <button className="btn-primary">Ubah</button>
        </form>
      </section>
      <section>
        <h2 className="text-xl font-bold">Pembayaran</h2>
        {pays.map((p) => (
          <div key={p.id} className="card mt-3 text-sm">
            <p><b>{p.method}</b> • {p.status} • {formatRupiah(p.amount)}</p>
            {p.proofKey && <p className="mt-2"><a className="underline" href={`/api/files/proof/${p.id}`} target="_blank" rel="noopener noreferrer">Lihat bukti pembayaran</a></p>}
            {(p.status === 'PENDING' || p.status === 'UNPAID') && (
              <div className="mt-3 flex gap-2">
                <form action={verifyPayment.bind(null, p.id, id, 'PAID')}><button className="btn-primary min-h-10 text-sm">Tandai lunas</button></form>
                <form action={verifyPayment.bind(null, p.id, id, 'FAILED')}><button className="btn-secondary min-h-10 text-sm">Tolak</button></form>
              </div>
            )}
          </div>
        ))}
      </section>
      <section>
        <h2 className="text-xl font-bold">Lampiran</h2>
        {atts.length === 0 ? <p className="mt-2 text-sm text-brand-ink/60">Tidak ada lampiran.</p> : (
          <ul className="mt-2 space-y-1 text-sm">{atts.map((a) => <li key={a.id}><a className="underline" href={`/api/files/attachment/${a.id}`}>{a.fileName}</a> <span className="text-brand-ink/50">({a.kind})</span></li>)}</ul>
        )}
      </section>
      <section>
        <h2 className="text-xl font-bold">Catatan internal</h2>
        <form action={saveInternalNotes.bind(null, id)} className="mt-3 space-y-3"><textarea name="internalNotes" rows={4} defaultValue={o.internalNotes ?? ''} className="field" /><button className="btn-secondary">Simpan catatan</button></form>
      </section>
      <section>
        <h2 className="text-xl font-bold">Riwayat</h2>
        <ul className="mt-2 space-y-1 text-sm">{hist.map((h) => <li key={h.id}><span className="text-brand-ink/50">{h.createdAt.toLocaleString('id-ID')}</span> {h.action}{h.detail ? `: ${h.detail}` : ''}</li>)}</ul>
      </section>
    </div>
  );
}
