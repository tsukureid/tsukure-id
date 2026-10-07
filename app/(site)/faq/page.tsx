import { getFaqs } from '@/lib/data';
import { FAQAccordion } from '@/components/faq-accordion';
import { jsonLd, pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = pageMeta({ title: 'FAQ Jasa Pembuatan CV', description: 'Jawaban atas pertanyaan seputar jasa pembuatan CV: ATS, fresh graduate, revisi, pembayaran, dan cara order.', path: '/faq' });

export default async function FaqPage() {
  const items = await getFaqs();
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <h1 className="text-4xl font-extrabold sm:text-5xl">FAQ</h1>
        <div className="mt-8"><FAQAccordion items={items} /></div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />
    </section>
  );
}
