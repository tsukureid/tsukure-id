import { getFaqs, getPlans, getPortfolio, getServices, getTestimonials } from '@/lib/data';
import { buildWhatsappUrl, generalInquiryMessage, whatsappNumber } from '@/lib/whatsapp';
import { Hero } from '@/components/home/hero';
import {
  BeforeAfter, BrandPromise, FaqSection, FeaturedService, FinalCta, HowItWorks, PortfolioSection,
  PricingSection, Problem, Services, Testimonials, WhyUs,
} from '@/components/home/sections';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [services, portfolio, plans, testimonials, faqs] = await Promise.all([
    getServices(), getPortfolio(), getPlans(), getTestimonials(), getFaqs(),
  ]);
  const n = whatsappNumber();
  const wa = n ? buildWhatsappUrl(n, generalInquiryMessage) : null;
  return (
    <>
      <Hero />
      <Problem />
      <BrandPromise />
      <Services services={services} />
      <FeaturedService service={services.find((s) => s.isFeatured) ?? services[0]} />
      <PortfolioSection items={portfolio} whatsappHref={wa} />
      <BeforeAfter />
      <HowItWorks />
      <WhyUs />
      <Testimonials items={testimonials} />
      <PricingSection plans={plans} whatsappHref={wa} />
      <FaqSection items={faqs} />
      <FinalCta whatsappHref={wa} />
    </>
  );
}
