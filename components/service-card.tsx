import { priceFromLabel } from '@/lib/utils';
import type { ServiceView } from '@/lib/data';
import { ServiceIcon } from './icons';
import { TrackLink } from './track-link';

export function ServiceCard({ s }: { s: ServiceView }) {
  return (
    <article className="card flex h-full flex-col">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand-blue-dark"><ServiceIcon name={s.icon} /></span>
      <h3 className="mt-4 text-xl font-bold">{s.name}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-brand-ink/75">{s.tagline}</p>
      <p className="mt-4 text-sm text-brand-ink/60">{priceFromLabel(s.startingPrice).prefix} <span className="font-semibold text-brand-navy">{priceFromLabel(s.startingPrice).amount}</span></p>
      <TrackLink href={`/layanan/${s.slug}`} event="service_view" eventParams={{ service: s.slug }} className="btn-secondary mt-4 w-full">Lihat Detail</TrackLink>
    </article>
  );
}
