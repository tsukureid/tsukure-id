import { getServices } from '@/lib/data';
import { ServiceCard } from '@/components/service-card';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = pageMeta({ title: 'Layanan Jasa Pembuatan CV', description: 'Pilih layanan CV: Profesional, ATS-Friendly, Fresh Graduate, Redesign, atau Optimization.', path: '/layanan' });

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <section className="section">
      <div className="container-x">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Layanan CV</h1>
        <p className="lead mt-4 max-w-2xl">Setiap layanan punya fokus berbeda. Pilih yang paling sesuai dengan kondisi CV-mu.</p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => <li key={s.id}><ServiceCard s={s} /></li>)}</ul>
      </div>
    </section>
  );
}
