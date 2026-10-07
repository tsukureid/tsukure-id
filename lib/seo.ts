import type { Metadata } from 'next';
import { siteUrl } from './utils';

export const SITE_NAME = 'TSUKURE.ID';
export const DEFAULT_DESC = 'Jasa pembuatan CV profesional dan ATS-friendly untuk fresh graduate dan pencari kerja. Lihat portfolio, harga, dan pesan CV-mu.';

export function pageMeta(opts: { title: string; description?: string; path: string; noindex?: boolean }): Metadata {
  const description = opts.description ?? DEFAULT_DESC;
  const url = siteUrl(opts.path);
  return {
    title: opts.title,
    description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: opts.title, description, url, siteName: SITE_NAME, locale: 'id_ID', type: 'website' },
    twitter: { card: 'summary_large_image', title: opts.title, description },
  };
}

export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
