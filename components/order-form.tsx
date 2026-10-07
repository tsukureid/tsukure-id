'use client';
import { useActionState, useEffect, useRef, useState } from 'react';
import { submitOrder, type FormState } from '@/app/(site)/pesan/actions';
import { readAttribution } from './utm-capture';
import { track } from '@/lib/analytics';
import type { ServiceView } from '@/lib/data';

const initial: FormState = {};

function Field({ name, label, errors, hint, children }: { name: string; label: string; errors?: Record<string, string>; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      {children}
      {hint && <p className="mt-1 text-sm text-brand-ink/55">{hint}</p>}
      {errors?.[name] && <p id={`${name}-err`} role="alert" className="err">{errors[name]}</p>}
    </div>
  );
}

export function OrderForm({ services, defaultService, planId }: { services: ServiceView[]; defaultService?: string; planId?: string }) {
  const [state, action, pending] = useActionState(submitOrder, initial);
  const [attr, setAttr] = useState<Record<string, string>>({});
  const started = useRef(false);
  useEffect(() => { setAttr(readAttribution()); }, []);
  const fe = state.fieldErrors;
  const invalid = (n: string) => (fe?.[n] ? { 'aria-invalid': true, 'aria-describedby': `${n}-err` } : {});

  return (
    <form
      action={action} className="space-y-6" encType="multipart/form-data"
      onFocus={() => { if (!started.current) { started.current = true; track('order_start'); } }}
      onSubmit={() => track('order_submit')}
    >
      {state.error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800">{state.error}</p>}
      <input type="hidden" name="planId" value={planId ?? ''} />
      {(['utmSource', 'utmMedium', 'utmCampaign', 'utmContent'] as const).map((k) => (
        <input key={k} type="hidden" name={k} value={attr[k.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)] ?? ''} />
      ))}
      <input type="hidden" name="landingPath" value={attr.landingPath ?? ''} />

      <Field name="serviceSlug" label="Layanan CV" errors={fe}>
        <select id="serviceSlug" name="serviceSlug" required defaultValue={defaultService ?? ''} className="field" {...invalid('serviceSlug')}>
          <option value="" disabled>Pilih layanan</option>
          {services.map((s) => <option key={s.id} value={s.slug}>{s.name}</option>)}
        </select>
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="customerName" label="Nama" errors={fe}><input id="customerName" name="customerName" required autoComplete="name" className="field" {...invalid('customerName')} /></Field>
        <Field name="whatsapp" label="WhatsApp" errors={fe} hint="Contoh: 0812xxxxxxxx"><input id="whatsapp" name="whatsapp" required type="tel" inputMode="tel" autoComplete="tel" className="field" {...invalid('whatsapp')} /></Field>
      </div>
      <Field name="email" label="Email" errors={fe}><input id="email" name="email" required type="email" autoComplete="email" className="field" {...invalid('email')} /></Field>
      <Field name="targetPosition" label="Posisi yang dilamar" errors={fe}><input id="targetPosition" name="targetPosition" required className="field" {...invalid('targetPosition')} /></Field>
      <Field name="notes" label="Catatan (opsional)" errors={fe}><textarea id="notes" name="notes" rows={4} className="field" placeholder="Hal yang ingin kami tahu soal CV-mu" /></Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="targetCompany" label="Perusahaan tujuan (opsional)" errors={fe}><input id="targetCompany" name="targetCompany" className="field" /></Field>
        <Field name="linkedin" label="LinkedIn (opsional)" errors={fe}><input id="linkedin" name="linkedin" type="url" inputMode="url" placeholder="https://" className="field" {...invalid('linkedin')} /></Field>
      </div>
      <Field name="portfolioUrl" label="Portfolio online (opsional)" errors={fe}><input id="portfolioUrl" name="portfolioUrl" type="url" inputMode="url" placeholder="https://" className="field" {...invalid('portfolioUrl')} /></Field>
      <Field name="cvLama" label="Unggah CV lama (opsional)" hint="PDF, DOC, DOCX, JPG, atau PNG. Maksimal 5 MB per file."><input id="cvLama" name="cvLama" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="field" /></Field>
      <Field name="dokumen" label="Dokumen tambahan (opsional)" hint="Boleh pilih beberapa file."><input id="dokumen" name="dokumen" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="field" /></Field>
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">{pending ? 'Mengirim pesanan...' : 'Kirim Pesanan'}</button>
    </form>
  );
}
