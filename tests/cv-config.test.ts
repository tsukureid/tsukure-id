import { describe, expect, it } from 'vitest';
import { buildCvWhatsappUrl, CV_PRICE, CV_WHATSAPP_URL, CV_WHATSAPP_MESSAGE, CV_PACKAGES } from '@/lib/cv-config';

describe('cv-config', () => {
  it('URL WhatsApp persis sesuai brief', () => {
    expect(CV_WHATSAPP_URL).toBe('https://wa.me/6289651450855?text=%28LP-CV%29%20Hi%20Admin%2C%20Aku%20ingin%20bikin%20CV%20kerja%20nih.');
  });
  it('harga sesuai brief', () => {
    expect(CV_PRICE).toEqual({ current: 29000, original: 45000 });
  });
  it.each(CV_PACKAGES)('URL WhatsApp untuk $id menyebut nama paket', (pkg) => {
    const url = buildCvWhatsappUrl(pkg.id);
    const encodedMessage = url.substring(url.indexOf('text=') + 'text='.length);

    expect(url).toMatch(/^https:\/\/wa\.me\/6289651450855\?text=/);
    expect(encodedMessage).toContain('%28LP-CV%29%20Hi%20Admin%2C%20Aku%20ingin%20bikin%20CV%20kerja%20nih.');
    expect(decodeURIComponent(encodedMessage)).toBe(`${CV_WHATSAPP_MESSAGE} Aku pilih ${pkg.name}.`);
  });
});
