export const dynamic = 'force-dynamic';

export default async function HomePage() {
  return (
    <main data-maintenance-root="true" className="relative min-h-screen overflow-hidden bg-[#f7f7f2] text-brand-navy">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.12),transparent_30%)] blur-2xl" />
        <div className="absolute inset-x-10 top-20 h-56 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-60 w-60 rounded-full bg-brand-blue/15 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-52 w-52 rounded-full bg-brand-navy/10 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="rounded-[32px] border border-white/60 bg-white/35 px-8 py-10 text-center shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-12 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy/70">Status</p>
          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl md:text-6xl">WEB DALAM PEMBANGUNAN</h1>
          <p className="mt-5 text-base text-brand-navy/75 sm:text-lg">Karena website masih dalam tahap pembangunan.</p>
        </div>
      </div>
    </main>
  );
}
