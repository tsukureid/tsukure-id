import { CvMock } from '../cv-mock';
import { TrackLink } from '../track-link';

export function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="container-x grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h1 className="text-[2.25rem] min-[400px]:text-[2.6rem] font-extrabold leading-[1.05] sm:text-6xl">CV rapi.<br />Lamaran lebih siap.</h1>
          <p className="lead mt-5 max-w-xl">TSUKURE.ID bantu fresh graduate menyiapkan CV yang profesional, rapi, dan siap digunakan untuk melamar kerja.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackLink href="/pesan" event="hero_cta_click" eventParams={{ place: 'hero' }} className="btn-primary">Pesan CV Sekarang</TrackLink>
            <TrackLink href="/portfolio" className="btn-secondary">Lihat Portfolio</TrackLink>
          </div>
          <p className="mt-5 text-sm font-medium text-brand-navy/70">Professional • Clean • Ready to Apply</p>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-light" aria-hidden />
          <div className="-rotate-2"><CvMock variant="clean" /></div>
          <p className="mt-4 text-center text-xs text-brand-ink/55">Ilustrasi tampilan CV</p>
        </div>
      </div>
    </section>
  );
}
