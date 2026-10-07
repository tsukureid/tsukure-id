# TSUKURE.ID: website jasa pembuatan CV (MVP)

Next.js 15 (App Router) + TypeScript strict + Tailwind 3 + Drizzle ORM (MySQL/MariaDB) + Zod.
Cakupan MVP: **hanya layanan CV**. Ebook, produk digital, dashboard pelanggan, AI, dll. adalah roadmap, belum dibuat.

## Menjalankan lokal

```bash
cp .env.example .env        # isi DATABASE_URL, AUTH_SECRET, WHATSAPP_NUMBER
npm ci
npm run db:push             # buat tabel di MySQL/MariaDB (drizzle-kit push)
ADMIN_EMAIL=you@mail.com ADMIN_PASSWORD='min-12-karakter' npm run db:seed
npm run dev
```

Tanpa `DATABASE_URL`, halaman publik tetap tampil dengan naskah bawaan, tetapi pemesanan dan admin nonaktif (tidak ada data palsu).

## Perintah

| Perintah | Fungsi |
| --- | --- |
| `npm run lint` / `typecheck` / `test` / `build` | Pipeline CI (`.github/workflows/ci.yml`) |
| `npm run db:generate` | Hasilkan migrasi SQL ke `drizzle/` |
| `npm run db:push` | Terapkan skema langsung ke DB |
| `npm run db:seed` | Isi layanan, FAQ, dan akun admin awal |

## Struktur

- `app/(site)/` halaman publik, `app/admin/` panel admin, `app/api/files/` unduhan file privat (admin saja)
- `lib/` skema DB, validasi Zod, auth, WhatsApp, storage; `services/` PaymentService, EmailService, OrderService
- `content/` naskah layanan dan FAQ awal (tanpa harga)

## Data bisnis yang HARUS kamu isi (tidak dikarang)

Harga layanan dan paket, portfolio, testimoni, instruksi pembayaran, tautan Instagram/TikTok (semua lewat `/admin`), serta `WHATSAPP_NUMBER` di environment.

## Alur pesanan

Form `/pesan` → order + payment `UNPAID` (status `WAITING_PAYMENT`) → halaman status dengan instruksi bayar → upload bukti (payment `PENDING`, order `PAYMENT_REVIEW`) → admin tandai lunas (order `CONFIRMED`) → pengerjaan → revisi → selesai. Konfirmasi WhatsApp memakai `WHATSAPP_NUMBER`.

## Git

Branch: `main` (produksi), `develop`, `feature/*`, `fix/*`, `hotfix/*`. Commit: `feat:`, `fix:`, `refactor:`, `perf:`, `style:`, `docs:`, `test:`, `chore:`, `security:`.

Deploy ke Rumahweb: lihat `docs/deployment-rumahweb.md`.
