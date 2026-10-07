import 'server-only';
import { and, asc, desc, eq } from 'drizzle-orm';
import { getDb, isDbConfigured, schema } from './db';
import { SERVICE_SEEDS } from '@/content/services';
import { FAQ_SEEDS } from '@/content/faq';

export type ServiceView = {
  id: string; slug: string; name: string; tagline: string; description: string; forWho: string;
  problem: string; solution: string; included: string[]; process: string[]; revisionInfo: string;
  deliveryEta: string; fileFormat: string; startingPrice: number | null; icon: string; isFeatured: boolean;
};
export type PortfolioView = {
  id: string; title: string; slug: string; category: string; description: string; useCase: string | null;
  image: string; imageAfter: string | null; tags: string[];
};
export type PlanView = { id: string; name: string; description: string; price: number; features: string[]; popular: boolean; serviceId: string | null };
export type TestimonialView = { id: string; name: string; status: string; rating: number; content: string; avatar: string | null };
export type FaqView = { id: string; question: string; answer: string };

/** Bila DB belum dikonfigurasi/tidak terjangkau, halaman publik tetap tampil dengan naskah bawaan (tanpa data bisnis palsu). */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDbConfigured()) return fallback;
  try {
    return await fn();
  } catch (e) {
    console.error('[data] query failed', e instanceof Error ? e.message : e);
    return fallback;
  }
}

const seedServices: ServiceView[] = SERVICE_SEEDS.map((s) => ({ ...s, id: s.slug, startingPrice: null }));

export async function getServices(): Promise<ServiceView[]> {
  return safe(async () => {
    const rows = await getDb().select().from(schema.services).where(eq(schema.services.isPublished, true)).orderBy(asc(schema.services.sortOrder));
    return rows.length ? rows : seedServices;
  }, seedServices);
}

export async function getService(slug: string): Promise<ServiceView | null> {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

export async function getPortfolio(): Promise<PortfolioView[]> {
  return safe(
    () => getDb().select().from(schema.portfolios).where(eq(schema.portfolios.isPublished, true)).orderBy(desc(schema.portfolios.createdAt)),
    [],
  );
}

export async function getPortfolioItem(slug: string): Promise<PortfolioView | null> {
  return safe(async () => {
    const r = await getDb().select().from(schema.portfolios)
      .where(and(eq(schema.portfolios.slug, slug), eq(schema.portfolios.isPublished, true))).limit(1);
    return r[0] ?? null;
  }, null);
}

export async function getPlans(): Promise<PlanView[]> {
  return safe(
    () => getDb().select().from(schema.pricingPlans).where(eq(schema.pricingPlans.active, true)).orderBy(asc(schema.pricingPlans.sortOrder)),
    [],
  );
}

export async function getTestimonials(): Promise<TestimonialView[]> {
  return safe(
    () => getDb().select().from(schema.testimonials).where(eq(schema.testimonials.isPublished, true)).orderBy(asc(schema.testimonials.sortOrder)),
    [],
  );
}

export async function getFaqs(): Promise<FaqView[]> {
  const fallback = FAQ_SEEDS.map((f, i) => ({ id: String(i), ...f }));
  return safe(async () => {
    const rows = await getDb().select().from(schema.faqs).where(eq(schema.faqs.isPublished, true)).orderBy(asc(schema.faqs.sortOrder));
    return rows.length ? rows : fallback;
  }, fallback);
}

export async function getSetting(key: string): Promise<string | null> {
  return safe(async () => {
    const r = await getDb().select().from(schema.siteSettings).where(eq(schema.siteSettings.key, key)).limit(1);
    return r[0]?.value ?? null;
  }, null);
}

export const PAYMENT_SETTING_KEY = 'payment_instructions';
export const SOCIAL_SETTING_KEYS = { instagram: 'instagram_url', tiktok: 'tiktok_url' } as const;
