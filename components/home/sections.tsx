import Link from 'next/link';
import { SectionHeading } from '../section-heading';
import { ServiceCard } from '../service-card';
import { PortfolioGrid } from '../portfolio-grid';
import { BeforeAfterSlider } from '../before-after-slider';
import { CvMock } from '../cv-mock';
import { PricingGrid } from '../pricing-grid';
import { FAQAccordion } from '../faq-accordion';
import { TrackLink } from '../track-link';
import { ServiceIcon } from '../icons';
import { priceFromLabel } from '@/lib/utils';
import type { FaqView, PlanView, PortfolioView, ServiceView, TestimonialView } from '@/lib/data';

export function Problem() {
  const pains = [
    'CV gue kelihatan biasa banget.', 'Nulis pengalaman kerja gimana?', 'Fresh graduate harus isi CV apa?',
    'CV ATS itu apa?', 'CV lama gue sudah tidak menarik.', 'Takut CV nggak dilirik recruiter.',
  ];
  return (
    <section className="section bg-brand-light" aria-labelledby="problem">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading id="problem" title={'Cari kerja aja udah bikin pusing.\nJangan ditambah CV.'} lead="Kalau kamu pernah mikir begini, kamu nggak sendirian." />
        <ul className="grid gap-3 sm:grid-cols-2">
          {pains.map((p) => <li key={p} className="rounded-2xl bg-white px-5 py-4 text-[15px] font-medium text-brand-navy shadow-soft">“{p}”</li>)}
        </ul>
      </div>
    </section>
  );
}

export function BrandPromise() {
  return (
    <section className="section bg-brand-navy text-white" aria-labelledby="promise">
      <div className="container-x max-w-3xl">
        <span className="block h-1 w-10 rounded bg-brand-gold" aria-hidden />
        <h2 id="promise" className="mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">Aku bakal dukung kamu selama proses cari kerja.</h2>
        <p className="mt-5 text-lg text-white/80">Mulai dari CV. Kami bantu kamu lebih siap melamar. Kamu nggak harus cari kerja sendirian.</p>
      </div>
    </section>
  );
}

export function Services({ services }: { services: ServiceView[] }) {
  return (
    <section id="layanan" className="section" aria-labelledby="layanan-h">
      <div className="container-x">
        <SectionHeading id="layanan-h" title="CV yang Bisa Kamu Pilih" lead="Setiap layanan punya tujuan yang beda. Pilih yang paling pas dengan kondisi CV-mu sekarang." />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <li key={s.id}><ServiceCard s={s} /></li>)}
        </ul>
      </div>
    </section>
  );
}

export function FeaturedService({ service }: { service: ServiceView | undefined }) {
  if (!service) return null;
  const points = ['Hierarki informasi yang jelas', 'Tipografi bersih dan konsisten', 'Struktur mudah dipindai recruiter', 'Isi disesuaikan dengan posisi tujuan'];
  return (
    <section className="section bg-brand-light" aria-labelledby="featured">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-xs"><CvMock variant="clean" /></div>
        <div>
          <h2 id="featured" className="h2">{service.name}</h2>
          <p className="lead mt-4">{service.description}</p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => <li key={p} className="flex gap-3 text-brand-navy"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-gold" aria-hidden />{p}</li>)}
          </ul>
          <p className="mt-6 text-sm text-brand-ink/60">{priceFromLabel(service.startingPrice).prefix} <span className="font-semibold text-brand-navy">{priceFromLabel(service.startingPrice).amount}</span></p>
          <TrackLink href={`/pesan?layanan=${service.slug}`} event="order_start" className="btn-primary mt-4">Pesan CV Profesional</TrackLink>
        </div>
      </div>
    </section>
  );
}

export function PortfolioSection({ items, whatsappHref }: { items: PortfolioView[]; whatsappHref: string | null }) {
  return (
    <section id="portfolio" className="section" aria-labelledby="portfolio-h">
      <div className="container-x">
        <SectionHeading id="portfolio-h" title={'Kerja Kami,\nBiar Kamu Nggak Cuma Percaya Kata‑Kata.'} />
        <div className="mt-10">
          {items.length === 0 ? (
            <div className="rounded-xl2 bg-brand-light p-8">
              <p className="text-lg font-semibold text-brand-navy">Contoh CV sedang kami siapkan.</p>
              <p className="mt-2 max-w-xl text-brand-ink/70">Mau lihat contoh hasil kerja sekarang? Minta lewat WhatsApp.</p>
              {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5">Chat WhatsApp</a>}
            </div>
          ) : (
            <>
              <PortfolioGrid items={items.slice(0, 6)} />
              <TrackLink href="/portfolio" className="btn-secondary mt-8">Lihat Semua Portfolio</TrackLink>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  const rows = ['Hierarki informasi', 'Jarak dan tata letak', 'Tipografi', 'Struktur', 'Keterbacaan'];
  return (
    <section id="before-after" className="section bg-brand-light" aria-labelledby="ba">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 id="ba" className="h2">Bedanya Kelihatan.</h2>
          <p className="lead mt-4">Isi yang sama bisa terlihat sangat beda kalau disusun dengan benar. Geser untuk membandingkan.</p>
          <ul className="mt-6 flex flex-wrap gap-2">{rows.map((r) => <li key={r} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-brand-navy">{r}</li>)}</ul>
        </div>
        <div>
          <BeforeAfterSlider before={<CvMock variant="messy" className="rounded-none border-0" />} after={<CvMock variant="clean" className="rounded-none border-0 shadow-none" />} />
          <p className="mt-3 text-center text-xs text-brand-ink/55">Ilustrasi prinsip tata letak, bukan hasil klien.</p>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = ['Pilih Layanan', 'Isi Data', 'Kirim Dokumen', 'TSUKURE.ID Mengerjakan', 'Revisi', 'CV Final Siap Digunakan'];
  return (
    <section id="cara-kerja" className="section" aria-labelledby="cara">
      <div className="container-x">
        <SectionHeading id="cara" title="Pesan CV Tanpa Ribet." />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-start gap-4 rounded-2xl border border-brand-navy/10 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-blue font-display font-bold text-brand-navy" aria-hidden>{i + 1}</span>
              <span className="pt-1.5 text-lg font-semibold text-brand-navy">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyUs() {
  const items = [
    ['Dibantu, bukan cuma didesainkan', 'Kami ikut menyusun isi dan urutan informasinya, bukan sekadar menaruh teks ke template.'],
    ['Disesuaikan dengan posisi tujuan', 'CV disusun untuk posisi yang kamu lamar, bukan satu versi untuk semua lowongan.'],
    ['Struktur lebih jelas', 'Informasi diurutkan berdasarkan relevansi supaya recruiter menangkap poin utamamu dengan cepat.'],
    ['Bahasa lebih profesional', 'Kalimat pengalaman dirapikan supaya spesifik dan mudah dipahami.'],
    ['Bisa konsultasi dan revisi', 'Ada ruang bertanya lewat WhatsApp dan revisi sesuai paket yang kamu pilih.'],
    ['Fokus ke fresh graduate', 'Kami paham cara menonjolkan organisasi, magang, dan proyek saat pengalaman kerja belum ada.'],
  ];
  return (
    <section className="section bg-brand-light" aria-labelledby="why">
      <div className="container-x">
        <SectionHeading id="why" title="Bukan Cuma Dibikinin CV." lead="Kenapa nggak bikin sendiri di Canva? Bisa. Bedanya ada di sini:" />
        <dl className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {items.map(([t, d]) => (
            <div key={t} className="border-l-4 border-brand-blue pl-5">
              <dt className="text-lg font-bold text-brand-navy">{t}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-brand-ink/75">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Testimonials({ items }: { items: TestimonialView[] }) {
  if (items.length === 0) return null; // tidak ada testimoni palsu: bagian tampil hanya bila ada data nyata
  return (
    <section className="section" aria-labelledby="testi">
      <div className="container-x">
        <SectionHeading id="testi" title="Yang Sudah Kami Bantu" />
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.id}>
              <figure className="card h-full">
                <p className="text-brand-gold" aria-label={`Rating ${t.rating} dari 5`}>{'★'.repeat(t.rating)}<span className="text-brand-navy/20">{'★'.repeat(5 - t.rating)}</span></p>
                <blockquote className="mt-3 text-[15px] leading-relaxed text-brand-ink/80">“{t.content}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-light font-bold text-brand-navy" aria-hidden>{t.name.slice(0, 1)}</span>
                  <span><span className="block text-sm font-semibold text-brand-navy">{t.name}</span><span className="block text-xs text-brand-ink/60">{t.status}</span></span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PricingSection({ plans, whatsappHref }: { plans: PlanView[]; whatsappHref: string | null }) {
  return (
    <section id="harga" className="section" aria-labelledby="harga-h">
      <div className="container-x">
        <SectionHeading id="harga-h" title="Pilih CV yang Paling Cocok." />
        <div className="mt-10"><PricingGrid plans={plans} whatsappHref={whatsappHref} /></div>
      </div>
    </section>
  );
}

export function FaqSection({ items }: { items: FaqView[] }) {
  return (
    <section id="faq" className="section bg-brand-light" aria-labelledby="faq-h">
      <div className="container-x max-w-3xl">
        <SectionHeading id="faq-h" title="Pertanyaan yang Sering Muncul" />
        <div className="mt-8"><FAQAccordion items={items.slice(0, 6)} /></div>
        <Link href="/faq" className="btn-ghost mt-4">Lihat semua FAQ</Link>
      </div>
    </section>
  );
}

export function FinalCta({ whatsappHref }: { whatsappHref: string | null }) {
  return (
    <section className="section bg-brand-blue" aria-labelledby="cta">
      <div className="container-x text-center">
        <h2 id="cta" className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-brand-navy sm:text-5xl">Mulai dari CV. Kami bantu siapin sisanya.</h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackLink href="/pesan" event="hero_cta_click" eventParams={{ place: 'final' }} className="btn bg-brand-navy text-white hover:bg-white hover:text-brand-navy">Pesan CV Sekarang</TrackLink>
          {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn border border-brand-navy/40 text-brand-navy hover:bg-white">Chat WhatsApp</a>}
        </div>
      </div>
    </section>
  );
}

export { ServiceIcon };
