import { getPortfolio } from '@/lib/data';
import { PortfolioGrid } from '@/components/portfolio-grid';
import { pageMeta } from '@/lib/seo';
import { buildWhatsappUrl, whatsappNumber } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';
export const metadata = pageMeta({ title: 'Portfolio CV', description: 'Contoh CV hasil kerja TSUKURE.ID: profesional, ATS, fresh graduate, dan redesign.', path: '/portfolio' });

export default async function PortfolioPage() {
  const items = await getPortfolio();
  const n = whatsappNumber();
  return (
    <section className="section">
      <div className="container-x">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Portfolio</h1>
        <p className="lead mt-4 max-w-2xl">Contoh CV yang sudah kami kerjakan.</p>
        <div className="mt-10">
          {items.length === 0 ? (
            <div className="rounded-xl2 bg-brand-light p-8">
              <p className="text-lg font-semibold text-brand-navy">Contoh CV sedang kami siapkan.</p>
              <p className="mt-2 text-brand-ink/70">Mau lihat contoh sekarang? Minta lewat WhatsApp.</p>
              {n && <a className="btn-primary mt-5" target="_blank" rel="noopener noreferrer" href={buildWhatsappUrl(n, 'Halo TSUKURE.ID, boleh lihat contoh CV?')}>Chat WhatsApp</a>}
            </div>
          ) : <PortfolioGrid items={items} />}
        </div>
      </div>
    </section>
  );
}
