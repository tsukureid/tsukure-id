'use client';
import { useActionState } from 'react';
import { saveEntity, type AdminState } from '@/app/admin/actions';
import type { FieldDef } from '@/lib/admin-entities';

export function EntityForm({ entityKey, id, fields, initial }: { entityKey: string; id: string | null; fields: FieldDef[]; initial: Record<string, unknown> }) {
  const [state, action, pending] = useActionState(saveEntity.bind(null, entityKey, id), {} as AdminState);
  const val = (f: FieldDef): string => {
    const v = initial[f.name];
    if (Array.isArray(v)) return v.join('\n');
    return v == null ? '' : String(v);
  };
  return (
    <form action={action} className="max-w-2xl space-y-5">
      {state.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800">{state.error}</p>}
      {fields.map((f) => (
        <div key={f.name}>
          {f.type === 'bool' ? (
            <label className="flex min-h-11 items-center gap-3 text-sm font-semibold text-brand-navy">
              <input type="checkbox" name={f.name} defaultChecked={Boolean(initial[f.name] ?? (f.name === 'isPublished' || f.name === 'active'))} className="h-5 w-5" /> {f.label}
            </label>
          ) : (
            <>
              <label htmlFor={f.name} className="label">{f.label}</label>
              {f.type === 'textarea' || f.type === 'lines' ? (
                <textarea id={f.name} name={f.name} rows={f.type === 'lines' ? 5 : 4} defaultValue={val(f)} required={f.required && f.type === 'textarea'} className="field" />
              ) : f.type === 'select' ? (
                <select id={f.name} name={f.name} defaultValue={val(f) || f.options?.[0]} className="field">{f.options?.map((o) => <option key={o} value={o}>{o}</option>)}</select>
              ) : (
                <input id={f.name} name={f.name} type={f.type === 'number' ? 'number' : 'text'} min={f.type === 'number' ? 0 : undefined} defaultValue={val(f)} required={f.required} className="field" />
              )}
              {f.help && <p className="mt-1 text-sm text-brand-ink/55">{f.help}</p>}
            </>
          )}
        </div>
      ))}
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">{pending ? 'Menyimpan...' : 'Simpan'}</button>
    </form>
  );
}
