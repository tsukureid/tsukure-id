import 'server-only';
import { eq } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db';
import { generateOrderNumber } from '@/lib/utils';
import { storage } from '@/lib/storage';
import { manualPaymentService } from './payment-service';
import type { OrderInput } from '@/lib/validation';
import type { OrderStatus } from '@/lib/db-schema';

export type UploadedFile = { kind: 'cv_lama' | 'dokumen'; name: string; type: string; size: number; data: Buffer; ext: string };

export async function createOrder(input: OrderInput, service: { id: string; name: string }, price: number | null, files: UploadedFile[]) {
  const db = getDb();
  const existing = await db.select().from(schema.customers)
    .where(eq(schema.customers.whatsapp, input.whatsapp)).limit(5);
  let customer = existing.find((c) => c.email === input.email);
  if (!customer) {
    const id = crypto.randomUUID();
    await db.insert(schema.customers).values({ id, name: input.customerName, whatsapp: input.whatsapp, email: input.email });
    customer = { id, name: input.customerName, whatsapp: input.whatsapp, email: input.email, createdAt: new Date() };
  }

  const orderId = crypto.randomUUID();
  let orderNumber = generateOrderNumber();
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await db.insert(schema.orders).values({
        id: orderId, orderNumber, customerId: customer.id, serviceId: service.id,
        targetPosition: input.targetPosition, targetCompany: input.targetCompany, linkedin: input.linkedin,
        portfolioUrl: input.portfolioUrl, notes: input.notes, status: 'WAITING_PAYMENT', totalPrice: price,
        utmSource: input.utmSource, utmMedium: input.utmMedium, utmCampaign: input.utmCampaign,
        utmContent: input.utmContent, landingPath: input.landingPath,
      });
      break;
    } catch (e) {
      const dup = e instanceof Error && /Duplicate entry/i.test(e.message);
      if (!dup || attempt === 4) throw e;
      orderNumber = generateOrderNumber();
    }
  }

  for (const f of files) {
    const storageKey = await storage.save(`orders/${orderId}`, f.data, f.ext);
    await db.insert(schema.orderAttachments).values({
      id: crypto.randomUUID(), orderId, kind: f.kind, fileName: f.name.slice(0, 200), storageKey, mimeType: f.type, size: f.size,
    });
  }
  await manualPaymentService.createPayment({ orderId, amount: price });
  await addHistory(orderId, 'ORDER_CREATED', `Pesanan dibuat untuk layanan ${service.name}`);
  return { orderId, orderNumber };
}

export async function addHistory(orderId: string, action: string, detail?: string): Promise<void> {
  await getDb().insert(schema.orderHistory).values({ id: crypto.randomUUID(), orderId, action, detail });
}

export async function getOrderByNumber(orderNumber: string) {
  const db = getDb();
  const rows = await db.select({ order: schema.orders, service: schema.services, customer: schema.customers })
    .from(schema.orders)
    .innerJoin(schema.services, eq(schema.orders.serviceId, schema.services.id))
    .innerJoin(schema.customers, eq(schema.orders.customerId, schema.customers.id))
    .where(eq(schema.orders.orderNumber, orderNumber)).limit(1);
  return rows[0] ?? null;
}

export async function setOrderStatus(orderId: string, status: OrderStatus, actor: string): Promise<void> {
  await getDb().update(schema.orders).set({ status }).where(eq(schema.orders.id, orderId));
  await addHistory(orderId, 'STATUS_CHANGED', `${actor} mengubah status menjadi ${status}`);
}
