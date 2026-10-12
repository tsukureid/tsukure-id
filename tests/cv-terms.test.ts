import { describe, expect, it } from 'vitest';
import { CV_PRIVACY, CV_PRIVACY_ANCHOR, CV_TERMS, CV_TERMS_ANCHOR, hasCvPrivacy, hasCvTerms } from '@/lib/cv-config';

describe('CV terms config', () => {
  it('hides terms when none have been provided', () => {
    expect(CV_TERMS).toEqual([]);
    expect(hasCvTerms()).toBe(false);
  });

  describe('CV privacy config and rendering', () => {
    it('hides the privacy section and footer link until policy text is provided', () => {
      expect(CV_PRIVACY).toEqual([]);
      expect(hasCvPrivacy()).toBe(false);
    });

    it('renders a configured privacy section and footer anchor', () => {
      const privacy = ['Kebijakan contoh untuk pengujian.'];

      expect(hasCvPrivacy(privacy)).toBe(true);
      expect(CV_PRIVACY_ANCHOR).toBe('privasi');
    });
  });

  it('enables the terms section and anchor when terms are provided', () => {
    expect(hasCvTerms(['Contoh ketentuan untuk pengujian.'])).toBe(true);
    expect(CV_TERMS_ANCHOR).toBe('syarat-ketentuan');
  });
});
