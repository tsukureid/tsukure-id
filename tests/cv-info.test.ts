import { describe, expect, it } from 'vitest';
import { CV_DATA_CHECKLIST, CV_INFO, type CvInfo } from '@/lib/cv-config';

describe('CV information configuration', () => {
  it('keeps owner-provided business information empty until it is available', () => {
    expect(CV_INFO).toEqual({
      turnaround: null,
      paymentMethods: null,
      paymentTiming: null,
      bundleDetail: null,
    });
  });

  it('provides the requested draft checklist', () => {
    expect(CV_DATA_CHECKLIST).toEqual([
      'Foto',
      'Nama lengkap',
      'Kontak (telepon/email)',
      'Pendidikan',
      'Pengalaman kerja/magang/organisasi (jika ada)',
      'Skill',
      'CV lama (jika ada)',
    ]);
  });

  it('supports owner-reviewed values without supplying example business claims', () => {
    const ownerProvidedInfo: CvInfo = {
      turnaround: 'Estimasi dari pemilik',
      paymentMethods: 'Metode dari pemilik',
      paymentTiming: 'Waktu pembayaran dari pemilik',
      bundleDetail: 'Detail paket dari pemilik',
    };

    expect(Object.values(ownerProvidedInfo)).toEqual([
      'Estimasi dari pemilik',
      'Metode dari pemilik',
      'Waktu pembayaran dari pemilik',
      'Detail paket dari pemilik',
    ]);
  });
});
