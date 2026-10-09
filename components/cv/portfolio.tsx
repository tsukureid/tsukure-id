'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type Item = { id: string; title: string; slug: string; category: string; description: string; useCase: string | null; image: string; tags: string[] };
const LABELS: Record<string, string> = { professional: 'Professional', ats: 'ATS', 'fresh-graduate': 'Fresh Graduate', redesign: 'Redesign' };

/** Portfolio dengan modal internal (tidak keluar dari /cv). */
export function CvPortfolio({ items }: { items: Item[] }) {
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState<Item | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const cats = ['all', ...Array.from(new Set(items.map((i) => i.category)))];
  const shown = cat === 'all' ? items : items.filter((i) => i.category === cat);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <div>
      {cats.length > 2 && (
        <div role="group" aria-label="Filter kategori" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
              className={cn('min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors', cat === c ? 'border-brand-navy bg-brand-navy text-white' : 'border-brand-navy/20 bg-white text-brand-navy hover:bg-brand-light')}>
              {c === 'all' ? 'Semua' : LABELS[c] ?? c}
            </button>
          ))}
        </div>
      )}
      <ul className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
        {shown.map((p, index) => (
          <li
            key={p.id}
            style={{ animationDelay: `${index * 100}ms` }}
            className="w-[72%] shrink-0 snap-start motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal sm:w-auto"
          >
            <button type="button" onClick={() => { setOpen(p); track('portfolio_item_view', { item: p.slug }); }}
              className="group block w-full overflow-hidden rounded-xl2 border border-brand-navy/10 bg-white text-left shadow-soft transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none">
              <span className="relative block aspect-[3/4] overflow-hidden bg-brand-light">
                <Image src={p.image} alt={`Contoh CV: ${p.title}`} unoptimized={p.image.startsWith('http')} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 72vw" className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none" />
              </span>
              <span className="block p-4">
                <span className="block text-xs font-semibold text-brand-navy/60">{LABELS[p.category] ?? p.category}</span>
                <span className="mt-0.5 block font-bold text-brand-navy">{p.title}</span>
                <span className="mt-1 block text-sm text-brand-ink/65">Lihat lebih besar</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dialog} onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dialog.current) setOpen(null); }}
        aria-label={open ? `Contoh CV: ${open.title}` : 'Contoh CV'} className="m-auto w-[min(92vw,34rem)] rounded-xl2 p-0 backdrop:bg-brand-navy/70">
        {open && (
          <div className="animate-premium-reveal p-4 sm:p-6 motion-reduce:animate-none">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs font-semibold text-brand-navy/60">{LABELS[open.category] ?? open.category}</p><h3 className="text-xl font-bold">{open.title}</h3></div>
              <button type="button" autoFocus onClick={() => setOpen(null)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-200 hover:rotate-90 hover:bg-brand-light motion-reduce:transform-none motion-reduce:transition-none" aria-label="Tutup">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <div className="relative mt-4 aspect-[3/4] w-full overflow-hidden rounded-lg bg-brand-light">
              <Image src={open.image} alt={`Contoh CV: ${open.title}`} unoptimized={open.image.startsWith('http')} fill sizes="(min-width:640px) 34rem, 92vw" className="object-contain" />
            </div>
            <p className="mt-4 text-[15px] text-brand-ink/75">{open.description}</p>
            {open.useCase && <p className="mt-2 text-sm text-brand-ink/60">Cocok untuk: {open.useCase}</p>}
          </div>
        )}
      </dialog>
    </div>
  );
}
