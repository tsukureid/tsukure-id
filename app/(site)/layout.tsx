import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { UtmCapture } from '@/components/utm-capture';
import { buildWhatsappUrl, generalInquiryMessage, whatsappNumber } from '@/lib/whatsapp';
import { SITE_NAME, jsonLd } from '@/lib/seo';
import { siteUrl } from '@/lib/utils';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const n = whatsappNumber();
  const wa = n ? buildWhatsappUrl(n, generalInquiryMessage) : null;
  const org = { '@context': 'https://schema.org', '@type': 'Organization', name: SITE_NAME, url: siteUrl('/') };
  const site = { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: siteUrl('/'), inLanguage: 'id-ID' };
  return (
    <>
      <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white">Lewati ke konten</a>
      <Navbar />
      <main id="konten">{children}</main>
      <Footer />
      <WhatsAppButton href={wa} />
      <UtmCapture />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(site) }} />
    </>
  );
}
