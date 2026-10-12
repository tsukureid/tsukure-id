'use client';
import { useEffect, useRef } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';

/** Kirim event sekali saat section terlihat. */
export function ViewTracker({ event, children, id, className, hideSticky, dataSection }: { event: AnalyticsEvent; children: React.ReactNode; id?: string; className?: string; hideSticky?: boolean; dataSection?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { track(event); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [event]);
  return <section ref={ref} id={id} className={className} data-hide-sticky={hideSticky ? '' : undefined} data-section={dataSection}>{children}</section>;
}
