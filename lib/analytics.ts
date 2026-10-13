export type AnalyticsEvent =
  | 'page_view' | 'hero_cta_click' | 'service_view' | 'portfolio_view' | 'pricing_view'
  | 'order_start' | 'order_submit' | 'payment_started' | 'payment_completed'
  | 'portfolio_anchor_click' | 'portfolio_item_view' | 'cv_cta_click'
  | 'whatsapp_click' | 'instagram_click' | 'tiktok_click' | 'faq_open'
  | 'section_view' | 'scroll_depth';

/**
 * ID GTM-... meneruskan event ke dataLayer; ID G-... mengirimkannya lewat gtag.
 * ID kosong hanya menyimpan event di dataLayer tanpa memuat penyedia eksternal.
 */
export function getAnalyticsMode(): 'gtm' | 'ga4' | 'dataLayer' {
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim() ?? '';
  if (id.startsWith('GTM-')) return 'gtm';
  if (id.startsWith('G-')) return 'ga4';
  return 'dataLayer';
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Record<string, string | number> = {}): void {
  if (typeof window === 'undefined') return;
  if (getAnalyticsMode() === 'ga4') {
    window.gtag?.('event', event, params);
    return;
  }
  (window.dataLayer ??= []).push({ event, ...params });
}

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
