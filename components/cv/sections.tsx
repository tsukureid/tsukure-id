import Image from 'next/image';
import { BeforeAfterSlider } from '../before-after-slider';
import { CvMock } from '../cv-mock';
import { FAQAccordion } from '../faq-accordion';
import { CvPortfolio } from './portfolio';
import { PortfolioAnchorCta, WaCta } from './cta';
import { ViewTracker } from './view-tracker';
import { ScrollReveal } from '../home/reveal-section';
import { CV_PACKAGES } from '@/lib/cv-config';
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
    />
  </div>
);

export function CvHero() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-h">
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
            className="whitespace-nowrap text-[2rem] font-extrabold leading-[1.3] tracking-[-0.045em] text-brand-navy motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal min-[380px]:text-[2.2rem] min-[430px]:text-[2.4rem] sm:text-[3rem] lg:text-[2.6rem] lg:leading-[1.32] xl:text-[3.2rem]"
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
          *Tenang aja, CV-mu bisa terus disesuaikan GRATIS
          <br />
          sampai kamu dapat kerja.
        </p>
      </div>
    </section>
  );
}

export function CvProblem() {
  const pains = ['CV-ku kok kelihatan biasa banget, ya?', 'Pengalaman kerja belum ada. CV-ku diisi apa?', 'Fresh graduate, emang CV harus diisi apa?', 'CV-ku yang lama berantakan banget.', 'Takut CV-ku nggak dilirik recruiter.'];
  return (
    <section className="section bg-[#eef6ff]" aria-labelledby="problem-h">
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
    <section className="section bg-brand-navy" aria-labelledby="promise-h">
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
    <section className="section bg-[#f3f3f3]" aria-labelledby="value-h">
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
    <section id="contoh-cv" className="section bg-brand-light" aria-labelledby="contoh-h">
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
    <section className="section pb-0" aria-labelledby="ba-h">
      <div className="container-x grid items-end gap-10 lg:grid-cols-2">
        <div
          style={{ animationDelay: '100ms' }}
          className="flex items-end justify-center motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal lg:justify-start"
        >
          <Image
            src="/BRAND_AMBASSADOR2.png"
            alt="Profesional wanita memegang CV"
            width={1254}
            height={1254}
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 600px, 86vw"
            className="mx-auto block h-auto w-[86%] max-w-[430px] object-contain object-bottom lg:mx-0 lg:h-[600px] lg:w-[600px] lg:max-w-none xl:h-[680px] xl:w-[680px]"
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
    <section className="section bg-[#f6f8fb]" aria-labelledby="benefit-h">
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

export function CvProcess() {
  const steps = [
    ['Kirimin Dokumen', ['Kirimin dokumen yang diperlukan untuk CV, seperti foto dan data diri, ke WhatsApp Admin.']],
    ['Terima Invoice Resmi', ['Admin akan membuat invoice resmi sebelum pembuatan draft pertama CV.', 'Setelah itu CV mulai dikerjakan. Kamu bisa mengajukan revisi sesuai kebutuhan sampai CV disetujui.']],
    ['CV Siap Digunakan', ['Jika CV sudah disetujui, file softfile dan file siap print akan dikirimkan untuk siap digunakan.']],
  ] as const;
  return (
    <section className="section" aria-labelledby="proses-h">
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CvPricing() {
  return (
    <ViewTracker
      event="pricing_view"
      id="harga"
      className="relative overflow-hidden bg-[#dceeff] pb-10 pt-10 sm:pt-12 lg:pt-14 xl:pb-0"
      hideSticky
    >
      {/* Lingkaran putih kepotong di pojok kiri atas */}
      <div
        className="pointer-events-none absolute -left-[210px] -top-[215px] h-[400px] w-[400px] rounded-full bg-white"
        aria-hidden
      />

      <div className="container-x relative mx-auto max-w-[1500px]">
        <h2 style={{ animationDelay: '100ms' }} className="text-center font-display text-[1.9rem] font-extrabold uppercase leading-[1.1] tracking-[-0.03em] text-brand-navy motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal sm:text-[2.5rem] lg:text-[2.8rem] xl:whitespace-nowrap xl:text-[3.2rem]">
          Pilih Paket Sesuai Kebutuhanmu
        </h2>

        <div className="mt-8 grid items-stretch gap-3 lg:grid-cols-3 xl:mt-10 xl:gap-2">
          {CV_PACKAGES.map((plan, index) => {
            const isPhoto = plan.id === 'photo';
            const isCvOnly = plan.id === 'cv-only';
            const isBundle = plan.id === 'bundle';

            const tone = isBundle
              ? {
                  card: 'bg-[#0d2d4f] text-white',
                  strike: 'text-white/65',
                  note: 'text-white/70',
                  btn: '!border-tsukure-yellow !bg-tsukure-yellow !text-brand-navy',
                }
              : isCvOnly
                ? {
                    card: 'bg-tsukure-yellow text-brand-navy',
                    strike: 'text-brand-navy/55',
                    note: 'text-brand-navy/70',
                    btn: '!border-brand-navy !bg-transparent !text-brand-navy',
                  }
                : {
                    card: 'bg-white text-[#111111]',
                    strike: 'text-[#111111]/55',
                    note: 'text-[#111111]/60',
                    btn: '!border-[#111111] !bg-white !text-[#111111]',
                  };

            const [line1, line2] = isPhoto
              ? ['EDIT', 'PAS FOTO']
              : isCvOnly
                ? ['PAKET', 'CV ONLY']
                : ['PAKET', 'BUNDLE'];

            return (
              <ScrollReveal
                key={plan.id}
                className="h-full"
                animation="premium-reveal"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <article
                  className={`relative z-10 mx-auto flex min-h-[470px] w-full max-w-[300px] flex-col rounded-[18px] px-5 pb-6 pt-7 shadow-soft transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none lg:max-w-none xl:mb-[42px] xl:min-h-[470px] ${tone.card}`}
                >
                  {/* Lingkaran kuning dekoratif (kartu Pas Foto & Bundle) */}
                  {isPhoto && (
                    <span className="pointer-events-none absolute -left-9 top-12 z-0 h-[94px] w-[94px] rounded-full bg-tsukure-yellow" aria-hidden />
                  )}
                  {isBundle && (
                    <span className="pointer-events-none absolute -left-4 -top-4 z-0 h-[88px] w-[88px] rounded-full bg-tsukure-yellow" aria-hidden />
                  )}

                  <div className="relative z-10 flex flex-1 flex-col">
                  <h3 className={[
                    'font-display font-extrabold uppercase leading-[1.05] tracking-[-0.03em]',
                    isBundle ? 'ml-12 text-[1.4rem] sm:text-[1.6rem]' : 'text-[1.6rem]',
                  ].join(' ')}>
                    <span className={isBundle ? 'block text-white' : 'block'}>{line1}</span>
                    <span className={isBundle ? 'flex items-center gap-2 text-[2.1rem] leading-none text-white sm:text-[2.5rem]' : 'flex items-center gap-2 text-[2.1rem] leading-none sm:text-[2.5rem]'}>
                      {line2}
                      {isBundle && <span className="text-[1.5rem] leading-none text-white" aria-hidden>👍</span>}
                    </span>
                  </h3>

                  <p className={`mt-5 text-center text-[1.4rem] font-medium leading-none line-through decoration-2 ${tone.strike}`}>
                    <span className="sr-only">Harga normal </span>
                    {formatRupiah(plan.original)}
                  </p>
                  <p className={[
                    'mt-1 text-center font-display font-extrabold leading-[1.1] tracking-[-0.04em]',
                    isBundle ? 'text-[2.7rem] sm:text-[3.1rem]' : 'text-[2.9rem] sm:text-[3.3rem]',
                  ].join(' ')}>
                    <span className="sr-only">Harga sekarang </span>
                    {formatRupiah(plan.current)}
                  </p>

                  <h4 className={[
                    'mt-6 text-[0.95rem] font-extrabold',
                    isBundle ? 'text-white' : 'text-brand-navy',
                  ].join(' ')}>Yang kamu dapat :</h4>

                  <ul className={[
                    'mt-3 space-y-2.5',
                    isBundle ? 'text-white' : 'text-brand-navy',
                  ].join(' ')}>
                    {plan.features.map((feature, index) => {
                      const isGuarantee = feature.startsWith('*Garansi');
                      return (
                        <li
                          key={feature}
                          style={{ animationDelay: `${index * 70}ms` }}
                          className="flex gap-2 text-[0.92rem] leading-snug motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade sm:text-[0.98rem]"
                        >
                          <Check className="!h-4 !w-4 text-current" />
                          <span className="block">
                            {feature}
                            {isGuarantee && plan.id !== 'photo' && plan.guaranteeNote && (
                              <span className={`mt-0.5 block text-[0.72rem] ${tone.note}`}>{plan.guaranteeNote}</span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-auto flex justify-center pt-7">
                    <WaCta
                      place={`pricing-${plan.id}`}
                      className={`!w-auto !min-w-[140px] !rounded-full !border-2 !px-5 !py-2 !text-[0.9rem] !font-bold !shadow-none ${tone.btn}`}
                    >
                      Mau Paket Ini
                    </WaCta>
                  </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
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
    ['Berapa harganya?', `Tersedia paket Edit Pas Foto ${formatRupiah(CV_PACKAGES[0].current)}, CV Only ${formatRupiah(CV_PACKAGES[1].current)}, dan Bundle ${formatRupiah(CV_PACKAGES[2].current)}.`],
    ['Bagaimana pembayaran?', 'Pembayaran mengikuti invoice resmi dari admin. Detail cara bayar diberikan admin lewat WhatsApp.'],
    ['File akhirnya apa saja?', 'Softfile dan file siap print.'],
    ['Apa itu file siap print?', 'File CV yang disiapkan supaya bisa langsung dicetak.'],
    ['Bagaimana garansi alamat kerja?', 'Revisi alamat kerja gratis selamanya. Garansi ini khusus untuk perubahan alamat kerja; untuk perubahan lain, tanyakan ke admin lewat WhatsApp.'],
    ['Bagaimana cara order?', 'Klik “Buat CV Sekarang”, lalu kirim dokumen yang diperlukan ke WhatsApp Admin.'],
  ];
  return (
    <section className="section" aria-labelledby="faq-h">
      <div className="container-x max-w-3xl">
        <h2 id="faq-h" style={{ animationDelay: '100ms' }} className="h2 motion-safe:group-data-[reveal-state=visible]/reveal:animate-premium-reveal">Pertanyaan yang Sering Muncul</h2>
        <div style={{ animationDelay: '200ms' }} className="mt-8 motion-safe:group-data-[reveal-state=visible]/reveal:animate-stagger-fade"><FAQAccordion items={items.map(([question, answer], i) => ({ id: String(i), question, answer }))} /></div>
      </div>
    </section>
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