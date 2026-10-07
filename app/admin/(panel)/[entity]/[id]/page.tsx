import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { ENTITIES } from '@/lib/admin-entities';
import { getDb } from '@/lib/db';
import { EntityForm } from '@/components/admin/entity-form';

export default async function EntityEdit({ params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  const def = ENTITIES[entity];
  if (!def) notFound();
  let initial: Record<string, unknown> = {};
  if (id !== 'new') {
    const table = def.table as { id: never };
    const [row] = (await getDb().select().from(def.table as never).where(eq(table.id, id as never)).limit(1)) as unknown as Array<Record<string, unknown>>;
    if (!row) notFound();
    initial = row;
  }
  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold">{id === 'new' ? `Tambah ${def.title}` : `Ubah ${def.title}`}</h1>
      <EntityForm entityKey={entity} id={id === 'new' ? null : id} fields={def.fields} initial={initial} />
    </div>
  );
}
