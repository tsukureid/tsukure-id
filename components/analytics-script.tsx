import Script from 'next/script';
import { getAnalyticsMode } from '@/lib/analytics';

// Rendered by the root layout, where Next.js supports beforeInteractive scripts.
/* eslint-disable @next/next/no-before-interactive-script-outside-document */

let warnedInvalidAnalyticsId = false;

export function AnalyticsScript() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID?.trim() ?? '';
  const mode = getAnalyticsMode();

  if (analyticsId && mode === 'dataLayer' && !warnedInvalidAnalyticsId) {
    console.warn('[analytics] NEXT_PUBLIC_ANALYTICS_ID harus diawali GTM- atau G-.');
    warnedInvalidAnalyticsId = true;
  }

  const safeAnalyticsId = JSON.stringify(analyticsId).replace(/</g, '\\u003c');

  return (
    <>
      <Script id="analytics-data-layer" strategy="beforeInteractive">
        {'window.dataLayer = window.dataLayer || [];'}
      </Script>
      {mode === 'gtm' && (
        <Script
          id="google-tag-manager"
          src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(analyticsId)}`}
          strategy="afterInteractive"
        />
      )}
      {mode === 'ga4' && (
        <>
          <Script id="google-analytics-config" strategy="beforeInteractive">
            {`window.gtag = function(){window.dataLayer.push(arguments);};window.gtag('js', new Date());window.gtag('config', ${safeAnalyticsId});`}
          </Script>
          <Script
            id="google-analytics"
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`}
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  );
}
