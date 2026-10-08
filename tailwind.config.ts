import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#5B9FE3',
          'blue-dark': '#2F6FB5', // teks biru yang lolos kontras di atas putih
          light: '#DCEEFF',
          navy: '#14213D',
          gold: '#D4A72C',
          ink: '#111111',
        },
        // Khusus landing /cv. Tidak mengubah token yang dipakai halaman lain.
        tsukure: { yellow: '#FCD702' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { xl2: '1.25rem' },
      boxShadow: { soft: '0 8px 30px -12px rgba(20,33,61,0.18)' },
    },
  },
  plugins: [],
};
export default config;
