import { count, eq, inArray, sql } from 'drizzle-orm';
import { getDb, isDbConfigured, schema } from '@/lib/db';
import { formatRupiah } from '@/lib/utils';

export default async function Dashboard() {
  if (!isDbConfigured()) return <p>DATABASE_URL belum diisi.</p>;
  const db = getDb();
  const orderCount = async (statuses: Array<(typeof schema.orders.$inferSelect)['status']>) =>
    (await db.select({ n: count() }).from(schema.orders).where(inArray(schema.orders.status, statuses)))[0]?.n ?? 0;
  const [total, pending, inProgress, revision, completed, payPending, revenue, bySource] = await Promise.all([
    db.select({ n: count() }).from(schema.orders).then((r) => r[0]?.n ?? 0),
    orderCount(['PENDING', 'WAITING_PAYMENT']),
    orderCount(['CONFIRMED', 'IN_PROGRESS']),
    orderCount(['REVISION']),
    orderCount(['COMPLETED']),
    db.select({ n: count() }).from(schema.payments).where(eq(schema.payments.status, 'PENDING')).then((r) => r[0]?.n ?? 0),
    db.select({ s: sql<number>`coalesce(sum(${schema.orders.totalPrice}),0)` }).from(schema.orders)
      .innerJoin(schema.payments, eq(schema.payments.orderId, schema.orders.id)).where(eq(schema.payments.status, 'PAID')).then((r) => Number(r[0]?.s ?? 0)),
    db.select({ source: schema.orders.utmSource, n: count() }).from(schema.orders).groupBy(schema.orders.utmSource),
  ]);
  const cards: Array<[string, string | number]> = [
    ['Total pesanan', total], ['Menunggu pembayaran', pending], ['Sedang dikerjakan', inProgress], ['Revisi', revision],
    ['Selesai', completed], ['Bukti bayar perlu dicek', payPending], ['Pendapatan (terbayar)', formatRupiah(revenue)],
  ];
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([k, v]) => <div key={k} className="card"><dt className="text-sm text-brand-ink/60">{k}</dt><dd className="mt-1 font-display text-2xl font-extrabold text-brand-navy">{v}</dd></div>)}
      </dl>
      <h2 className="mt-10 text-xl font-bold">Pesanan per sumber</h2>
      {bySource.length === 0 ? <p className="mt-3 text-brand-ink/60">Belum ada pesanan.</p> : (
        <table className="mt-3 w-full max-w-md text-left text-sm"><thead><tr className="border-b"><th className="py-2">Sumber (utm_source)</th><th>Pesanan</th></tr></thead>
          <tbody>{bySource.map((r) => <tr key={r.source ?? 'direct'} className="border-b"><td className="py-2">{r.source ?? '(langsung / tanpa UTM)'}</td><td>{r.n}</td></tr>)}</tbody></table>
      )}
    </div>
  );
}
