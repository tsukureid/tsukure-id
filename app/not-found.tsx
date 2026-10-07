import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section"><div className="container-x text-center">
      <h1 className="text-4xl font-extrabold">Halaman tidak ditemukan</h1>
      <p className="lead mt-4">Tautan yang kamu buka tidak ada atau sudah dipindahkan.</p>
      <Link href="/" className="btn-primary mt-8">Kembali ke Beranda</Link>
    </div></section>
  );
}
