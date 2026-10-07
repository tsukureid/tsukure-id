import type { MetadataRoute } from 'next';
import { getPortfolio, getServices } from '@/lib/data';
import { siteUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, portfolio] = await Promise.all([getServices(), getPortfolio()]);
  const now = new Date();
  return [
    ...['/', '/layanan', '/portfolio', '/harga', '/faq'].map((p) => ({ url: siteUrl(p), lastModified: now })),
    ...services.map((s) => ({ url: siteUrl(`/layanan/${s.slug}`), lastModified: now })),
    ...portfolio.map((p) => ({ url: siteUrl(`/portfolio/${p.slug}`), lastModified: now })),
  ];
}
