import { describe, expect, it } from 'vitest';
import { getScrollDepthPercent } from '@/lib/cv-engagement';

describe('CV scroll depth', () => {
  it('reports progress through the scrollable page', () => {
    expect(getScrollDepthPercent(0, 800, 4000)).toBe(0);
    expect(getScrollDepthPercent(800, 800, 4000)).toBe(25);
    expect(getScrollDepthPercent(1600, 800, 4000)).toBe(50);
    expect(getScrollDepthPercent(2400, 800, 4000)).toBe(75);
    expect(getScrollDepthPercent(3200, 800, 4000)).toBe(100);
  });

  it('clamps the scroll percentage and ignores non-scrollable pages', () => {
    expect(getScrollDepthPercent(-100, 800, 4000)).toBe(0);
    expect(getScrollDepthPercent(4000, 800, 4000)).toBe(100);
    expect(getScrollDepthPercent(0, 800, 800)).toBe(0);
  });
});
