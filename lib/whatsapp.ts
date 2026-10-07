import { formatRupiah } from './utils';

export function whatsappNumber(): string | null {
  const n = (process.env.WHATSAPP_NUMBER ?? '').replace(/[^\d]/g, '');
  return n.length >= 9 ? n : null;
}

export function buildWhatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function orderConfirmationMessage(o: { orderNumber: string; customerName: string; serviceName: string; totalPrice: number | null }): string {
  return [
    'Halo TSUKURE.ID,',
    '',
    'Saya ingin memesan jasa CV.',
    '',
    'Order:',
    `#${o.orderNumber}`,
    '',
    'Nama:',
    o.customerName,
    '',
    'Layanan:',
    o.serviceName,
    '',
    'Total:',
    o.totalPrice == null ? 'Menunggu konfirmasi harga' : formatRupiah(o.totalPrice),
  ].join('\n');
}

export const generalInquiryMessage = 'Halo TSUKURE.ID, saya mau tanya soal jasa pembuatan CV.';
