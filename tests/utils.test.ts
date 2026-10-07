import { describe, expect, it } from 'vitest';
import { formatRupiah, generateOrderNumber, normalizeWhatsapp } from '@/lib/utils';
import { allow } from '@/lib/rate-limit';
import { buildWhatsappUrl, orderConfirmationMessage } from '@/lib/whatsapp';

describe('utils', () => {
  it('normalizeWhatsapp', () => {
    expect(normalizeWhatsapp('0812 3456 7890')).toBe('6281234567890');
    expect(normalizeWhatsapp('+62 812-3456-7890')).toBe('6281234567890');
    expect(normalizeWhatsapp('81234567890')).toBe('6281234567890');
  });
  it('formatRupiah tidak mengarang harga', () => {
    expect(formatRupiah(null)).toBe('Hubungi kami');
    expect(formatRupiah(50000)).toContain('50.000');
  });
  it('generateOrderNumber berformat TSK-YYMMDD-XXXXX', () => {
    expect(generateOrderNumber(new Date(2026, 9, 7), () => 0)).toBe('TSK-261007-AAAAA');
    expect(generateOrderNumber()).toMatch(/^TSK-\d{6}-[A-Z2-9]{5}$/);
  });
});

describe('rate limit', () => {
  it('membatasi setelah batas tercapai dan pulih setelah jendela waktu', () => {
    const k = `t-${Math.random()}`;
    expect(allow(k, 2, 1000, 0)).toBe(true);
    expect(allow(k, 2, 1000, 10)).toBe(true);
    expect(allow(k, 2, 1000, 20)).toBe(false);
    expect(allow(k, 2, 1000, 2000)).toBe(true);
  });
});

describe('whatsapp', () => {
  it('pesan konfirmasi memuat nomor pesanan, nama, layanan, dan total', () => {
    const m = orderConfirmationMessage({ orderNumber: 'TSK-1', customerName: 'Rina', serviceName: 'CV Profesional', totalPrice: null });
    expect(m).toContain('#TSK-1');
    expect(m).toContain('Rina');
    expect(m).toContain('CV Profesional');
    expect(m).toContain('Menunggu konfirmasi harga');
  });
  it('URL wa.me meng-encode pesan', () => {
    expect(buildWhatsappUrl('62812', 'a b\nc')).toBe('https://wa.me/62812?text=a%20b%0Ac');
  });
});
