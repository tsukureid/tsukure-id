import type { Metadata } from 'next';
import { siteUrl } from '@/lib/utils';

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
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f2] px-6 py-16 text-brand-navy">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy/65">Status</p>
        <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">https://tsukure.id</h1>
        <p className="mt-4 text-base font-medium text-brand-navy/75 sm:text-lg">MASIH DALAM TAHAP PEMBANGUNAN</p>
      </div>
    </main>
  );
}
