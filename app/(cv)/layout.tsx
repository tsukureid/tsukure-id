/** Layout kosong untuk landing kampanye: tanpa navbar, footer situs, atau tombol WhatsApp melayang bawaan. */
export default function CvLayout({ children }: { children: React.ReactNode }) {
  return <main id="konten">{children}</main>;
}
