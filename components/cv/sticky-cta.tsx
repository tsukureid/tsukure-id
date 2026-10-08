'use client';
import { useEffect, useState } from 'react';
import { WaCta } from './cta';

/** CTA lengket khusus mobile. Muncul setelah hero, hilang saat CTA/harga terlihat, dan bisa ditutup. */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [covered, setCovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const targets = [...document.querySelectorAll('[data-hide-sticky]')];
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setCovered(seen.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  if (dismissed || !pastHero || covered) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-navy/10 bg-white/95 px-4 pt-3 backdrop-blur md:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto flex max-w-md items-center gap-2">
        <WaCta place="sticky" className="flex-1" />
        <button type="button" onClick={() => setDismissed(true)} aria-label="Tutup tombol" className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-brand-navy hover:bg-brand-light">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>
  );
}
