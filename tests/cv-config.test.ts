import { describe, expect, it } from 'vitest';
import { CV_PRICE, CV_WHATSAPP_URL } from '@/lib/cv-config';

describe('cv-config', () => {
  it('URL WhatsApp persis sesuai brief', () => {
    expect(CV_WHATSAPP_URL).toBe('https://wa.me/628965140855?text=%28LP-CV%29%20Hi%20Admin%2C%20Aku%20ingin%20bikin%20CV%20kerja%20nih.');
  });
  it('harga sesuai brief', () => {
    expect(CV_PRICE).toEqual({ current: 29000, original: 45000 });
  });
});
