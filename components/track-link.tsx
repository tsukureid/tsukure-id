'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';

type Props = ComponentProps<typeof Link> & { event?: AnalyticsEvent; eventParams?: Record<string, string | number> };

export function TrackLink({ event, eventParams, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        if (event) track(event, eventParams);
        onClick?.(e);
      }}
    />
  );
}

export function TrackExternal({ event, href, children, className, ...rest }: { event: AnalyticsEvent; href: string; children: React.ReactNode; className?: string; 'aria-label'?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track(event)} {...rest}>
      {children}
    </a>
  );
}
