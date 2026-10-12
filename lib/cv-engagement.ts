export function getScrollDepthPercent(scrollY: number, viewportHeight: number, documentHeight: number): number {
  const scrollableHeight = documentHeight - viewportHeight;
  if (scrollableHeight <= 0) return 0;
  return Math.min(100, Math.max(0, Math.floor((scrollY / scrollableHeight) * 100)));
}
