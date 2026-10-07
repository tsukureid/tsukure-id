import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { logout } from '../actions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

const NAV: Array<[string, string]> = [
  ['/admin', 'Dashboard'], ['/admin/orders', 'Pesanan'], ['/admin/payments', 'Pembayaran'], ['/admin/services', 'Layanan'],
  ['/admin/portfolio', 'Portfolio'], ['/admin/pricing', 'Harga'], ['/admin/testimonials', 'Testimoni'], ['/admin/faq', 'FAQ'],
  ['/admin/customers', 'Pelanggan'], ['/admin/settings', 'Pengaturan'],
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className="min-h-screen bg-neutral-50 lg:grid lg:grid-cols-[220px_1fr]">
      <aside className="border-b border-brand-navy/10 bg-white lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-4 py-3 lg:block">
          <p className="font-display text-lg font-extrabold text-brand-navy">TSUKURE.ID</p>
          <form action={logout} className="lg:mt-1"><button className="text-sm text-brand-ink/60 underline">Keluar ({admin.email})</button></form>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-2 pb-2 lg:flex-col lg:px-3">
          {NAV.map(([href, label]) => <Link key={href} href={href} className="shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-navy hover:bg-brand-light">{label}</Link>)}
        </nav>
      </aside>
      <div className="min-w-0 p-4 sm:p-8">{children}</div>
    </div>
  );
}
