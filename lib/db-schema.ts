import {
  mysqlTable, varchar, text, int, boolean, timestamp, json, mysqlEnum, index,
} from 'drizzle-orm/mysql-core';

const id = () => varchar('id', { length: 36 }).primaryKey();
const createdAt = () => timestamp('created_at').notNull().defaultNow();
const updatedAt = () => timestamp('updated_at').notNull().defaultNow().onUpdateNow();

export const ORDER_STATUSES = [
  'PENDING', 'WAITING_PAYMENT', 'PAYMENT_REVIEW', 'CONFIRMED',
  'IN_PROGRESS', 'REVISION', 'COMPLETED', 'CANCELLED',
] as const;
export const PAYMENT_METHODS = ['BANK_TRANSFER', 'QRIS', 'MANUAL', 'OTHER'] as const;
export const PAYMENT_STATUSES = ['UNPAID', 'PENDING', 'PAID', 'FAILED', 'REFUNDED'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const admins = mysqlTable('admins', {
  id: id(),
  email: varchar('email', { length: 190 }).notNull().unique(),
  name: varchar('name', { length: 120 }).notNull(),
  passwordHash: varchar('password_hash', { length: 120 }).notNull(),
  createdAt: createdAt(),
});

export const customers = mysqlTable('customers', {
  id: id(),
  name: varchar('name', { length: 120 }).notNull(),
  whatsapp: varchar('whatsapp', { length: 24 }).notNull(),
  email: varchar('email', { length: 190 }).notNull(),
  createdAt: createdAt(),
}, (t) => [index('customers_wa_idx').on(t.whatsapp), index('customers_email_idx').on(t.email)]);

export const services = mysqlTable('services', {
  id: id(),
  slug: varchar('slug', { length: 80 }).notNull().unique(),
  name: varchar('name', { length: 120 }).notNull(),
  tagline: varchar('tagline', { length: 240 }).notNull(),
  description: text('description').notNull(),
  forWho: text('for_who').notNull(),
  problem: text('problem').notNull(),
  solution: text('solution').notNull(),
  included: json('included').$type<string[]>().notNull(),
  process: json('process').$type<string[]>().notNull(),
  revisionInfo: text('revision_info').notNull(),
  deliveryEta: varchar('delivery_eta', { length: 120 }).notNull(),
  fileFormat: varchar('file_format', { length: 120 }).notNull(),
  startingPrice: int('starting_price'),
  icon: varchar('icon', { length: 40 }).notNull().default('file'),
  isFeatured: boolean('is_featured').notNull().default(false),
  isPublished: boolean('is_published').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const pricingPlans = mysqlTable('pricing_plans', {
  id: id(),
  name: varchar('name', { length: 120 }).notNull(),
  description: text('description').notNull(),
  price: int('price').notNull(),
  features: json('features').$type<string[]>().notNull(),
  popular: boolean('popular').notNull().default(false),
  active: boolean('active').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),
  serviceId: varchar('service_id', { length: 36 }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const portfolios = mysqlTable('portfolios', {
  id: id(),
  title: varchar('title', { length: 160 }).notNull(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  category: varchar('category', { length: 40 }).notNull(),
  description: text('description').notNull(),
  useCase: text('use_case'),
  image: varchar('image', { length: 400 }).notNull(),
  imageAfter: varchar('image_after', { length: 400 }),
  tags: json('tags').$type<string[]>().notNull(),
  isPublished: boolean('is_published').notNull().default(false),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const testimonials = mysqlTable('testimonials', {
  id: id(),
  name: varchar('name', { length: 120 }).notNull(),
  status: varchar('status', { length: 120 }).notNull(),
  rating: int('rating').notNull().default(5),
  content: text('content').notNull(),
  avatar: varchar('avatar', { length: 400 }),
  isPublished: boolean('is_published').notNull().default(false),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const faqs = mysqlTable('faqs', {
  id: id(),
  question: varchar('question', { length: 300 }).notNull(),
  answer: text('answer').notNull(),
  isPublished: boolean('is_published').notNull().default(true),
  sortOrder: int('sort_order').notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const orders = mysqlTable('orders', {
  id: id(),
  orderNumber: varchar('order_number', { length: 24 }).notNull().unique(),
  customerId: varchar('customer_id', { length: 36 }).notNull(),
  serviceId: varchar('service_id', { length: 36 }).notNull(),
  targetPosition: varchar('target_position', { length: 160 }).notNull(),
  targetCompany: varchar('target_company', { length: 160 }),
  linkedin: varchar('linkedin', { length: 300 }),
  portfolioUrl: varchar('portfolio_url', { length: 300 }),
  notes: text('notes'),
  internalNotes: text('internal_notes'),
  status: mysqlEnum('status', ORDER_STATUSES).notNull().default('WAITING_PAYMENT'),
  totalPrice: int('total_price'),
  utmSource: varchar('utm_source', { length: 80 }),
  utmMedium: varchar('utm_medium', { length: 80 }),
  utmCampaign: varchar('utm_campaign', { length: 120 }),
  utmContent: varchar('utm_content', { length: 120 }),
  landingPath: varchar('landing_path', { length: 300 }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [index('orders_status_idx').on(t.status), index('orders_utm_idx').on(t.utmSource)]);

export const orderHistory = mysqlTable('order_history', {
  id: id(),
  orderId: varchar('order_id', { length: 36 }).notNull(),
  action: varchar('action', { length: 80 }).notNull(),
  detail: text('detail'),
  createdAt: createdAt(),
});

export const orderAttachments = mysqlTable('order_attachments', {
  id: id(),
  orderId: varchar('order_id', { length: 36 }).notNull(),
  kind: varchar('kind', { length: 24 }).notNull(),
  fileName: varchar('file_name', { length: 200 }).notNull(),
  storageKey: varchar('storage_key', { length: 300 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  size: int('size').notNull(),
  createdAt: createdAt(),
});

export const payments = mysqlTable('payments', {
  id: id(),
  orderId: varchar('order_id', { length: 36 }).notNull(),
  method: mysqlEnum('method', PAYMENT_METHODS).notNull().default('BANK_TRANSFER'),
  amount: int('amount'),
  status: mysqlEnum('status', PAYMENT_STATUSES).notNull().default('UNPAID'),
  proofKey: varchar('proof_key', { length: 300 }),
  paidAt: timestamp('paid_at'),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const contactMessages = mysqlTable('contact_messages', {
  id: id(),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 190 }).notNull(),
  message: text('message').notNull(),
  createdAt: createdAt(),
});

export const siteSettings = mysqlTable('site_settings', {
  key: varchar('key', { length: 80 }).primaryKey(),
  value: text('value').notNull(),
  updatedAt: updatedAt(),
});
