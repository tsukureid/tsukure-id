import { getPlans } from '@/lib/data';
import { PricingGrid } from '@/components/pricing-grid';
import { pageMeta } from '@/lib/seo';
import { buildWhatsappUrl, generalInquiryMessage, whatsappNumber } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const metadata = pageMeta({ title: 'Harga Jasa Pembuatan CV', description: 'Daftar harga jasa pembuatan CV TSUKURE.ID yang transparan.', path: '/harga' });

export default async function PricePage() {
  const plans = await getPlans();
  const n = whatsappNumber();
  return (
    <section className="section">
      <div className="container-x">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Harga</h1>
        <p className="lead mt-4 max-w-2xl">Pilih CV yang paling cocok. Harga tertera jelas, tanpa biaya tersembunyi.</p>
        <div className="mt-10"><PricingGrid plans={plans} whatsappHref={n ? buildWhatsappUrl(n, generalInquiryMessage) : null} /></div>
      </div>
    </section>
  );
}
