'use client';
import { useEffect } from 'react';
import { UTM_KEYS } from '@/lib/analytics';

const KEY = 'tsukure_attribution';

/** Simpan UTM + landing path dari kunjungan pertama, dipakai OrderForm saat pesan. */
export function UtmCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hasUtm = UTM_KEYS.some((k) => params.get(k));
      if (!hasUtm && localStorage.getItem(KEY)) return;
      if (!hasUtm) {
        localStorage.setItem(KEY, JSON.stringify({ landingPath: window.location.pathname }));
        return;
      }
      const data: Record<string, string> = { landingPath: window.location.pathname };
      UTM_KEYS.forEach((k) => { const v = params.get(k); if (v) data[k] = v.slice(0, 120); });
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch { /* storage dinonaktifkan: atribusi dilewati */ }
  }, []);
  return null;
}

export function readAttribution(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, string>;
  } catch {
    return {};
  }
}
