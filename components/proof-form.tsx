'use client';
import { useActionState } from 'react';
import { uploadProof, type FormState } from '@/app/(site)/pesan/actions';
import { track } from '@/lib/analytics';

export function ProofForm({ orderNumber, token }: { orderNumber: string; token: string }) {
  const [state, action, pending] = useActionState(uploadProof.bind(null, orderNumber, token), {} as FormState);
  return (
    <form action={action} className="space-y-4" onSubmit={() => track('payment_started')}>
      {state.error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800">{state.error}</p>}
      <div>
        <label htmlFor="proof" className="label">Bukti transfer (gambar atau PDF, maks. 5 MB)</label>
        <input id="proof" name="proof" type="file" required accept=".pdf,.jpg,.jpeg,.png" className="field" />
      </div>
      <button type="submit" disabled={pending} className="btn-secondary w-full disabled:opacity-60">{pending ? 'Mengunggah...' : 'Kirim Bukti Pembayaran'}</button>
    </form>
  );
}
