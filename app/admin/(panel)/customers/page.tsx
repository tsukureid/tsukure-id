import { desc } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db';
import { buildWhatsappUrl } from '@/lib/whatsapp';

export default async function CustomersPage() {
  const rows = await getDb().select().from(schema.customers).orderBy(desc(schema.customers.createdAt)).limit(300);
  return (
    <div>
      <h1 className="text-3xl font-extrabold">Pelanggan</h1>
      <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b bg-neutral-50"><tr><th className="p-3">Nama</th><th>Email</th><th>WhatsApp</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={3} className="p-6 text-brand-ink/60">Belum ada pelanggan.</td></tr>}
            {rows.map((c) => <tr key={c.id} className="border-b last:border-0"><td className="p-3">{c.name}</td><td>{c.email}</td><td><a className="underline" target="_blank" rel="noopener noreferrer" href={buildWhatsappUrl(c.whatsapp, `Halo ${c.name}, ini TSUKURE.ID.`)}>{c.whatsapp}</a></td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
