import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFaqs, getPortfolio, getService } from '@/lib/data';
import { formatRupiah, priceFromLabel, siteUrl } from '@/lib/utils';
import { pageMeta, jsonLd } from '@/lib/seo';
import { TrackLink } from '@/components/track-link';
import { FAQAccordion } from '@/components/faq-accordion';
import { PortfolioGrid } from '@/components/portfolio-grid';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: `${s.name}: Jasa Pembuatan CV`, description: s.tagline, path: `/layanan/${s.slug}` });
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) notFound();
  const [faqs, portfolio] = await Promise.all([getFaqs(), getPortfolio()]);
  const examples = portfolio.slice(0, 3);
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl('/') },
    { '@type': 'ListItem', position: 2, name: 'Layanan', item: siteUrl('/layanan') },
    { '@type': 'ListItem', position: 3, name: s.name, item: siteUrl(`/layanan/${s.slug}`) },
  ] };
  const blocks: Array<[string, string]> = [['Untuk siapa?', s.forWho], ['Masalahnya', s.problem], ['Solusinya', s.solution]];
  return (
    <>
      <section className="bg-brand-light">
        <div className="container-x py-14 sm:py-20">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{s.name}</h1>
          <p className="lead mt-4 max-w-2xl">{s.tagline}</p>
          <p className="mt-6 text-sm text-brand-ink/60">{priceFromLabel(s.startingPrice).prefix} <span className="font-semibold text-brand-navy">{priceFromLabel(s.startingPrice).amount}</span></p>
          <TrackLink href={`/pesan?layanan=${s.slug}`} event="order_start" eventParams={{ service: s.slug }} className="btn-primary mt-4">Pesan Layanan Ini</TrackLink>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-10">
            {blocks.map(([t, d]) => (<div key={t}><h2 className="text-2xl font-bold">{t}</h2><p className="lead mt-3">{d}</p></div>))}
            <div>
              <h2 className="text-2xl font-bold">Yang kamu dapat</h2>
              <ul className="mt-4 space-y-3">{s.included.map((i) => <li key={i} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-blue" aria-hidden />{i}</li>)}</ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Prosesnya</h2>
              <ol className="mt-4 space-y-3">{s.process.map((p, i) => <li key={p} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-light text-sm font-bold text-brand-navy" aria-hidden>{i + 1}</span>{p}</li>)}</ol>
            </div>
          </div>
          <aside className="h-fit rounded-xl2 border border-brand-navy/10 p-6 shadow-soft lg:sticky lg:top-24">
            <dl className="space-y-4 text-[15px]">
              <div><dt className="font-semibold text-brand-navy">Revisi</dt><dd className="text-brand-ink/70">{s.revisionInfo}</dd></div>
              <div><dt className="font-semibold text-brand-navy">Estimasi pengerjaan</dt><dd className="text-brand-ink/70">{s.deliveryEta}</dd></div>
              <div><dt className="font-semibold text-brand-navy">Format file</dt><dd className="text-brand-ink/70">{s.fileFormat}</dd></div>
              <div><dt className="font-semibold text-brand-navy">Harga mulai</dt><dd className="font-display text-2xl font-extrabold text-brand-navy">{formatRupiah(s.startingPrice)}</dd></div>
            </dl>
            <TrackLink href={`/pesan?layanan=${s.slug}`} event="order_start" className="btn-primary mt-6 w-full">Pesan Layanan Ini</TrackLink>
          </aside>
        </div>
      </section>
      {examples.length > 0 && (
        <section className="section bg-brand-light"><div className="container-x"><h2 className="mb-8 text-2xl font-bold">Contoh hasil kerja</h2><PortfolioGrid items={examples} /></div></section>
      )}
      <section className="section"><div className="container-x max-w-3xl"><h2 className="mb-6 text-2xl font-bold">FAQ</h2><FAQAccordion items={faqs.slice(0, 5)} /></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(crumbs) }} />
    </>
  );
}
