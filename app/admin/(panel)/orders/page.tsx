import Link from 'next/link';
import { desc, eq } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db';
import { formatRupiah } from '@/lib/utils';
import { ORDER_STATUSES, type OrderStatus } from '@/lib/db-schema';

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const filter = ORDER_STATUSES.includes(status as OrderStatus) ? (status as OrderStatus) : null;
  const q = getDb().select({ o: schema.orders, c: schema.customers, s: schema.services })
    .from(schema.orders).innerJoin(schema.customers, eq(schema.orders.customerId, schema.customers.id))
    .innerJoin(schema.services, eq(schema.orders.serviceId, schema.services.id));
  const rows = await (filter ? q.where(eq(schema.orders.status, filter)) : q).orderBy(desc(schema.orders.createdAt)).limit(200);
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Pesanan</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/admin/orders" className="rounded-full border px-3 py-1.5 text-sm">Semua</Link>
        {ORDER_STATUSES.map((s) => <Link key={s} href={`/admin/orders?status=${s}`} className={`rounded-full border px-3 py-1.5 text-sm ${filter === s ? 'bg-brand-navy text-white' : ''}`}>{s}</Link>)}
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b bg-neutral-50"><tr><th className="p-3">Nomor</th><th>Pelanggan</th><th>Layanan</th><th>Status</th><th>Total</th><th>Sumber</th><th>Tanggal</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={7} className="p-6 text-brand-ink/60">Belum ada pesanan.</td></tr>}
            {rows.map(({ o, c, s }) => (
              <tr key={o.id} className="border-b last:border-0">
                <td className="p-3"><Link className="font-semibold text-brand-blue-dark underline" href={`/admin/orders/${o.id}`}>{o.orderNumber}</Link></td>
                <td>{c.name}</td><td>{s.name}</td><td>{o.status}</td><td>{formatRupiah(o.totalPrice)}</td><td>{o.utmSource ?? '-'}</td><td>{o.createdAt.toLocaleDateString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
