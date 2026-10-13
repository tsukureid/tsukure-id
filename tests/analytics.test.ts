import { afterEach, describe, expect, it, vi } from 'vitest';
import { track } from '@/lib/analytics';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('track', () => {
  it('queues events in dataLayer when the analytics ID is empty', () => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ID', '');
    vi.stubGlobal('window', {});

    track('section_view', { section: 'hero' });

    expect(window.dataLayer).toEqual([{ event: 'section_view', section: 'hero' }]);
  });

  it('queues events in dataLayer for Google Tag Manager', () => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ID', 'GTM-TEST');
    const gtag = vi.fn();
    vi.stubGlobal('window', { dataLayer: [], gtag });

    track('whatsapp_click', { place: 'hero' });

    expect(window.dataLayer).toEqual([{ event: 'whatsapp_click', place: 'hero' }]);
    expect(gtag).not.toHaveBeenCalled();
  });

  it('sends events only through gtag for Google Analytics 4', () => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ID', 'G-TEST');
    const gtag = vi.fn();
    vi.stubGlobal('window', { dataLayer: [], gtag });

    track('scroll_depth', { percent: 25 });

    expect(gtag).toHaveBeenCalledWith('event', 'scroll_depth', { percent: 25 });
    expect(window.dataLayer).toEqual([]);
  });

  it('does not throw when the GA4 script has not loaded', () => {
    vi.stubEnv('NEXT_PUBLIC_ANALYTICS_ID', 'G-TEST');
    vi.stubGlobal('window', {});

    expect(() => track('faq_open', { id: '0' })).not.toThrow();
  });
});
