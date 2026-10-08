import { BeforeAfterSlider } from '../before-after-slider';
import { CvMock } from '../cv-mock';
import { FAQAccordion } from '../faq-accordion';
import { CvPortfolio } from './portfolio';
import { PortfolioAnchorCta, WaCta } from './cta';
import { ViewTracker } from './view-tracker';
import { CV_PRICE } from '@/lib/cv-config';
/** Format "Rp29.000" persis seperti brief (tanpa spasi). */
const formatRupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;
import type { PortfolioView } from '@/lib/data';

const Check = ({ className = 'text-brand-navy' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`mt-0.5 h-5 w-5 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5 9-10" /></svg>
);

export function CvHero() {
  const chips = ['Professional', 'Clean', 'Ready to Apply'];
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-h">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-light" aria-hidden />
      <div className="container-x relative py-10 sm:py-20">
        <p className="font-display text-lg font-extrabold tracking-tight text-brand-navy">TSUKURE<span className="text-brand-blue-dark">.ID</span></p>
        <div className="mt-10 grid items-center gap-12 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-block rounded-full bg-tsukure-yellow px-4 py-1.5 text-sm font-bold text-brand-ink">Jasa Pembuatan CV Profesional</p>
            <h1 id="hero-h" className="mt-5 text-[2.35rem] font-extrabold leading-[1.05] min-[400px]:text-[2.7rem] sm:text-6xl">CV rapi.<br />Lamaran lebih siap.</h1>
            <p className="lead mt-5 max-w-xl">TSUKURE.ID bantu kamu membuat CV yang lebih profesional, rapi, dan siap digunakan untuk melamar kerja.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WaCta place="hero" />
              <PortfolioAnchorCta />
            </div>
            <p className="mt-5 text-sm font-medium text-brand-navy/70">Professional • Clean • Ready to Apply</p>
          </div>
          <div className="hidden lg:block" aria-hidden>
            <div className="relative ml-auto w-full max-w-sm rounded-xl2 bg-brand-navy p-8 text-white shadow-soft">
              <span className="absolute -left-4 -top-4 h-12 w-12 rounded-full bg-tsukure-yellow" />
              <ul className="space-y-6">
                {chips.map((c, i) => (
                  <li key={c} className="flex items-center gap-4 border-b border-white/15 pb-6 last:border-0 last:pb-0">
                    <span className="font-display text-3xl font-extrabold text-tsukure-yellow">0{i + 1}</span>
                    <span className="text-xl font-bold">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CvProblem() {
  const pains = ['CV gue kelihatan biasa banget.', 'Nulis pengalaman kerja gimana?', 'Fresh graduate harus isi CV apa?', 'CV lama gue terlalu berantakan.', 'Takut CV nggak dilirik recruiter.'];
  return (
    <section className="section bg-brand-light" aria-labelledby="problem-h">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <h2 id="problem-h" className="h2 whitespace-pre-line">{'Cari kerja aja udah bikin pusing.\nJangan ditambah CV.'}</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {pains.map((p) => <li key={p} className="rounded-2xl bg-white px-5 py-4 text-[15px] font-medium text-brand-navy shadow-soft">“{p}”</li>)}
        </ul>
      </div>
    </section>
  );
}

export function CvPromise() {
  return (
    <section className="section bg-brand-navy" aria-labelledby="promise-h">
      <div className="container-x max-w-3xl">
        <span className="block h-1.5 w-12 rounded bg-tsukure-yellow" aria-hidden />
        <h2 id="promise-h" className="mt-6 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">Aku bakal dukung kamu selama proses cari kerja.</h2>
        <p className="mt-5 text-lg text-white/80">Mulai dari CV. Kami bantu kamu lebih siap melamar.</p>
      </div>
    </section>
  );
}

export function CvValue() {
  const items = [
    ['Struktur profesional', 'Informasi diurutkan supaya mudah dipahami recruiter.'],
    ['Tata letak bersih', 'Rapi, konsisten, dan nyaman dibaca.'],
    ['Informasi jelas', 'Poin penting kamu tidak tenggelam.'],
    ['Cocok untuk fresh graduate', 'Pendidikan, organisasi, dan skill tetap bisa tampil kuat.'],
    ['File final siap dipakai', 'Softfile dan file siap print.'],
  ];
  return (
    <section className="section" aria-labelledby="value-h">
      <div className="container-x">
        <h2 id="value-h" className="h2 max-w-3xl">CV yang Dibuat untuk Bikin Kamu Lebih Siap Melamar.</h2>
        <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([t, d]) => (
            <li key={t} className="border-l-4 border-tsukure-yellow pl-5"><h3 className="text-lg font-bold">{t}</h3><p className="mt-1 text-[15px] text-brand-ink/70">{d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CvPortfolioSection({ items }: { items: PortfolioView[] }) {
  return (
    <section id="contoh-cv" className="section bg-brand-light" aria-labelledby="contoh-h">
      <div className="container-x">
        <h2 id="contoh-h" className="h2">Contoh CV yang Kami Buat</h2>
        <div className="mt-8">
          {items.length === 0 ? (
            <div className="rounded-xl2 bg-white p-8 shadow-soft">
              <p className="text-lg font-bold text-brand-navy">Contoh CV sedang kami siapkan.</p>
              <p className="mt-2 max-w-xl text-brand-ink/70">Mau lihat contoh hasil kerja lebih dulu? Minta langsung ke admin lewat WhatsApp.</p>
              <WaCta place="portfolio-empty" className="mt-5" />
            </div>
          ) : <CvPortfolio items={items} />}
        </div>
      </div>
    </section>
  );
}

export function CvBeforeAfter() {
  return (
    <section className="section" aria-labelledby="ba-h">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 id="ba-h" className="h2">Bedanya Kelihatan.</h2>
          <p className="lead mt-4">Isinya sama, hasilnya beda. Geser untuk melihat struktur, jarak, tipografi, dan keterbacaan sebelum dan sesudah dirapikan.</p>
        </div>
        <div>
          <BeforeAfterSlider before={<CvMock variant="messy" className="rounded-none border-0" />} after={<CvMock variant="clean" accent="yellow" className="rounded-none border-0 shadow-none" />} />
          <p className="mt-3 text-center text-xs text-brand-ink/55">Ilustrasi prinsip tata letak, bukan hasil klien.</p>
        </div>
      </div>
    </section>
  );
}

export function CvBenefits() {
  const support = ['Dibantu menyiapkan CV', 'Struktur lebih rapi', 'Tampilan profesional', 'Cocok untuk fresh graduate', 'Siap digunakan untuk melamar'];
  return (
    <section className="section bg-brand-light" aria-labelledby="benefit-h">
      <div className="container-x">
        <h2 id="benefit-h" className="h2">Bukan Cuma Dibikinin CV.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-xl2 bg-white p-7 shadow-soft">
            <p className="w-fit rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-navy">Sudah termasuk</p>
            <h3 className="mt-4 text-2xl font-bold">Include Edit Pas Foto Professional</h3>
            <p className="mt-3 text-brand-ink/75">Pas foto kamu dibantu dirapikan agar lebih siap digunakan di CV.</p>
          </article>
          <article className="rounded-xl2 bg-brand-navy p-7 text-white shadow-soft">
            <p className="w-fit rounded-full bg-tsukure-yellow px-3 py-1 text-xs font-bold text-brand-ink">Garansi</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Garansi Selamanya</h3>
            <p className="mt-3 text-white/85">Gratis revisi alamat kerja selamanya.</p>
            <p className="mt-3 text-sm text-white/60">Garansi ini berlaku untuk perubahan alamat kerja.</p>
          </article>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {support.map((s) => <li key={s} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-navy">{s}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function CvProcess() {
  const steps = [
    ['Kirimin Dokumen', ['Kirimin dokumen yang diperlukan untuk CV, seperti foto dan data diri, ke WhatsApp Admin.']],
    ['Terima Invoice Resmi', ['Admin akan membuat invoice resmi sebelum pembuatan draft pertama CV.', 'Setelah itu CV mulai dikerjakan. Kamu bisa mengajukan revisi sesuai kebutuhan sampai CV disetujui.']],
    ['CV Siap Digunakan', ['Jika CV sudah disetujui, file softfile dan file siap print akan dikirimkan untuk siap digunakan.']],
  ] as const;
  return (
    <section className="section" aria-labelledby="proses-h">
      <div className="container-x">
        <h2 id="proses-h" className="h2">Pesan CV Tanpa Ribet.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="rounded-xl2 border border-brand-navy/10 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-tsukure-yellow font-display text-lg font-extrabold text-brand-ink" aria-hidden>{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold"><span className="sr-only">Langkah {i + 1}: </span>{t}</h3>
              {d.map((p) => <p key={p} className="mt-2 text-[15px] leading-relaxed text-brand-ink/75">{p}</p>)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CvPricing() {
  const gets = ['CV profesional', 'Bantuan penyusunan', 'Edit pas foto professional', 'Proses via WhatsApp', 'Invoice resmi', 'Revisi sampai CV disetujui', 'Softfile final', 'File siap print', 'Garansi revisi alamat kerja selamanya'];
  return (
    <ViewTracker event="pricing_view" id="harga" className="section bg-brand-light" hideSticky>
      <div className="container-x max-w-3xl">
        <h2 className="h2 text-center">Harganya Jelas.</h2>
        <div className="mt-10 rounded-xl2 bg-white p-7 shadow-soft sm:p-10">
          <p className="w-fit rounded-full bg-tsukure-yellow px-3 py-1 text-xs font-bold text-brand-ink">Harga perkenalan</p>
          <p className="mt-5 text-lg text-brand-ink/50 line-through decoration-2"><span className="sr-only">Harga normal </span>{formatRupiah(CV_PRICE.original)}</p>
          <p className="font-display text-6xl font-extrabold leading-none text-brand-navy sm:text-7xl"><span className="sr-only">Harga sekarang </span>{formatRupiah(CV_PRICE.current)}</p>
          <h3 className="mt-8 text-lg font-bold">Yang kamu dapat</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">{gets.map((g) => <li key={g} className="flex gap-2.5 text-[15px]"><Check />{g}</li>)}</ul>
          <WaCta place="pricing" className="mt-8 w-full sm:w-auto" />
        </div>
      </div>
    </ViewTracker>
  );
}

export function CvFaq() {
  const items: Array<[string, string]> = [
    ['Apakah bisa request desain?', 'Kamu bisa sampaikan kebutuhan desain lewat WhatsApp. Admin akan memberi tahu apa yang bisa dikerjakan.'],
    ['Apakah bisa untuk fresh graduate?', 'Bisa. Layanan ini dibuat untuk fresh graduate dan job seeker, termasuk yang belum punya pengalaman kerja.'],
    ['Apa saja data yang harus dikirim?', 'Dokumen yang diperlukan untuk CV, seperti foto dan data diri. Kamu kirim lewat WhatsApp Admin.'],
    ['Bagaimana proses revisi?', 'Setelah draft pertama jadi, kamu bisa mengajukan revisi sesuai kebutuhan sampai CV disetujui.'],
    ['Apakah ada invoice?', 'Ada. Admin membuat invoice resmi sebelum draft pertama CV dibuat.'],
    ['Berapa harganya?', `${formatRupiah(CV_PRICE.current)} (harga perkenalan), dari harga normal ${formatRupiah(CV_PRICE.original)}.`],
    ['Bagaimana pembayaran?', 'Pembayaran mengikuti invoice resmi dari admin. Detail cara bayar diberikan admin lewat WhatsApp.'],
    ['File akhirnya apa saja?', 'Softfile dan file siap print.'],
    ['Apa itu file siap print?', 'File CV yang disiapkan supaya bisa langsung dicetak.'],
    ['Bagaimana garansi alamat kerja?', 'Revisi alamat kerja gratis selamanya. Garansi ini khusus untuk perubahan alamat kerja; untuk perubahan lain, tanyakan ke admin lewat WhatsApp.'],
    ['Bagaimana cara order?', 'Klik “Buat CV Sekarang”, lalu kirim dokumen yang diperlukan ke WhatsApp Admin.'],
  ];
  return (
    <section className="section" aria-labelledby="faq-h">
      <div className="container-x max-w-3xl">
        <h2 id="faq-h" className="h2">Pertanyaan yang Sering Muncul</h2>
        <div className="mt-8"><FAQAccordion items={items.map(([question, answer], i) => ({ id: String(i), question, answer }))} /></div>
      </div>
    </section>
  );
}

export function CvFinalCta() {
  return (
    <ViewTracker event="cv_cta_click" id="mulai" className="section bg-brand-navy" hideSticky>
      <div className="container-x text-center">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-white sm:text-5xl">Sudah waktunya punya CV yang lebih siap buat melamar.</h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/80">Mulai dari data yang kamu punya. Selebihnya kita bantu rapikan.</p>
        <WaCta place="final" onDark className="mt-8" />
      </div>
    </ViewTracker>
  );
}

export function CvFooter() {
  return (
    <footer className="bg-brand-navy pb-24 text-white md:pb-0">
      <div className="container-x border-t border-white/10 py-8 text-sm">
        <p className="font-display text-lg font-extrabold">TSUKURE.ID</p>
        <p className="mt-2 max-w-sm text-white/70">Jasa pembuatan CV profesional untuk fresh graduate dan job seeker.</p>
        <p className="mt-4"><a href="#contoh-cv" className="text-white/80 underline underline-offset-4 hover:text-white">Contoh CV</a></p>
        <p className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} TSUKURE.ID</p>
      </div>
    </footer>
  );
}
