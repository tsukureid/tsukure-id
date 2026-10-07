import { getPlans, getServices } from '@/lib/data';
import { OrderForm } from '@/components/order-form';
import { pageMeta } from '@/lib/seo';
import { isDbConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const metadata = pageMeta({ title: 'Pesan CV', description: 'Isi formulir untuk memesan jasa pembuatan CV TSUKURE.ID.', path: '/pesan', noindex: true });

export default async function OrderPage({ searchParams }: { searchParams: Promise<{ layanan?: string; paket?: string }> }) {
  const sp = await searchParams;
  const [services, plans] = await Promise.all([getServices(), getPlans()]);
  const plan = plans.find((p) => p.id === sp.paket);
  const service = plan?.serviceId ? services.find((s) => s.id === plan.serviceId) : services.find((s) => s.slug === sp.layanan);
  return (
    <section className="section">
      <div className="container-x max-w-2xl">
        <h1 className="text-4xl font-extrabold">Pesan CV</h1>
        <p className="lead mt-3">Isi data di bawah. Setelah itu kamu dapat instruksi pembayaran dan konfirmasi lewat WhatsApp.</p>
        {plan && <p className="mt-4 rounded-xl bg-brand-light p-4 text-sm text-brand-navy">Paket dipilih: <strong>{plan.name}</strong></p>}
        {!isDbConfigured() && <p role="status" className="mt-6 rounded-xl bg-brand-gold/15 p-4 text-sm text-brand-navy">Sistem pemesanan belum terhubung ke database. Formulir akan aktif setelah DATABASE_URL diisi.</p>}
        <div className="mt-8"><OrderForm services={services} defaultService={service?.slug} planId={plan?.id} /></div>
      </div>
    </section>
  );
}
