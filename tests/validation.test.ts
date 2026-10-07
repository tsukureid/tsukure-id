import { describe, expect, it } from 'vitest';
import { checkUpload, orderSchema, MAX_FILE_BYTES } from '@/lib/validation';

const base = { customerName: 'Rina Putri', whatsapp: '0812-3456-7890', email: 'RINA@mail.com', serviceSlug: 'cv-profesional', targetPosition: 'Marketing Intern' };

describe('orderSchema', () => {
  it('menormalkan WhatsApp dan email', () => {
    const r = orderSchema.parse(base);
    expect(r.whatsapp).toBe('6281234567890');
    expect(r.email).toBe('rina@mail.com');
  });
  it('menolak nomor WhatsApp tidak valid', () => {
    expect(orderSchema.safeParse({ ...base, whatsapp: '123' }).success).toBe(false);
  });
  it('menolak email tidak valid dan nama terlalu pendek', () => {
    expect(orderSchema.safeParse({ ...base, email: 'bukan-email' }).success).toBe(false);
    expect(orderSchema.safeParse({ ...base, customerName: 'A' }).success).toBe(false);
  });
  it('menolak tautan selain http(s)', () => {
    expect(orderSchema.safeParse({ ...base, linkedin: 'javascript:alert(1)' }).success).toBe(false);
    expect(orderSchema.safeParse({ ...base, linkedin: 'https://linkedin.com/in/rina' }).success).toBe(true);
  });
});

describe('checkUpload', () => {
  it('menerima PDF dan PNG yang sah', () => {
    expect(checkUpload({ name: 'cv.pdf', type: 'application/pdf', size: 1000 }).ok).toBe(true);
    expect(checkUpload({ name: 'bukti.PNG', type: 'image/png', size: 1000 }).ok).toBe(true);
  });
  it('menolak ekstensi yang tidak cocok dengan MIME', () => {
    expect(checkUpload({ name: 'cv.exe', type: 'application/pdf', size: 1000 }).ok).toBe(false);
  });
  it('menolak tipe tidak diizinkan, file kosong, dan file terlalu besar', () => {
    expect(checkUpload({ name: 'a.svg', type: 'image/svg+xml', size: 10 }).ok).toBe(false);
    expect(checkUpload({ name: 'a.pdf', type: 'application/pdf', size: 0 }).ok).toBe(false);
    expect(checkUpload({ name: 'a.pdf', type: 'application/pdf', size: MAX_FILE_BYTES + 1 }).ok).toBe(false);
  });
});
