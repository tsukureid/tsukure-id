import { formatRupiah, cn } from '@/lib/utils';
import type { PlanView } from '@/lib/data';
import { TrackLink } from './track-link';

export function PricingGrid({ plans, whatsappHref }: { plans: PlanView[]; whatsappHref: string | null }) {
  if (plans.length === 0) {
    return (
      <div className="rounded-xl2 bg-brand-light p-8 text-center">
        <p className="text-lg font-semibold text-brand-navy">Daftar harga sedang disiapkan.</p>
        <p className="mt-2 text-brand-ink/70">Tanya harga dan paket yang cocok langsung lewat WhatsApp.</p>
        {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">Chat WhatsApp</a>}
      </div>
    );
  }
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((p) => (
        <li key={p.id}>
          <article className={cn('card flex h-full flex-col', p.popular && 'border-brand-blue ring-2 ring-brand-blue')}>
            {p.popular && <p className="mb-3 w-fit rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-semibold text-brand-navy">Paling dipilih</p>}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="mt-1 text-[15px] text-brand-ink/70">{p.description}</p>
            <p className="mt-5 font-display text-3xl font-extrabold text-brand-navy">{formatRupiah(p.price)}</p>
            <ul className="mt-5 flex-1 space-y-2.5 text-[15px]">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue-dark" fill="none" stroke="currentColor" strokeWidth="2.500" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5 9-10" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <TrackLink href={`/pesan?paket=${p.id}`} event="order_start" eventParams={{ plan: p.name }} className={cn('mt-6 w-full', p.popular ? 'btn-primary' : 'btn-secondary')}>Pesan Paket Ini</TrackLink>
          </article>
        </li>
      ))}
    </ul>
  );
}
