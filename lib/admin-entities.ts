import 'server-only';
import { schema } from './db';

export type FieldDef = {
  name: string; label: string; type: 'text' | 'textarea' | 'number' | 'bool' | 'lines' | 'select';
  options?: string[]; required?: boolean; help?: string;
};
export type EntityDef = {
  key: string; title: string; table: unknown; fields: FieldDef[]; listColumns: string[]; publishField?: 'isPublished' | 'active';
};

const t = (name: string, label: string, required = true, help?: string): FieldDef => ({ name, label, type: 'text', required, help });
const ta = (name: string, label: string, required = true): FieldDef => ({ name, label, type: 'textarea', required });
const num = (name: string, label: string, required = false, help?: string): FieldDef => ({ name, label, type: 'number', required, help });
const bool = (name: string, label: string): FieldDef => ({ name, label, type: 'bool' });
const lines = (name: string, label: string): FieldDef => ({ name, label, type: 'lines', help: 'Satu item per baris' });

export const ENTITIES: Record<string, EntityDef> = {
  services: {
    key: 'services', title: 'Layanan', table: schema.services, listColumns: ['name', 'slug', 'startingPrice'], publishField: 'isPublished',
    fields: [
      t('name', 'Nama'), t('slug', 'Slug (URL)', true, 'huruf kecil dan tanda hubung, mis. cv-profesional'), t('tagline', 'Tagline'),
      ta('description', 'Deskripsi'), ta('forWho', 'Untuk siapa'), ta('problem', 'Masalah'), ta('solution', 'Solusi'),
      lines('included', 'Yang didapat'), lines('process', 'Proses'), ta('revisionInfo', 'Info revisi'),
      t('deliveryEta', 'Estimasi pengerjaan'), t('fileFormat', 'Format file'),
      num('startingPrice', 'Harga mulai dari (Rp)', false, 'Kosongkan bila belum ditentukan'),
      { name: 'icon', label: 'Ikon', type: 'select', options: ['file', 'badge', 'scan', 'graduation', 'palette', 'sparkle'] },
      bool('isFeatured', 'Layanan unggulan'), bool('isPublished', 'Tayang'), num('sortOrder', 'Urutan'),
    ],
  },
  portfolio: {
    key: 'portfolio', title: 'Portfolio', table: schema.portfolios, listColumns: ['title', 'category'], publishField: 'isPublished',
    fields: [
      t('title', 'Judul'), t('slug', 'Slug (URL)'),
      { name: 'category', label: 'Kategori', type: 'select', options: ['professional', 'ats', 'fresh-graduate', 'redesign'], required: true },
      ta('description', 'Deskripsi singkat'), { name: 'useCase', label: 'Cocok untuk', type: 'textarea' },
      t('image', 'Gambar CV', true, 'Path file di folder public (mis. /portfolio/cv-1.webp) atau URL https'),
      t('imageAfter', 'Gambar sesudah (opsional)', false), lines('tags', 'Tag'), bool('isPublished', 'Tayang'),
    ],
  },
  pricing: {
    key: 'pricing', title: 'Harga', table: schema.pricingPlans, listColumns: ['name', 'price'], publishField: 'active',
    fields: [t('name', 'Nama paket'), ta('description', 'Deskripsi'), num('price', 'Harga (Rp)', true), lines('features', 'Fitur'), bool('popular', 'Paling dipilih'), bool('active', 'Aktif'), num('sortOrder', 'Urutan')],
  },
  testimonials: {
    key: 'testimonials', title: 'Testimoni', table: schema.testimonials, listColumns: ['name', 'status'], publishField: 'isPublished',
    fields: [t('name', 'Nama'), t('status', 'Status (mis. Fresh Graduate)'), num('rating', 'Rating (1-5)', true), ta('content', 'Isi testimoni'), bool('isPublished', 'Tayang'), num('sortOrder', 'Urutan')],
  },
  faq: {
    key: 'faq', title: 'FAQ', table: schema.faqs, listColumns: ['question'], publishField: 'isPublished',
    fields: [t('question', 'Pertanyaan'), ta('answer', 'Jawaban'), bool('isPublished', 'Tayang'), num('sortOrder', 'Urutan')],
  },
};
