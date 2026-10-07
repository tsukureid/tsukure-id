import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/plus-jakarta-sans';
import './globals.css';
import { DEFAULT_DESC } from '@/lib/seo';
import { siteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'Jasa Pembuatan CV Profesional & ATS untuk Fresh Graduate | TSUKURE.ID', template: '%s | TSUKURE.ID' },
  description: DEFAULT_DESC,
  alternates: { canonical: siteUrl('/') },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#FFFFFF' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
