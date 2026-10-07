import { z } from 'zod';
import { normalizeWhatsapp } from './utils';

export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_UPLOADS: Record<string, string[]> = {
  'application/pdf': ['pdf'],
  'application/msword': ['doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'image/jpeg': ['jpg', 'jpeg'],
  'image/png': ['png'],
};

export type FileCheck = { ok: true; ext: string } | { ok: false; error: string };

export function checkUpload(file: { name: string; type: string; size: number }): FileCheck {
  if (file.size <= 0) return { ok: false, error: 'File kosong.' };
  if (file.size > MAX_FILE_BYTES) return { ok: false, error: 'Ukuran file maksimal 5 MB.' };
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const allowedExt = ALLOWED_UPLOADS[file.type];
  if (!allowedExt || !allowedExt.includes(ext)) return { ok: false, error: 'Format file harus PDF, DOC, DOCX, JPG, atau PNG.' };
  if (!/^[^\\/:*?"<>|\x00-\x1f]{1,150}$/.test(file.name)) return { ok: false, error: 'Nama file tidak valid.' };
  return { ok: true, ext };
}

const optionalUrl = z.string().trim().max(300).optional().transform((v) => (v ? v : undefined))
  .refine((v) => !v || /^https?:\/\/.+/i.test(v), 'Tautan harus diawali http:// atau https://');

export const orderSchema = z.object({
  customerName: z.string().trim().min(2, 'Nama minimal 2 karakter').max(120),
  whatsapp: z.string().trim().transform(normalizeWhatsapp)
    .refine((v) => /^62\d{8,13}$/.test(v), 'Nomor WhatsApp tidak valid (contoh: 0812xxxxxxxx)'),
  email: z.string().trim().toLowerCase().email('Email tidak valid').max(190),
  serviceSlug: z.string().trim().min(1, 'Pilih layanan').max(80),
  targetPosition: z.string().trim().min(2, 'Isi posisi yang dilamar').max(160),
  targetCompany: z.string().trim().max(160).optional().transform((v) => v || undefined),
  linkedin: optionalUrl,
  portfolioUrl: optionalUrl,
  notes: z.string().trim().max(2000).optional().transform((v) => v || undefined),
  utmSource: z.string().trim().max(80).optional(),
  utmMedium: z.string().trim().max(80).optional(),
  utmCampaign: z.string().trim().max(120).optional(),
  utmContent: z.string().trim().max(120).optional(),
  landingPath: z.string().trim().max(300).optional(),
});
export type OrderInput = z.infer<typeof orderSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(200),
});
