'use client';
import { useActionState } from 'react';
import { saveSettings, type AdminState } from '@/app/admin/actions';

export function SettingsForm({ payment, instagram, tiktok }: { payment: string; instagram: string; tiktok: string }) {
  const [state, action, pending] = useActionState(saveSettings, {} as AdminState);
  return (
    <form action={action} className="max-w-2xl space-y-5">
      {state.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800">{state.error}</p>}
      {state.ok && <p role="status" className="rounded-xl bg-brand-light p-3 text-sm font-medium text-brand-navy">Pengaturan disimpan.</p>}
      <div><label htmlFor="payment_instructions" className="label">Instruksi pembayaran</label><textarea id="payment_instructions" name="payment_instructions" rows={6} defaultValue={payment} className="field" placeholder="Nama bank, nomor rekening, atas nama, atau cara bayar QRIS" /><p className="mt-1 text-sm text-brand-ink/55">Ditampilkan ke pelanggan setelah pesanan dibuat.</p></div>
      <div><label htmlFor="instagram_url" className="label">Tautan Instagram</label><input id="instagram_url" name="instagram_url" defaultValue={instagram} placeholder="https://instagram.com/..." className="field" /></div>
      <div><label htmlFor="tiktok_url" className="label">Tautan TikTok</label><input id="tiktok_url" name="tiktok_url" defaultValue={tiktok} placeholder="https://tiktok.com/@..." className="field" /></div>
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">{pending ? 'Menyimpan...' : 'Simpan'}</button>
    </form>
  );
}
