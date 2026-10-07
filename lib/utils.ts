export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function formatRupiah(value: number | null | undefined): string {
  if (value == null) return 'Hubungi kami';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

export function siteUrl(path = ''): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tsukure.id').replace(/\/$/, '');
  return `${base}${path}`;
}

/** Nomor WA ke format internasional tanpa +, mis. 0812xxx -> 62812xxx */
export function normalizeWhatsapp(input: string): string {
  const digits = input.replace(/[^\d]/g, '');
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `62${digits}`;
  return digits;
}

export function generateOrderNumber(date = new Date(), rand = Math.random): string {
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 5; i++) suffix += alphabet[Math.floor(rand() * alphabet.length)];
  return `TSK-${y}${m}${d}-${suffix}`;
}

/** Label harga awal: tidak menulis "Mulai dari Hubungi kami" bila harga belum ditentukan. */
export function priceFromLabel(value: number | null | undefined): { prefix: string; amount: string } {
  return value == null ? { prefix: 'Harga:', amount: 'hubungi kami' } : { prefix: 'Mulai dari', amount: formatRupiah(value) };
}
