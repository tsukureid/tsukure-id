# Deploy ke Rumahweb

> Status: **belum diverifikasi terhadap paket hosting Rumahweb yang sebenarnya.** Dokumen ini adalah daftar periksa yang harus dikonfirmasi lebih dulu. Jangan berasumsi, dan jangan membagikan password, OTP, atau token akun Rumahweb kepada siapa pun.

## 1. Audit prasyarat (lakukan dulu di ClientZone/cPanel)

| Hal | Yang dicek | Dampak |
| --- | --- | --- |
| Node.js | Ada fitur *Setup Node.js App* (CloudLinux/Passenger) dan versi ≥ 20 | Tanpa ini, Next.js server tidak bisa jalan; pertimbangkan VPS |
| Database | MySQL/MariaDB tersedia di cPanel | Proyek ini memakai MySQL/MariaDB |
| Git/SSH | *Git Version Control* atau akses SSH | Menentukan cara deploy |
| Resource | Batas RAM/proses/inode | `next build` butuh memori besar; build sebaiknya dilakukan di CI/lokal |
| Penyimpanan | Direktori di luar `public_html` | Untuk `STORAGE_DIR` (file pelanggan privat) |

## 2. Environment

Isi di *Setup Node.js App* (jangan commit): `DATABASE_URL`, `AUTH_SECRET` (≥32 karakter), `NEXT_PUBLIC_SITE_URL=https://tsukure.id`, `WHATSAPP_NUMBER`, `STORAGE_DIR` (path absolut di luar `public_html`).

## 3. Database

Buat DB + user di cPanel → isi `DATABASE_URL=mysql://USER:PASS@localhost:3306/DBNAME` → `npm run db:push` → `npm run db:seed` (dengan `ADMIN_EMAIL`/`ADMIN_PASSWORD`).

## 4. Build dan jalankan

```bash
npm ci
npm run lint && npm run typecheck && npm test
npm run build
npm run start      # jalankan lewat Node.js App Rumahweb; JANGAN pakai npm run dev
```

Jika build di server terlalu berat, build di CI/lokal lalu unggah `.next`, `public`, `package.json`, `package-lock.json`, dan jalankan `npm ci --omit=dev` di server.

## 5. Domain, HTTPS, DNS

Pasang SSL (AutoSSL/Let's Encrypt), paksa HTTP→HTTPS, tentukan perilaku `www`→`tsukure.id`. **Periksa DNS sebelum mengubah**; jangan menghapus MX/SPF/DKIM/DMARC bila email dipakai.

## 6. Backup dan rollback

Sebelum deploy besar: backup database dan folder `STORAGE_DIR`, catat versi yang berjalan. Beri tag rilis (`git tag v0.1.0`). Rollback: deploy ulang tag sebelumnya (`git checkout v0.0.x`) lalu restart aplikasi; pulihkan DB dari backup bila ada perubahan skema.

## 7. Troubleshooting

- Halaman 500: cek log aplikasi; pastikan `DATABASE_URL` benar dan DB bisa dijangkau.
- Upload gagal: pastikan `STORAGE_DIR` ada dan dapat ditulis proses Node.
- Admin tidak bisa login: `AUTH_SECRET` kosong/<32 karakter, atau seed belum dijalankan.
