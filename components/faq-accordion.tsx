'use client';
import { track } from '@/lib/analytics';

export function FAQAccordion({ items }: { items: Array<{ id: string; question: string; answer: string }> }) {
  return (
    <div className="divide-y divide-brand-navy/10 rounded-xl2 border border-brand-navy/10 bg-white">
      {items.map((f) => (
        <details key={f.id} className="group px-5 py-1" onToggle={(e) => { if ((e.currentTarget as HTMLDetailsElement).open) track('faq_open', { id: f.id }); }}>
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left text-base font-semibold text-brand-navy [&::-webkit-details-marker]:hidden">
            {f.question}
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
          </summary>
          <p className="pb-4 text-[15px] leading-relaxed text-brand-ink/75">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
