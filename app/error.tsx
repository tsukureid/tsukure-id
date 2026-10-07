'use client';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section"><div className="container-x text-center">
      <h1 className="text-4xl font-extrabold">Ada yang salah</h1>
      <p className="lead mt-4">Halaman gagal dimuat. Coba lagi sebentar.</p>
      <button type="button" onClick={reset} className="btn-primary mt-8">Muat Ulang</button>
    </div></section>
  );
}
