import Image from 'next/image';
import { BeforeAfterSlider } from '../before-after-slider';
import { CvMock } from '../cv-mock';
import { FAQAccordion } from '../faq-accordion';
import { CvPortfolio } from './portfolio';
import { PortfolioAnchorCta, WaCta } from './cta';
import { ViewTracker } from './view-tracker';
import { ScrollReveal } from '../home/reveal-section';
import { CV_DATA_CHECKLIST, CV_INFO, CV_PACKAGES, CV_PRIVACY, CV_PRIVACY_ANCHOR, CV_TERMS, CV_TERMS_ANCHOR, hasCvPrivacy, hasCvTerms, type CvInfo } from '@/lib/cv-config';
/** Format "Rp29.000" persis seperti brief (tanpa spasi). */
const formatRupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;
import type { PortfolioView } from '@/lib/data';

/** Centang tipis "√" seperti di desain paket. */
const Check = ({ className = 'text-brand-navy' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`mt-0.5 h-5 w-5 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 12.5l5 5L20 6" /></svg>
);

const TsukureLogo = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center ${className}`}>
    <Image
      src="/TSUKURE_LOGO_HORIZONTAL.png"
      alt="Tsukure.id logo"
      width={1177}
      height={412}
      sizes="(min-width: 1024px) 138px, 92px"
      className="h-8 w-auto object-contain sm:h-10 lg:h-12"
      style={{ aspectRatio: '1177 / 412' }}
    />
  </div>
);

export function CvHero() {
  return (
    <section data-section="hero" className="relative overflow-hidden bg-white" aria-labelledby="hero-h">
      {/* Lingkaran biru muda: kepotong di pojok kanan atas (mobile & desktop) */}
      <div
        className="pointer-events-none absolute -right-[90px] -top-[90px] h-[270px] w-[270px] rounded-full animate-float bg-[#dceeff] motion-reduce:animate-none lg:-right-[150px] lg:-top-[165px] lg:h-[380px] lg:w-[380px]"
        aria-hidden
      />

      <div className="container-x relative mx-auto grid w-full max-w-[1240px] pt-6 sm:pt-8 lg:grid-cols-[1.12fr_0.88fr] lg:grid-rows-[1fr_auto_auto_auto_1fr] lg:gap-x-2 lg:pt-10">
        {/* 1. Logo + headline + subjudul */}
        <div
          style={{ animationDelay: '80ms' }}
          className="relative z-10 text-left motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade lg:col-start-1 lg:row-start-2"
        >
          <TsukureLogo className="mb-5 lg:mb-10" />

          <h1
            id="hero-h"
            style={{ animationDelay: '180ms' }}
            className="whitespace-normal text-[2rem] font-extrabold leading-[1.3] tracking-[-0.045em] text-brand-navy motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal min-[380px]:text-[2.2rem] min-[430px]:text-[2.4rem] sm:whitespace-nowrap sm:text-[3rem] lg:text-[2.6rem] lg:leading-[1.32] xl:text-[3.2rem]"
          >
            Masa Depan{' '}
            <br className="lg:hidden" />
            Kariermu{' '}
            <br className="hidden lg:block" />
            Dimulai dari{' '}
            <br className="lg:hidden" />
            CV yang Tepat.
          </h1>

          <p
            style={{ animationDelay: '300ms' }}
            className="mt-5 text-[1.1rem] leading-[1.5] text-brand-ink/80 motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade min-[430px]:text-[1.2rem] sm:text-[1.35rem] lg:mt-8 lg:text-[1.35rem] lg:leading-[1.55] xl:text-[1.7rem]"
          >
            Buat kesan pertama yang membuat HRD
            <br />
            ingin mengenalmu lebih jauh.
          </p>
        </div>

        {/* 2. Foto: di tengah (mobile) / kolom kanan, nempel bawah (desktop) */}
        <div
          style={{ animationDelay: '220ms' }}
          className="relative mt-6 flex justify-center motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:mt-0 lg:items-end lg:justify-end"
        >
          <Image
            src="/BRAND_AMBASSADOR.png"
            alt="Profesional wanita memegang CV"
            width={1254}
            height={1254}
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 600px, 86vw"
            priority
            className="relative z-10 h-auto w-[86%] max-w-[430px] animate-float object-contain object-bottom motion-reduce:animate-none lg:h-[600px] lg:w-auto lg:max-w-none xl:h-[680px]"
          />
        </div>

        {/* 3. Tombol */}
        <div
          style={{ animationDelay: '420ms' }}
          className="relative z-10 mt-1 flex flex-col gap-3 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal lg:col-start-1 lg:row-start-3 lg:mt-9 lg:flex-row"
        >
          <WaCta place="hero" className="w-full lg:w-auto lg:min-w-[210px]" />
          <PortfolioAnchorCta className="w-full lg:w-auto lg:min-w-[210px]" />
        </div>

        {/* 4. Catatan */}
        <p
          style={{ animationDelay: '520ms' }}
          className="relative z-10 mt-7 px-1.5 pb-8 text-[0.95rem] min-[430px]:text-[1.05rem] sm:text-[1.15rem] font-medium leading-[1.6] text-brand-navy/70 motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade lg:col-start-1 lg:row-start-4 lg:mt-10 lg:px-1 lg:pb-0 lg:text-[0.95rem] xl:text-[1.15rem]"
        >
          Tenang aja, kamu bisa revisi sampai CV-mu disetujui,
          <br className="hidden sm:block" />
          dan revisi alamat kerja GRATIS selamanya.
        </p>
      </div>
    </section>
  );
}

export function CvProblem() {
  const pains = ['CV-ku kok kelihatan biasa banget, ya?', 'Pengalaman kerja belum ada. CV-ku diisi apa?', 'Fresh graduate, emang CV harus diisi apa?', 'CV-ku yang lama berantakan banget.', 'Takut CV-ku nggak dilirik recruiter.'];
  return (
    <section data-section="problem" className="section bg-[#eef6ff]" aria-labelledby="problem-h">
      <div className="container-x grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h2 id="problem-h" className="h2 max-w-lg leading-[1.05]">Cari Lowongan Aja Udah Bikin Pusing. Jangan Ditambah Masalah Bikin CV.</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-ink/75 sm:text-lg">Mulai dari bingung harus isi apa, bikin desainnya gimana, sampai takut CV-mu nggak dilirik HRD.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {pains.map((p, index) => (
            <li
              key={p}
              style={{ animationDelay: `${index * 70}ms` }}
              className="rounded-2xl bg-white px-5 py-4 text-[15px] font-medium text-brand-navy shadow-soft ring-1 ring-brand-navy/5 transition-transform duration-300 ease-out hover:-translate-y-1 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal motion-reduce:transform-none motion-reduce:transition-none"
            >“{p}”</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CvPromise() {
  return (
    <section data-section="promise" className="section bg-brand-navy" aria-labelledby="promise-h">
      <div className="container-x max-w-4xl">
        <span
          className="block h-1.5 w-12 origin-left rounded bg-tsukure-yellow motion-safe:group-data-[reveal-state=visible]/reveal:animate-fade-in-up"
          aria-hidden
        />
        <h2 id="promise-h" style={{ animationDelay: '120ms' }} className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-white motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal sm:text-5xl">Aku bakal dukung kamu selama proses cari kerja.</h2>
        <p style={{ animationDelay: '260ms' }} className="mt-5 text-lg text-white/80 motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade">Mulai dari CV. Kami bantu kamu lebih siap melamar.</p>
      </div>
    </section>
  );
}

export function CvValue() {
  const items = [
    ['Struktur CV jelas', 'Anatomi CV disusun dengan struktur yang profesional dan mudah dipahami.'],
    ['Fresh graduate tetap punya nilai', 'Pendidikan, organisasi, magang, dan skill tetap bisa ditonjolkan.'],
    ['Tampilan rapi & profesional', 'Layout bersih, konsisten, dan nyaman dibaca recruiter.'],
    ['Informasi penting lebih menonjol', 'Poin penting tentang dirimu nggak tenggelam di antara isi CV.'],
    ['Tampil lebih meyakinkan', 'CV dibuat untuk menampilkan potensi terbaikmu sejak pertama kali dilihat.'],
  ];
  return (
    <section data-section="value" className="section bg-[#f3f3f3]" aria-labelledby="value-h">
      <div className="container-x max-w-6xl">
        <h2 id="value-h" style={{ animationDelay: '100ms' }} className="max-w-4xl font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-brand-navy motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal sm:text-5xl">Nggak Perlu Pusing Bikin CV. Kami Bantu Bikin Kamu Lebih Siap Melamar.</h2>
        <p style={{ animationDelay: '220ms' }} className="mt-5 max-w-4xl text-base leading-relaxed text-brand-ink/75 motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade sm:text-lg">Dari isi sampai tampilannya, kami bantu bikin CV yang lebih rapi, profesional, dan mampu menampilkan potensi terbaikmu.</p>
        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([t, d], index) => (
            <li
              key={t}
              style={{ animationDelay: `${index * 90}ms` }}
              className="flex items-start border-l-4 border-tsukure-yellow py-1 pl-5 transition-transform duration-300 ease-out hover:translate-x-1 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div>
                <h3 className="text-lg font-bold leading-snug text-brand-navy">{t}</h3>
                <p className="mt-2 text-base leading-relaxed text-brand-ink/70">{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CvPortfolioSection({ items }: { items: PortfolioView[] }) {
  return (
    <section id="contoh-cv" data-section="contoh-cv" className="section bg-brand-light" aria-labelledby="contoh-h">
      <div className="container-x">
        <h2 id="contoh-h" style={{ animationDelay: '100ms' }} className="h2 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal">Contoh CV yang Kami Buat</h2>
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
    <section data-section="before-after" className="section pb-0" aria-labelledby="ba-h">
      <div className="container-x grid items-end gap-10 lg:grid-cols-2">
        <div
          style={{ animationDelay: '100ms' }}
          className="flex items-end justify-center motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal lg:justify-start"
        >
          <Image
            src="/BRAND_AMBASSADOR2.png"
            alt=""
            width={1254}
            height={1254}
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 600px, 86vw"
            className="mx-auto block h-auto w-[86%] max-w-[430px] object-contain object-bottom lg:mx-0 lg:h-[600px] lg:w-[600px] lg:max-w-none xl:h-[680px] xl:w-[680px]"
            style={{ aspectRatio: '1254 / 1254' }}
          />
        </div>
        <div>
          <h2 id="ba-h" style={{ animationDelay: '180ms' }} className="h2 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal">Bedanya Kelihatan.</h2>
          <p style={{ animationDelay: '260ms' }} className="lead mt-4 motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade">Isinya sama, hasilnya beda. Geser untuk melihat struktur, jarak, tipografi, dan keterbacaan sebelum dan sesudah dirapikan.</p>
          <div style={{ animationDelay: '340ms' }} className="mt-6 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal">
            <BeforeAfterSlider
              before={<CvMock variant="messy" className="rounded-none border-0" />}
              after={
                <Image
                  src="/perbandingan%20sebelum%20dan%20sesudah.jpg"
                  alt="Perbandingan CV sebelum dan sesudah dirapikan"
                  width={1792}
                  height={2400}
                  sizes="(min-width: 640px) 24rem, 100vw"
                  className="h-auto w-full object-contain"
                  style={{ aspectRatio: '1792 / 2400' }}
                />
              }
            />
            <p className="mt-3 text-center text-xs text-brand-ink/55">Ilustrasi prinsip tata letak, bukan hasil klien.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CvBenefits() {
  const support = ['Dibantu menyiapkan CV', 'Struktur lebih rapi', 'Tampilan profesional', 'Cocok untuk fresh graduate', 'Siap digunakan untuk melamar'];
  return (
    <section data-section="benefits" className="section bg-[#f6f8fb]" aria-labelledby="benefit-h">
      <div className="container-x">
        <h2 id="benefit-h" style={{ animationDelay: '100ms' }} className="h2 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal">Bukan Cuma Dibikinin CV.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article style={{ animationDelay: '180ms' }} className="rounded-xl2 bg-white p-7 shadow-soft ring-1 ring-brand-navy/5 transition-transform duration-300 ease-out hover:-translate-y-1 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal motion-reduce:transform-none motion-reduce:transition-none">
            <p className="w-fit rounded-full bg-[#eef6ff] px-3 py-1 text-xs font-bold text-brand-navy">Sudah termasuk</p>
            <h3 className="mt-4 text-2xl font-bold text-brand-navy">Include Edit Pas Foto Professional</h3>
            <p className="mt-3 text-brand-ink/75">Pas foto kamu dibantu dirapikan agar lebih siap digunakan di CV.</p>
          </article>
          <article style={{ animationDelay: '300ms' }} className="rounded-xl2 bg-brand-navy p-7 text-white shadow-soft transition-transform duration-300 ease-out hover:-translate-y-1 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal motion-reduce:transform-none motion-reduce:transition-none">
            <p className="w-fit rounded-full bg-tsukure-yellow px-3 py-1 text-xs font-bold text-brand-ink">Garansi</p>
            <h3 className="mt-4 text-2xl font-bold text-white">Garansi Selamanya</h3>
            <p className="mt-3 text-white/85">Gratis revisi alamat kerja selamanya.</p>
            <p className="mt-3 text-sm text-white/60">Garansi ini berlaku untuk perubahan alamat kerja.</p>
          </article>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2">
          {support.map((s, index) => (
            <li
              key={s}
              style={{ animationDelay: `${index * 60}ms` }}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-navy ring-1 ring-brand-navy/5 transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade motion-reduce:transform-none motion-reduce:transition-none"
            >{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CvProcess({
  info = CV_INFO,
  checklist = CV_DATA_CHECKLIST,
}: {
  info?: CvInfo;
  checklist?: readonly string[];
}) {
  const steps = [
    ['Kirimin Dokumen', ['Kirimin dokumen yang diperlukan untuk CV, seperti foto dan data diri, ke WhatsApp Admin.']],
    ['Terima Invoice Resmi', ['Admin akan membuat invoice resmi sebelum pembuatan draft pertama CV.', 'Setelah itu CV mulai dikerjakan. Kamu bisa mengajukan revisi sesuai kebutuhan sampai CV disetujui.']],
    ['CV Siap Digunakan', ['Jika CV sudah disetujui, file softfile dan file siap print akan dikirimkan untuk siap digunakan.']],
  ] as const;
  return (
    <section data-section="process" className="section" aria-labelledby="proses-h">
      <div className="container-x">
        <h2 id="proses-h" style={{ animationDelay: '100ms' }} className="h2 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal">Pesan CV Tanpa Ribet.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li
              key={t}
              style={{ animationDelay: `${i * 120}ms` }}
              className="rounded-xl2 border border-brand-navy/10 p-6 transition-transform duration-300 ease-out hover:-translate-y-1 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-tsukure-yellow font-display text-lg font-extrabold text-brand-ink" aria-hidden>{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold"><span className="sr-only">Langkah {i + 1}: </span>{t}</h3>
              {d.map((p) => <p key={p} className="mt-2 text-[15px] leading-relaxed text-brand-ink/75">{p}</p>)}
              {i === 0 && checklist.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[15px] leading-relaxed text-brand-ink/75">
                  {checklist.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {i === 1 && info.turnaround && <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/75">{info.turnaround}</p>}
            </li>
          ))}
        </ol>
        <WaCta place="process" className="mt-8" />
      </div>
    </section>
  );
}

export function CvPricing({ info = CV_INFO }: { info?: CvInfo }) {
  const bundle = CV_PACKAGES.find((plan) => plan.id === 'bundle');
  if (!bundle) throw new Error('CV bundle package is missing');

  return (
    <ViewTracker
      event="pricing_view"
      id="harga"
      dataSection="pricing"
      className="relative overflow-hidden bg-[#dceeff] py-14 sm:py-16 lg:py-20"
      hideSticky
    >
      <div className="pointer-events-none absolute -left-[112px] -top-[112px] h-[240px] w-[240px] rounded-full bg-tsukure-yellow" aria-hidden />
      <div className="pointer-events-none absolute -bottom-[96px] -right-[96px] h-[190px] w-[190px] rounded-full bg-white" aria-hidden />

      <div className="container-x relative mx-auto max-w-[1290px]">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_330px] lg:gap-14 lg:pl-[100px]">
          <div className="relative z-10 max-w-[560px]">
            <h2 className="font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-brand-navy sm:text-[3.2rem] lg:text-[4.5rem]">
              Siap Lamar Kerja
              <br />
              Hari Ini?
            </h2>
            <p className="mt-5 max-w-[410px] text-lg leading-relaxed text-brand-navy sm:text-xl lg:text-[1.4rem]">
              Dapatkan Promo Harga untuk Semua Persiapan Lamaran Kerjamu
            </p>
          </div>

          <ScrollReveal
            className="relative z-10 mx-auto w-full max-w-[330px] lg:max-w-none"
            animation="premium-reveal"
          >
            <article className="relative min-h-[560px] rounded-[14px] bg-[#0d2d4f] px-7 pb-7 pt-6 text-white shadow-[0_20px_45px_rgba(13,45,79,0.2)] sm:min-h-[600px] sm:px-8">
              <span className="pointer-events-none absolute -left-11 -top-5 h-[90px] w-[90px] rounded-full bg-tsukure-yellow" aria-hidden />

              <div className="relative z-10 flex min-h-[510px] flex-col sm:min-h-[550px]">
              <h3 className="ml-1 font-display text-[2.2rem] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-white sm:text-[2.5rem]">
                <span className="block">PROMO</span>
                <span className="mt-1 block">PAKET</span>
                <span className="flex items-center gap-2 text-[3rem] leading-none sm:text-[3.25rem]">
                  LENGKAP
                  <span aria-hidden className="text-[1.45rem]">👍</span>
                </span>
              </h3>

              <div className="mt-6">
                <p className="text-left text-[1.1rem] leading-none text-white/65 line-through">
                  Rp{bundle.original.toLocaleString('id-ID')}
                </p>
                <p className="mt-1.5 text-left font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.04em] text-tsukure-yellow sm:text-[4rem]">
                  Rp{bundle.current.toLocaleString('id-ID')}
                </p>
              </div>

              <div className="mt-6 flex-1">
                <p className="text-lg font-bold">Yang kamu dapat :</p>
                {info.bundleDetail && (
                  <p className="mt-2 text-sm leading-snug text-white/85">{info.bundleDetail}</p>
                )}
                <ul className="mt-3 space-y-2">
                  {bundle.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-lg leading-snug">
                      <Check className="!mt-0.5 !h-4 !w-4 text-current" />
                      <span>
                        {feature}
                        {feature.startsWith('*Garansi') && bundle.guaranteeNote && hasCvTerms() && (
                          <a href={`#${CV_TERMS_ANCHOR}`} className="ml-1 underline underline-offset-2">{bundle.guaranteeNote}</a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-center">
                <WaCta
                  place="pricing-bundle"
                  pkg={bundle.id}
                  className="!min-h-[60px] !w-auto !min-w-[190px] !rounded-full !bg-tsukure-yellow !px-5 !py-2 !text-lg !font-bold !text-brand-navy !shadow-none hover:!bg-white hover:!text-brand-navy"
                >
                  Mau Ambil Promonya
                </WaCta>
              </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </ViewTracker>
  );
}

export function CvFaq({
  info = CV_INFO,
  checklist = CV_DATA_CHECKLIST,
}: {
  info?: CvInfo;
  checklist?: readonly string[];
} = {}) {
  const items: Array<[string, string]> = [
    ['Apakah bisa request desain?', 'Kamu bisa sampaikan kebutuhan desain lewat WhatsApp. Admin akan memberi tahu apa yang bisa dikerjakan.'],
    ['Apakah bisa untuk fresh graduate?', 'Bisa. Layanan ini dibuat untuk fresh graduate dan job seeker, termasuk yang belum punya pengalaman kerja.'],
    ['Bagaimana cara order dan apa saja data yang harus dikirim?', 'Dokumen yang diperlukan untuk CV, seperti foto dan data diri. Kamu kirim lewat WhatsApp Admin.'],
    ['Bagaimana proses revisi?', 'Setelah draft pertama jadi, kamu bisa mengajukan revisi sesuai kebutuhan sampai CV disetujui.'],
    ['Apakah ada invoice?', 'Ada. Admin membuat invoice resmi sebelum draft pertama CV dibuat.'],
    ['Bagaimana pembayaran?', 'Pembayaran mengikuti invoice resmi dari admin. Detail cara bayar diberikan admin lewat WhatsApp.'],
    ['File akhirnya apa saja?', 'Softfile dan file siap print.'],
    ['Apa itu file siap print?', 'File CV yang disiapkan supaya bisa langsung dicetak.'],
    ['Bagaimana garansi alamat kerja?', 'Revisi alamat kerja gratis selamanya. Garansi ini khusus untuk perubahan alamat kerja; untuk perubahan lain, tanyakan ke admin lewat WhatsApp.'],
  ];
  const faqItems = items.map(([question, answer], index) => {
    if (question === 'Bagaimana cara order dan apa saja data yang harus dikirim?') {
      return {
        id: String(index),
        question,
        answer: (
          <>
            <p>{answer}</p>
            {checklist.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {checklist.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            <p className="mt-2">Klik “Buat CV Sekarang”, lalu kirim dokumen yang diperlukan ke WhatsApp Admin.</p>
          </>
        ),
      };
    }
    if (question === 'Bagaimana pembayaran?') {
      const paymentDetails = [info.paymentMethods, info.paymentTiming].filter((detail): detail is string => detail !== null);
      if (paymentDetails.length > 0) {
        return {
          id: String(index),
          question,
          answer: (
            <>
              <p>{answer}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {paymentDetails.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </>
          ),
        };
      }
    }
    return { id: String(index), question, answer };
  });
  if (info.turnaround) faqItems.push({ id: String(faqItems.length), question: 'Berapa lama pengerjaannya?', answer: info.turnaround });
  return (
    <section data-section="faq" className="section" aria-labelledby="faq-h">
      <div className="container-x max-w-3xl">
        <h2 id="faq-h" style={{ animationDelay: '100ms' }} className="h2 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal">Pertanyaan yang Sering Muncul</h2>
        <div style={{ animationDelay: '200ms' }} className="mt-8 motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade"><FAQAccordion items={faqItems} /></div>
        <WaCta place="faq" className="mt-8" />
      </div>
    </section>
  );
}

export function CvTerms({ terms = CV_TERMS }: { terms?: readonly string[] }) {
  if (!hasCvTerms(terms)) return null;

  return (
    <section id={CV_TERMS_ANCHOR} data-hide-sticky="" className="section bg-white pb-28 md:pb-0" aria-labelledby="syarat-h">
      <div className="container-x max-w-3xl">
        <h2 id="syarat-h" className="h2">Syarat &amp; Ketentuan</h2>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-brand-ink/75">
          {terms.map((term, index) => <li key={index}>{term}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function CvPrivacy({ privacy = CV_PRIVACY }: { privacy?: readonly string[] }) {
  if (!hasCvPrivacy(privacy)) return null;

  return (
    <section id={CV_PRIVACY_ANCHOR} data-hide-sticky="" className="section bg-white pb-28 md:pb-0" aria-labelledby="privasi-h">
      <div className="container-x max-w-3xl">
        <h2 id="privasi-h" className="h2">Kebijakan Privasi</h2>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-brand-ink/75">
          {privacy.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function CvFooter({ terms = CV_TERMS, privacy = CV_PRIVACY }: { terms?: readonly string[]; privacy?: readonly string[] } = {}) {
  return (
    <footer className="bg-brand-navy pb-24 text-white md:pb-0">
      <div className="container-x border-t border-white/10 py-8 text-sm">
        <p className="font-display text-lg font-extrabold">TSUKURE.ID</p>
        <p className="mt-2 max-w-sm text-white/70">Jasa pembuatan CV profesional untuk fresh graduate dan job seeker.</p>
        <p className="mt-4"><a href="#contoh-cv" className="text-white/80 underline underline-offset-4 hover:text-white">Contoh CV</a></p>
        {hasCvTerms(terms) && <p className="mt-2"><a href={`#${CV_TERMS_ANCHOR}`} className="text-white/80 underline underline-offset-4 hover:text-white">Syarat &amp; Ketentuan</a></p>}
        {hasCvPrivacy(privacy) && <p className="mt-2"><a href={`#${CV_PRIVACY_ANCHOR}`} className="text-white/80 underline underline-offset-4 hover:text-white">Kebijakan Privasi</a></p>}
        <p className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} TSUKURE.ID</p>
      </div>
    </footer>
  );
}