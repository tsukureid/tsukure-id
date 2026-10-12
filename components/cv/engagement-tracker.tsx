'use client';

import { useEffect } from 'react';
import { getScrollDepthPercent } from '@/lib/cv-engagement';
import { track } from '@/lib/analytics';

const SECTION_NAMES = [
  'hero',
  'problem',
  'promise',
  'value',
  'contoh-cv',
  'before-after',
  'benefits',
  'process',
  'pricing',
  'faq',
] as const;
const SECTION_NAME_SET: ReadonlySet<string> = new Set(SECTION_NAMES);

const SCROLL_DEPTHS = [25, 50, 75, 100] as const;
const reportedInMemory = new Set<string>();
let storageWarningLogged = false;

function hasReported(key: string): boolean {
  if (reportedInMemory.has(key)) return true;
  try {
    return window.sessionStorage.getItem(key) === '1';
  } catch (error) {
    if (!storageWarningLogged) {
      console.warn('[cv] engagement tracker: sessionStorage tidak tersedia', error);
      storageWarningLogged = true;
    }
    return false;
  }
}

function markReported(key: string): void {
  reportedInMemory.add(key);
  try {
    window.sessionStorage.setItem(key, '1');
  } catch (error) {
    if (!storageWarningLogged) {
      console.warn('[cv] engagement tracker: sessionStorage tidak tersedia', error);
      storageWarningLogged = true;
    }
  }
}

function reportOnce(key: string, report: () => void): void {
  if (hasReported(key)) return;
  markReported(key);
  report();
}

export function EngagementTracker() {
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target.getAttribute('data-section');
          if (!section || !SECTION_NAME_SET.has(section)) continue;
          reportOnce(`cv:section_view:${section}`, () => track('section_view', { section }));
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0.35 });

      document.querySelectorAll<HTMLElement>('[data-section]').forEach((section) => observer?.observe(section));
    }

    let animationFrame: number | undefined;
    const onScroll = () => {
      if (animationFrame !== undefined) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = undefined;
        const depth = getScrollDepthPercent(
          window.scrollY,
          window.innerHeight,
          document.documentElement.scrollHeight,
        );
        for (const percent of SCROLL_DEPTHS) {
          if (depth >= percent) {
            reportOnce(`cv:scroll_depth:${percent}`, () => track('scroll_depth', { percent }));
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}
