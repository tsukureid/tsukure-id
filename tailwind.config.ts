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
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(0.75rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'stagger-fade': {
          '0%': { opacity: '0', transform: 'translateY(0.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'premium-reveal': {
          '0%': { opacity: '0', transform: 'translate3d(0, 1.5rem, 0) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        shimmer: {
          '0%': { opacity: '0.35', transform: 'translateX(-100%)' },
          '100%': { opacity: '0.7', transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.375rem)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'stagger-fade': 'stagger-fade 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'premium-reveal': 'premium-reveal 750ms cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
