'use client';
import { track } from '@/lib/analytics';
import { CV_PORTFOLIO_ANCHOR, CV_WHATSAPP_URL } from '@/lib/cv-config';
import { cn } from '@/lib/utils';

function utmParams(): Record<string, string> {
  const out: Record<string, string> = {};
  const q = new URLSearchParams(window.location.search);
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const v = q.get(k);
    if (v) out[k] = v.slice(0, 120);
  }
  return out;
}

const BASE = 'group relative isolate inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-7 text-base font-bold transition-[color,background-color,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none';

function CtaContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 translate-x-[-220%] bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 group-hover:translate-x-[500%] motion-reduce:transition-none"
      />
      <span className="relative z-10">{children}</span>
    </>
  );
}

/** Semua tombol "Buat CV Sekarang" memakai satu URL WhatsApp dari lib/cv-config. UTM hanya dikirim ke analytics, URL WhatsApp tidak diubah. */
export function WaCta({ place, onDark = false, className, children = 'Buat CV Sekarang' }: { place: string; onDark?: boolean; className?: string; children?: React.ReactNode }) {
  return (
    <a
      href={CV_WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
      onClick={() => { track('whatsapp_click', { place, ...utmParams() }); if (place === 'hero') track('hero_cta_click', utmParams()); }}
      className={cn(BASE, 'bg-tsukure-yellow text-brand-ink shadow-soft', onDark ? 'hover:bg-white hover:text-brand-navy' : 'hover:bg-brand-navy hover:text-white', className)}
    >
      <CtaContent>{children}</CtaContent>
    </a>
  );
}

export function PortfolioAnchorCta({ className, children = 'Lihat Portfolio' }: { className?: string; children?: React.ReactNode }) {
  return (
    <a href={CV_PORTFOLIO_ANCHOR} onClick={() => track('portfolio_anchor_click', utmParams())}
      className={cn(BASE, 'border-2 border-brand-navy bg-white text-brand-navy hover:bg-brand-light', className)}>
      <CtaContent>{children}</CtaContent>
    </a>
  );
}
