import Link from 'next/link';
import { desc, eq } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db';
import { formatRupiah } from '@/lib/utils';

export default async function PaymentsPage() {
  const rows = await getDb().select({ p: schema.payments, o: schema.orders }).from(schema.payments)
    .innerJoin(schema.orders, eq(schema.payments.orderId, schema.orders.id)).orderBy(desc(schema.payments.createdAt)).limit(200);
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Pembayaran</h1>
      <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b bg-neutral-50"><tr><th className="p-3">Pesanan</th><th>Metode</th><th>Status</th><th>Jumlah</th><th>Bukti</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-brand-ink/60">Belum ada pembayaran.</td></tr>}
            {rows.map(({ p, o }) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-3"><Link className="underline" href={`/admin/orders/${o.id}`}>{o.orderNumber}</Link></td>
                <td>{p.method}</td><td>{p.status}</td><td>{formatRupiah(p.amount)}</td>
                <td>{p.proofKey ? <a className="underline" href={`/api/files/proof/${p.id}`} target="_blank" rel="noopener noreferrer">Lihat</a> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
