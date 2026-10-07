import Link from 'next/link';
import { getSetting, SOCIAL_SETTING_KEYS } from '@/lib/data';
import { TrackExternal } from './track-link';

export async function Footer() {
  const [instagram, tiktok] = await Promise.all([getSetting(SOCIAL_SETTING_KEYS.instagram), getSetting(SOCIAL_SETTING_KEYS.tiktok)]);
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-extrabold">TSUKURE.ID</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">Mulai dari CV. Kami bantu kamu lebih siap melamar kerja.</p>
        </div>
        <nav aria-label="Tautan footer">
          <p className="text-sm font-semibold text-white">Halaman</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li><Link className="hover:text-white" href="/layanan">Layanan</Link></li>
            <li><Link className="hover:text-white" href="/portfolio">Portfolio</Link></li>
            <li><Link className="hover:text-white" href="/harga">Harga</Link></li>
            <li><Link className="hover:text-white" href="/faq">FAQ</Link></li>
            <li><Link className="hover:text-white" href="/pesan">Pesan CV</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold text-white">Ikuti kami</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {instagram && <li><TrackExternal event="instagram_click" href={instagram} className="hover:text-white">Instagram</TrackExternal></li>}
            {tiktok && <li><TrackExternal event="tiktok_click" href={tiktok} className="hover:text-white">TikTok</TrackExternal></li>}
            {!instagram && !tiktok && <li>Segera hadir</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">© {new Date().getFullYear()} TSUKURE.ID</div>
    </footer>
  );
}
