import 'server-only';
import { eq } from 'drizzle-orm';
import { getDb, schema } from '@/lib/db';
import type { PaymentMethod, PaymentStatus } from '@/lib/db-schema';

/**
 * Abstraksi pembayaran. MVP = manual (transfer/QRIS + bukti + verifikasi admin).
 * Provider otomatis (Midtrans/Xendit/dll) belum dipilih, jadi tidak ada integrasi palsu.
 * Saat provider dipilih, tambahkan implementasi baru dengan kontrak yang sama.
 */
export interface PaymentService {
  createPayment(input: { orderId: string; amount: number | null; method?: PaymentMethod }): Promise<{ id: string }>;
  verifyPayment(paymentId: string, outcome: 'PAID' | 'FAILED'): Promise<void>;
  getPaymentStatus(orderId: string): Promise<PaymentStatus>;
}

export const manualPaymentService: PaymentService = {
  async createPayment({ orderId, amount, method = 'BANK_TRANSFER' }) {
    const id = crypto.randomUUID();
    await getDb().insert(schema.payments).values({ id, orderId, amount, method, status: 'UNPAID' });
    return { id };
  },
  async verifyPayment(paymentId, outcome) {
    const db = getDb();
    await db.update(schema.payments)
      .set({ status: outcome, paidAt: outcome === 'PAID' ? new Date() : null })
      .where(eq(schema.payments.id, paymentId));
  },
  async getPaymentStatus(orderId) {
    const rows = await getDb().select().from(schema.payments).where(eq(schema.payments.orderId, orderId));
    const latest = rows.at(-1);
    return latest?.status ?? 'UNPAID';
  },
};
