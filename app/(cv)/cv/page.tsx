import type { Metadata } from 'next';
import { getPortfolio } from '@/lib/data';
import { siteUrl } from '@/lib/utils';
import { jsonLd } from '@/lib/seo';
import { CV_PACKAGES } from '@/lib/cv-config';
import { StickyCta } from '@/components/cv/sticky-cta';
import { UtmCapture } from '@/components/utm-capture';
import {
  CvBeforeAfter, CvBenefits, CvFaq, CvFooter, CvHero, CvPortfolioSection,
  CvPricing, CvProblem, CvProcess, CvPromise, CvValue,
} from '@/components/cv/sections';

export const dynamic = 'force-dynamic';

const TITLE = 'Jasa Pembuatan CV Profesional | TSUKURE.ID';
const DESC = 'Jasa pembuatan CV profesional untuk fresh graduate dan job seeker. CV rapi, profesional, dan siap digunakan untuk melamar kerja.';
const URL = siteUrl('/cv');

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: { title: TITLE, description: DESC, url: URL, siteName: 'TSUKURE.ID', locale: 'id_ID', type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
};

export default async function CvLanding() {
  const portfolio = await getPortfolio();
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Organization', name: 'TSUKURE.ID', url: siteUrl('/') },
    {
      '@context': 'https://schema.org', '@type': 'Service', name: 'Jasa Pembuatan CV Profesional', serviceType: 'Pembuatan CV', description: DESC, areaServed: 'ID',
      provider: { '@type': 'Organization', name: 'TSUKURE.ID', url: siteUrl('/') },
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: Math.min(...CV_PACKAGES.map((plan) => plan.current)),
        highPrice: Math.max(...CV_PACKAGES.map((plan) => plan.current)),
        offerCount: CV_PACKAGES.length,
        priceCurrency: 'IDR',
        url: URL,
      },
    },
  ];
  return (
    <>
      <CvHero />
      <CvProblem />
      <CvPromise />
      <CvValue />
      <CvPortfolioSection items={portfolio} />
      <CvBeforeAfter />
      <CvBenefits />
      <CvProcess />
      <CvPricing />
      <CvFaq />
      <CvFooter />
      <StickyCta />
      <UtmCapture />
      {ld.map((d, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(d) }} />)}
    </>
  );
}
