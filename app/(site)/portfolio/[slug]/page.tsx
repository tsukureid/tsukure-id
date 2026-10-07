import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPortfolioItem } from '@/lib/data';
import { pageMeta } from '@/lib/seo';
import { TrackLink } from '@/components/track-link';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPortfolioItem((await params).slug);
  return p ? pageMeta({ title: p.title, description: p.description, path: `/portfolio/${p.slug}` }) : {};
}

export default async function PortfolioDetail({ params }: Props) {
  const p = await getPortfolioItem((await params).slug);
  if (!p) notFound();
  return (
    <section className="section">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl2 border border-brand-navy/10 bg-brand-light">
          <Image src={p.image} alt={`Contoh CV: ${p.title}`} unoptimized={p.image.startsWith("http")} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-contain" />
        </div>
        <div>
          <p className="text-sm font-medium text-brand-blue-dark">{p.category}</p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{p.title}</h1>
          <p className="lead mt-4">{p.description}</p>
          {p.useCase && <><h2 className="mt-8 text-xl font-bold">Cocok untuk</h2><p className="mt-2 text-brand-ink/75">{p.useCase}</p></>}
          {p.tags.length > 0 && <ul className="mt-6 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full bg-brand-light px-3 py-1 text-sm text-brand-navy">{t}</li>)}</ul>}
          <TrackLink href="/pesan" event="order_start" className="btn-primary mt-8">Pesan CV Sekarang</TrackLink>
        </div>
      </div>
    </section>
  );
}
