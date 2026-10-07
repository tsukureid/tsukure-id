'use client';
import { useId, useState } from 'react';

/** Slider sebelum/sesudah. Input range di atasnya membuat slider bisa dipakai sentuh, mouse, dan keyboard. */
export function BeforeAfterSlider({ before, after }: { before: React.ReactNode; after: React.ReactNode }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative select-none overflow-hidden rounded-xl2 border border-brand-navy/10 bg-white shadow-soft">
        <div>{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{before}</div>
        <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy">Sebelum</span>
        <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-brand-navy px-2.5 py-1 text-xs font-semibold text-white">Sesudah</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand-blue" style={{ left: `${pos}%` }}>
          <div className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-blue text-brand-navy shadow-soft" aria-hidden>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
          </div>
        </div>
        <label htmlFor={id} className="sr-only">Geser untuk membandingkan sebelum dan sesudah</label>
        <input
          id={id} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" style={{ touchAction: 'pan-y' }}
        />
      </div>
    </div>
  );
}
