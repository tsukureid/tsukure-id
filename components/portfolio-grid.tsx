'use client';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TrackLink } from './track-link';

type Item = { id: string; title: string; slug: string; category: string; description: string; image: string; tags: string[] };
export const PORTFOLIO_CATEGORIES = [
  { value: 'all', label: 'All' }, { value: 'professional', label: 'Professional' }, { value: 'ats', label: 'ATS' },
  { value: 'fresh-graduate', label: 'Fresh Graduate' }, { value: 'redesign', label: 'Redesign' },
];

export function PortfolioGrid({ items }: { items: Item[] }) {
  const [cat, setCat] = useState('all');
  const shown = cat === 'all' ? items : items.filter((i) => i.category === cat);
  return (
    <div>
      <div role="group" aria-label="Filter kategori" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {PORTFOLIO_CATEGORIES.map((c) => (
          <button
            key={c.value} type="button" aria-pressed={cat === c.value} onClick={() => setCat(c.value)}
            className={cn('min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors',
              cat === c.value ? 'border-brand-navy bg-brand-navy text-white' : 'border-brand-navy/20 bg-white text-brand-navy hover:bg-brand-light')}
          >{c.label}</button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="mt-8 rounded-xl2 bg-brand-light p-6 text-brand-navy">Belum ada contoh di kategori ini.</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.id}>
              <article className="card h-full overflow-hidden p-0">
                <div className="relative aspect-[3/4] bg-brand-light">
                  <Image src={p.image} alt={`Contoh CV: ${p.title}`} unoptimized={p.image.startsWith("http")} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover object-top" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-medium text-brand-blue-dark">{PORTFOLIO_CATEGORIES.find((c) => c.value === p.category)?.label ?? p.category}</p>
                  <h3 className="mt-1 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-brand-ink/70">{p.description}</p>
                  {p.tags.length > 0 && <ul className="mt-3 flex flex-wrap gap-1.5">{p.tags.map((t) => <li key={t} className="rounded-full bg-brand-light px-2.5 py-1 text-xs text-brand-navy">{t}</li>)}</ul>}
                  <TrackLink href={`/portfolio/${p.slug}`} event="portfolio_view" eventParams={{ item: p.slug }} className="btn-secondary mt-4 w-full">Lihat Detail</TrackLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
