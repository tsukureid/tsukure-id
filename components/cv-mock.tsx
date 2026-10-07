import { cn } from '@/lib/utils';

/** Ilustrasi dokumen CV (bukan hasil klien). Dipakai untuk menjelaskan prinsip tata letak. */
export function CvMock({ variant = 'clean', className }: { variant?: 'clean' | 'messy'; className?: string }) {
  if (variant === 'messy') {
    return (
      <div aria-hidden className={cn('aspect-[3/4] w-full overflow-hidden rounded-lg border border-brand-navy/15 bg-white p-4 text-[7px] leading-tight', className)}>
        <div className="text-[11px] font-bold text-red-700" style={{ fontFamily: 'serif' }}>NAMA LENGKAP</div>
        <div className="mt-1 text-[8px] italic text-green-800">alamat, telepon, email, linkedin, instagram, tiktok</div>
        <div className="mt-2 bg-yellow-200 px-1 font-bold">TENTANG SAYA</div>
        <div className="space-y-[3px] pt-1">{[96, 100, 92, 100, 88, 100, 70].map((w, i) => <div key={i} className="h-[3px] rounded bg-neutral-400" style={{ width: `${w}%` }} />)}</div>
        <div className="mt-2 text-[9px] font-bold underline" style={{ fontFamily: 'cursive' }}>Pengalaman</div>
        <div className="space-y-[3px] pt-1">{[100, 100, 100, 94, 100, 100, 98, 100, 60].map((w, i) => <div key={i} className="h-[3px] rounded bg-neutral-500" style={{ width: `${w}%` }} />)}</div>
        <div className="mt-2 text-[8px] font-bold text-blue-700">PENDIDIKAN dan SKILL</div>
        <div className="space-y-[3px] pt-1">{[100, 85, 100, 100, 70].map((w, i) => <div key={i} className="h-[3px] rounded bg-neutral-400" style={{ width: `${w}%` }} />)}</div>
      </div>
    );
  }
  return (
    <div aria-hidden className={cn('aspect-[3/4] w-full overflow-hidden rounded-lg border border-brand-navy/10 bg-white shadow-soft', className)}>
      <div className="grid h-full grid-cols-[34%_1fr]">
        <div className="space-y-3 bg-brand-light p-[7%]">
          <div className="h-8 w-8 rounded-full bg-brand-blue" />
          <div className="h-2 w-4/5 rounded bg-brand-navy" />
          <div className="h-1.5 w-3/5 rounded bg-brand-navy/50" />
          <div className="pt-2"><div className="mb-1.5 h-1.5 w-1/2 rounded bg-brand-blue-dark" />{[90, 70, 80].map((w, i) => <div key={i} className="mb-1 h-1 rounded bg-brand-navy/25" style={{ width: `${w}%` }} />)}</div>
          <div><div className="mb-1.5 h-1.5 w-1/2 rounded bg-brand-blue-dark" />{[75, 85, 60].map((w, i) => <div key={i} className="mb-1 h-1 rounded bg-brand-navy/25" style={{ width: `${w}%` }} />)}</div>
          <div><div className="mb-1.5 h-1.5 w-1/2 rounded bg-brand-blue-dark" />{[80, 65, 90, 70].map((w, i) => <div key={i} className="mb-1 h-1 rounded bg-brand-navy/25" style={{ width: `${w}%` }} />)}</div>
        </div>
        <div className="space-y-3 p-[7%]">
          <div className="h-3 w-3/5 rounded bg-brand-navy" />
          <div className="h-1.5 w-2/5 rounded bg-brand-gold" />
          {[0, 1, 2, 3, 4].map((s) => (
            <div key={s} className="pt-1.5">
              <div className="mb-1.5 h-2 w-2/5 rounded bg-brand-blue-dark" />
              {[100, 92, 96, 60].map((w, i) => <div key={i} className="mb-1 h-1 rounded bg-brand-ink/20" style={{ width: `${w}%` }} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
