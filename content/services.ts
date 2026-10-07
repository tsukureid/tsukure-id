export type ServiceSeed = {
  slug: string; name: string; tagline: string; description: string; forWho: string;
  problem: string; solution: string; included: string[]; process: string[];
  revisionInfo: string; deliveryEta: string; fileFormat: string; icon: string;
  isFeatured: boolean; sortOrder: number;
};

const TBD_ETA = 'Dikonfirmasi saat pesanan dibuat';
const TBD_REV = 'Jumlah revisi mengikuti paket yang kamu pilih dan dikonfirmasi lewat WhatsApp sebelum pengerjaan.';
const FORMAT = 'PDF siap kirim (format lain bisa ditanyakan)';

/** Naskah layanan. Harga TIDAK ada di sini: diatur lewat admin (kolom starting_price). */
export const SERVICE_SEEDS: ServiceSeed[] = [
  {
    slug: 'cv-profesional', name: 'CV Profesional', icon: 'badge', isFeatured: true, sortOrder: 1,
    tagline: 'CV dibuat dari nol, rapi, dan sesuai posisi yang kamu incar.',
    description: 'Kamu kirim datanya, kami susun jadi CV dengan struktur jelas, tipografi bersih, dan isi yang relevan untuk posisi tujuanmu.',
    forWho: 'Kamu yang belum punya CV, atau CV lamamu terlalu berantakan untuk diperbaiki sedikit-sedikit.',
    problem: 'Data sebenarnya sudah ada, tapi bingung menyusunnya. Hasilnya CV panjang, padat, dan susah dibaca recruiter yang cuma punya beberapa detik.',
    solution: 'Kami menyusun ulang informasi berdasarkan prioritas, merapikan bahasa, dan mendesainnya supaya mudah dipindai.',
    included: ['Penyusunan struktur CV sesuai posisi tujuan', 'Perapian bahasa dan poin pengalaman', 'Desain rapi dan konsisten', 'File final siap kirim', 'Revisi sesuai paket'],
    process: ['Pilih layanan dan isi data', 'Kirim dokumen pendukung', 'Kami menyusun draf CV', 'Kamu cek dan minta revisi', 'CV final dikirim'],
    revisionInfo: TBD_REV, deliveryEta: TBD_ETA, fileFormat: FORMAT,
  },
  {
    slug: 'cv-ats-friendly', name: 'CV ATS-Friendly', icon: 'scan', isFeatured: false, sortOrder: 2,
    tagline: 'Format sederhana yang terbaca sistem seleksi otomatis.',
    description: 'Banyak perusahaan menyaring CV lewat sistem (ATS) sebelum dibaca manusia. CV ini disusun supaya mudah dibaca sistem maupun recruiter.',
    forWho: 'Kamu yang melamar ke perusahaan besar atau lewat portal lowongan online.',
    problem: 'CV dengan kolom, ikon, dan grafik bisa terbaca berantakan oleh sistem, sehingga informasi pentingmu terlewat.',
    solution: 'Kami memakai struktur satu alur, judul bagian standar, dan urutan informasi yang jelas tanpa elemen yang mengganggu pembacaan.',
    included: ['Format ramah ATS (tanpa elemen yang menyulitkan pembacaan sistem)', 'Judul bagian yang standar', 'Urutan informasi sesuai relevansi', 'File final siap kirim', 'Revisi sesuai paket'],
    process: ['Pilih layanan dan isi data', 'Kirim dokumen pendukung', 'Kami menyusun CV format ATS', 'Kamu cek dan minta revisi', 'CV final dikirim'],
    revisionInfo: TBD_REV, deliveryEta: TBD_ETA, fileFormat: FORMAT,
  },
  {
    slug: 'cv-fresh-graduate', name: 'CV Fresh Graduate', icon: 'graduation', isFeatured: false, sortOrder: 3,
    tagline: 'Belum punya pengalaman kerja? CV-mu tetap bisa meyakinkan.',
    description: 'Kami bantu menonjolkan pendidikan, organisasi, magang, proyek, dan skill sebagai bukti kamu siap belajar dan bekerja.',
    forWho: 'Fresh graduate, mahasiswa tingkat akhir, dan pencari kerja pertama.',
    problem: 'Merasa tidak punya apa-apa untuk ditulis, padahal pengalaman kuliah, organisasi, dan proyek bisa jadi nilai.',
    solution: 'Kami menggali dan menyusun pengalamanmu menjadi poin yang relevan dengan posisi yang dilamar.',
    included: ['Penggalian pengalaman non-kerja (organisasi, magang, proyek)', 'Penempatan pendidikan dan skill yang tepat', 'Bahasa yang jelas dan profesional', 'File final siap kirim', 'Revisi sesuai paket'],
    process: ['Pilih layanan dan isi data', 'Ceritakan pengalamanmu', 'Kami menyusun draf CV', 'Kamu cek dan minta revisi', 'CV final dikirim'],
    revisionInfo: TBD_REV, deliveryEta: TBD_ETA, fileFormat: FORMAT,
  },
  {
    slug: 'cv-redesign', name: 'CV Redesign', icon: 'palette', isFeatured: false, sortOrder: 4,
    tagline: 'Isi CV-mu sudah oke, tampilannya yang perlu dirapikan.',
    description: 'Kamu kirim CV lamamu. Kami perbaiki tata letak, hierarki visual, dan keterbacaan tanpa mengubah substansi.',
    forWho: 'Kamu yang sudah punya CV tapi tampilannya terasa biasa atau kurang profesional.',
    problem: 'Jarak tidak konsisten, font campur aduk, dan informasi penting tenggelam.',
    solution: 'Kami mendesain ulang tampilan supaya hierarkinya jelas dan nyaman dibaca.',
    included: ['Desain ulang tata letak dan tipografi', 'Perbaikan hierarki visual', 'Isi dipertahankan', 'File final siap kirim', 'Revisi sesuai paket'],
    process: ['Pilih layanan dan unggah CV lama', 'Kami mendesain ulang', 'Kamu cek dan minta revisi', 'CV final dikirim'],
    revisionInfo: TBD_REV, deliveryEta: TBD_ETA, fileFormat: FORMAT,
  },
  {
    slug: 'cv-optimization', name: 'CV Optimization', icon: 'sparkle', isFeatured: false, sortOrder: 5,
    tagline: 'Perbaikan isi: kalimat lebih jelas, poin lebih relevan.',
    description: 'Fokusnya di konten. Kami perbaiki pilihan kata, kejelasan, relevansi, dan susunan poin supaya pesanmu sampai.',
    forWho: 'Kamu yang tampilannya sudah oke, tapi merasa isi CV kurang kuat.',
    problem: 'Deskripsi pengalaman terlalu umum atau terlalu panjang, sehingga nilai kamu tidak terlihat.',
    solution: 'Kami menulis ulang poin-poin dengan bahasa yang spesifik dan sesuai posisi tujuan.',
    included: ['Perbaikan kalimat dan poin pengalaman', 'Penyesuaian dengan posisi tujuan', 'Saran struktur konten', 'File final siap kirim', 'Revisi sesuai paket'],
    process: ['Pilih layanan dan unggah CV lama', 'Kami meninjau dan memperbaiki isi', 'Kamu cek dan minta revisi', 'CV final dikirim'],
    revisionInfo: TBD_REV, deliveryEta: TBD_ETA, fileFormat: FORMAT,
  },
];
