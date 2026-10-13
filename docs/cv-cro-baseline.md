# Baseline CV CRO

- Tanggal: 12 Oktober 2026
- Branch: `feature/cv-cro`, dibuat dari `main` karena branch `develop` tidak tersedia.
- Commit baseline: `412d5965fbaf71d8cc36f98f7c6d314aeaadba05`.

## Validasi lokal

| Perintah | Hasil |
| --- | --- |
| `npm ci` | Lulus |
| `npm run lint` | Lulus, tanpa error atau warning ESLint |
| `npm run typecheck` | Lulus |
| `npm test` | Lulus: 3 file, 15 test |
| `npm run build` | Lulus |

Catatan: instalasi melaporkan 15 kerentanan dependency (7 high, 8 moderate); tidak ada dependency yang diubah. Next.js juga memperingatkan bahwa workspace root terdeteksi dari lockfile di direktori induk dan ada lockfile lain. Peringatan ini tidak diubah pada fase baseline.

## Screenshot dan pemeriksaan responsif

Screenshot diambil pada zoom 100%, tinggi viewport 900px, dari production build lokal commit baseline. Chrome Headless 154:

| Lebar | Screenshot | Hasil H1 |
| ---: | --- | --- |
| 320px | [cv-320.png](./cv-cro-baseline/cv-320.png) | Terpotong di sisi kanan |
| 360px | [cv-360.png](./cv-cro-baseline/cv-360.png) | Muat |
| 390px | [cv-390.png](./cv-cro-baseline/cv-390.png) | Muat |
| 768px | [cv-768.png](./cv-cro-baseline/cv-768.png) | Muat |
| 1280px | [cv-1280.png](./cv-cro-baseline/cv-1280.png) | Muat |

Emulasi mobile 360px mengonfirmasi H1 memakai `whitespace-nowrap`. Pada 320px batas kanan H1 mencapai 336px (viewport 320px), tetapi halaman tidak memiliki scroll horizontal karena overflow section memotong konten. Pada 360px dan 390px batas kanan H1 masing-masing 340px dan 368px. Temuan ini memenuhi kondisi untuk memeriksa FR-4 pada Fase 1; tidak ada kode yang diubah pada Fase 0.

## Lighthouse mobile

| Halaman yang diuji | Performance | Accessibility | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| Build lokal pada `http://localhost:3000/cv` | 96 | 100 | 92 | 2,65 s | 0,00068 |
| Production pada `https://tsukure.id/cv` | 97 | 100 | 92 | 2,14 s | 0 |

Ini adalah satu kali pengukuran pada Chrome Headless 154; variasi lingkungan dan jaringan dapat memengaruhi hasil.

## Sticky CTA dan FAQ

Pada emulasi 360×800, lokal dan production sama-sama menampilkan sticky CTA setelah scroll 600px dengan tinggi 73px. CTA tersembunyi ketika section `#harga` terlihat dan tombol tutup berfungsi. Di footer, sticky CTA tetap tampil, namun padding bawah footer 96px menjaga konten terakhir (batas bawah 672px) di atas CTA (batas atas 727px).

Tidak ada exception JavaScript maupun resource halaman/chunk yang gagal dimuat pada pemeriksaan browser; kedua lingkungan meminta `/favicon.ico` dan menerima 404. FAQ memiliki 11 elemen `<details>`, semuanya tertutup pada pemuatan awal. `FAQAccordion` mengirim `faq_open` dengan parameter `id` saat dibuka.

## Deployment dan catatan

Riwayat deployment GitHub mencatat Production dengan SHA `412d5965fbaf71d8cc36f98f7c6d314aeaadba05`, status `success`; SHA tersebut sama dengan `HEAD` dan `origin/main` saat baseline. Branch `develop` tidak tersedia. Perilaku sticky CTA di situs Production cocok dengan build lokal.

Lokasi PRD yang diminta (`docs/PRD-cv-cro.md`) tidak ada saat baseline; dokumen yang dibaca berada di akar repo sebagai `PRD-cv-cro.md`. File PRD tersebut dan direktori untracked `tsukure-id/` dibiarkan tanpa perubahan. Request `/favicon.ico` 404, peringatan dependency di atas, dan kebutuhan persetujuan cookie untuk analytics dicatat sebagai hal di luar perubahan fase ini.
