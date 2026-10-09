'use client';
import { useRef, useState } from 'react';

/** Slider sebelum/sesudah yang bisa digeser dengan pointer, sentuhan, atau keyboard. */
export function BeforeAfterSlider({ before, after }: { before: React.ReactNode; after: React.ReactNode }) {
  const [pos, setPos] = useState(50);
  const activePointer = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    const bounds = sliderRef.current?.getBoundingClientRect();
    if (!bounds || bounds.width === 0) return;
    setPos(Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100)));
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        ref={sliderRef}
        role="slider"
        tabIndex={0}
        aria-label="Geser untuk membandingkan sebelum dan sesudah"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        className="relative cursor-ew-resize select-none overflow-hidden rounded-xl2 border border-brand-navy/10 bg-white shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-navy"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          activePointer.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);
          updatePosition(event.clientX);
        }}
        onPointerMove={(event) => {
          if (activePointer.current === event.pointerId) updatePosition(event.clientX);
        }}
        onPointerUp={(event) => {
          if (activePointer.current !== event.pointerId) return;
          activePointer.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => {
          activePointer.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            event.preventDefault();
            setPos((current) => Math.max(0, current - 1));
          } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            event.preventDefault();
            setPos((current) => Math.min(100, current + 1));
          } else if (event.key === 'Home') {
            event.preventDefault();
            setPos(0);
          } else if (event.key === 'End') {
            event.preventDefault();
            setPos(100);
          }
        }}
      >
        <div>{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{before}</div>
        <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy">Sebelum</span>
        <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-brand-navy px-2.5 py-1 text-xs font-semibold text-white">Sesudah</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand-blue" style={{ left: `${pos}%` }}>
          <div className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-blue text-brand-navy shadow-soft" aria-hidden>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
