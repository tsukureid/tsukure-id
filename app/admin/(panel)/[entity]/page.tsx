import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ENTITIES } from '@/lib/admin-entities';
import { getDb } from '@/lib/db';
import { deleteEntity, togglePublish } from '../../actions';

type Row = Record<string, unknown> & { id: string };

export default async function EntityList({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const def = ENTITIES[entity];
  if (!def) notFound();
  const rows = (await getDb().select().from(def.table as never)) as unknown as Row[];
  const pf = def.publishField;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold">{def.title}</h1>
        <Link href={`/admin/${entity}/new`} className="btn-primary">Tambah</Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b bg-neutral-50"><tr>{def.listColumns.map((c) => <th key={c} className="p-3">{c}</th>)}{pf && <th>Tayang</th>}<th>Aksi</th></tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={def.listColumns.length + 2} className="p-6 text-brand-ink/60">Belum ada data.</td></tr>}
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-0">
                {def.listColumns.map((c) => <td key={c} className="p-3">{String(r[c] ?? '-')}</td>)}
                {pf && <td><form action={togglePublish.bind(null, entity, r.id, !r[pf])}><button className="underline">{r[pf] ? 'Ya (sembunyikan)' : 'Tidak (tayangkan)'}</button></form></td>}
                <td className="flex gap-3 p-3">
                  <Link className="underline" href={`/admin/${entity}/${r.id}`}>Ubah</Link>
                  <form action={deleteEntity.bind(null, entity, r.id)}><button className="text-red-700 underline">Hapus</button></form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
