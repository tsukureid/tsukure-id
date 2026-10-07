'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TrackLink } from './track-link';

const LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/harga', label: 'Harga' },
  { href: '/#cara-kerja', label: 'Cara Kerja' },
  { href: '/faq', label: 'FAQ' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={cn('sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow', scrolled && 'shadow-[0_1px_0_rgba(20,33,61,0.1)]')}>
      <nav aria-label="Navigasi utama" className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-brand-navy" onClick={() => setOpen(false)}>
          TSUKURE<span className="text-brand-blue-dark">.ID</span>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="rounded-full px-3.5 py-2 text-[15px] font-medium text-brand-navy hover:bg-brand-light">{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <TrackLink href="/pesan" event="hero_cta_click" eventParams={{ place: 'navbar' }} className="btn-primary min-h-11 whitespace-nowrap px-4 text-[13px] sm:px-5 sm:text-sm">Pesan Sekarang</TrackLink>
          <button
            type="button" className="grid h-11 w-11 place-items-center rounded-full text-brand-navy hover:bg-brand-light lg:hidden"
            aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? 'Tutup menu' : 'Buka menu'} onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div id="menu-mobile" className="border-t border-brand-navy/10 bg-white lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3.5 text-base font-medium text-brand-navy active:bg-brand-light">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
