import { getSetting, PAYMENT_SETTING_KEY, SOCIAL_SETTING_KEYS } from '@/lib/data';
import { SettingsForm } from '@/components/admin/settings-form';
import { whatsappNumber } from '@/lib/whatsapp';

export default async function SettingsPage() {
  const [payment, instagram, tiktok] = await Promise.all([
    getSetting(PAYMENT_SETTING_KEY), getSetting(SOCIAL_SETTING_KEYS.instagram), getSetting(SOCIAL_SETTING_KEYS.tiktok),
  ]);
  return (
    <div>
      <h1 className="mb-2 text-3xl font-extrabold">Pengaturan</h1>
      <p className="mb-6 text-sm text-brand-ink/60">Nomor WhatsApp bisnis diatur lewat environment (WHATSAPP_NUMBER): {whatsappNumber() ? 'sudah diisi' : 'BELUM diisi'}.</p>
      <SettingsForm payment={payment ?? ''} instagram={instagram ?? ''} tiktok={tiktok ?? ''} />
    </div>
  );
}
