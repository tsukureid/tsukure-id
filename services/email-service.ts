import 'server-only';

/**
 * Abstraksi email. Belum ada provider terkonfigurasi, jadi MVP tidak mengirim email palsu.
 * Isi SMTP_* di environment dan tambahkan implementasi (mis. nodemailer) saat siap.
 */
export interface EmailService {
  isConfigured(): boolean;
  send(msg: { to: string; subject: string; text: string }): Promise<{ sent: boolean; reason?: string }>;
}

export const emailService: EmailService = {
  isConfigured: () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  async send() {
    return { sent: false, reason: 'Provider email belum dikonfigurasi' };
  },
};
