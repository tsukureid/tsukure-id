import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

function key(): string {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error('AUTH_SECRET harus diisi (minimal 32 karakter)');
  return s;
}

/** Token akses halaman status pesanan (tanpa login). Diturunkan dari nomor pesanan, tidak disimpan. */
export function orderToken(orderNumber: string): string {
  return createHmac('sha256', key()).update(`order:${orderNumber}`).digest('base64url').slice(0, 24);
}

export function verifyOrderToken(orderNumber: string, token: string | undefined): boolean {
  if (!token) return false;
  const a = Buffer.from(orderToken(orderNumber));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}
