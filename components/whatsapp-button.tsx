'use client';
import { WhatsappIcon } from './icons';
import { track } from '@/lib/analytics';

export function WhatsAppButton({ href }: { href: string | null }) {
  if (!href) return null;
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp"
      onClick={() => track('whatsapp_click', { place: 'floating' })}
      className="fixed bottom-4 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-brand-navy text-white shadow-soft transition-colors hover:bg-brand-blue hover:text-brand-navy sm:h-12 sm:w-auto sm:gap-2 sm:px-4"
    >
      <WhatsappIcon />
      <span className="sr-only sm:not-sr-only sm:hidden">WhatsApp</span>
    </a>
  );
}
