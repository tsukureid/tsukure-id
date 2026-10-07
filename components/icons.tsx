const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function ServiceIcon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const common = { viewBox: '0 0 24 24', className, 'aria-hidden': true, ...P };
  switch (name) {
    case 'badge': return <svg {...common}><path d="M12 3l2.4 2.2 3.2-.3.9 3.1 2.8 1.7-1.2 3 1.2 3-2.8 1.7-.9 3.1-3.2-.3L12 21l-2.4-2.2-3.2.3-.9-3.1L2.7 14.3l1.2-3-1.2-3 2.8-1.7.9-3.1 3.2.3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case 'scan': return <svg {...common}><path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3" /><path d="M8 9h8M8 12h8M8 15h5" /></svg>;
    case 'graduation': return <svg {...common}><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.500 6-3v-4.500" /></svg>;
    case 'palette': return <svg {...common}><path d="M12 3a9 9 0 100 18c1.500 0 2-1 1.500-2.200-.5-1.200.2-2.300 1.500-2.300H17a4 4 0 004-4c0-5-4-9.500-9-9.500z" /><circle cx="8" cy="11" r="1" /><circle cx="12" cy="7.500" r="1" /><circle cx="16" cy="11" r="1" /></svg>;
    case 'sparkle': return <svg {...common}><path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800z" /><path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg>;
    default: return <svg {...common}><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>;
  }
}

export function WhatsappIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 00-8.600 15.100L2 22l5-1.300A10 10 0 1012 2zm0 18.200a8.200 8.200 0 01-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1112 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100a6.700 6.700 0 01-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.100-.7.300-.2.300-.9.900-.9 2.200s.9 2.500 1 2.700c.1.200 1.800 2.800 4.400 3.900 1.600.7 2.300.8 3.100.7.500-.1 1.500-.6 1.700-1.200.2-.6.200-1.100.2-1.200-.1-.2-.3-.2-.5-.3z" />
    </svg>
  );
}
