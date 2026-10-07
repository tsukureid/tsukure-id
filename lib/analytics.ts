export type AnalyticsEvent =
  | 'page_view' | 'hero_cta_click' | 'service_view' | 'portfolio_view' | 'pricing_view'
  | 'order_start' | 'order_submit' | 'payment_started' | 'payment_completed'
  | 'whatsapp_click' | 'instagram_click' | 'tiktok_click' | 'faq_open';

/**
 * AnalyticsService (client). Saat ini hanya meneruskan ke dataLayer bila ada,
 * jadi siap disambung ke GA4/Meta/TikTok pixel tanpa mengubah komponen.
 * Metrik bisnis utama (pesanan per sumber UTM) disimpan di database lewat order.
 */
export function track(event: AnalyticsEvent, params: Record<string, string | number> = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer?.push({ event, ...params });
}

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
