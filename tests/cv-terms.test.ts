import { describe, expect, it } from 'vitest';
import { CV_TERMS, CV_TERMS_ANCHOR, hasCvTerms } from '@/lib/cv-config';

describe('CV terms config', () => {
  it('hides terms when none have been provided', () => {
    expect(CV_TERMS).toEqual([]);
    expect(hasCvTerms()).toBe(false);
  });

  it('enables the terms section and anchor when terms are provided', () => {
    expect(hasCvTerms(['Contoh ketentuan untuk pengujian.'])).toBe(true);
    expect(CV_TERMS_ANCHOR).toBe('syarat-ketentuan');
  });
});
