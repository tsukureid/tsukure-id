import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { getDb, schema } from '@/lib/db';
import { storage } from '@/lib/storage';

export const dynamic = 'force-dynamic';

const MIME: Record<string, string> = { pdf: 'application/pdf', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };

/** File pelanggan bersifat privat: hanya admin yang login yang bisa mengunduh. */
export async function GET(_req: Request, { params }: { params: Promise<{ kind: string; id: string }> }) {
  if (!(await getSession())) return new NextResponse('Unauthorized', { status: 401 });
  const { kind, id } = await params;
  const db = getDb();
  let key: string | null = null;
  let name = 'file';
  if (kind === 'attachment') {
    const [a] = await db.select().from(schema.orderAttachments).where(eq(schema.orderAttachments.id, id)).limit(1);
    key = a?.storageKey ?? null; name = a?.fileName ?? name;
  } else if (kind === 'proof') {
    const [p] = await db.select().from(schema.payments).where(eq(schema.payments.id, id)).limit(1);
    key = p?.proofKey ?? null; name = `bukti-${id}`;
  }
  if (!key) return new NextResponse('Not found', { status: 404 });
  const ext = key.split('.').pop() ?? '';
  const data = await storage.read(key);
  return new NextResponse(new Uint8Array(data), {
    headers: {
      'Content-Type': MIME[ext] ?? 'application/octet-stream',
      'Content-Disposition': `inline; filename="${name.replace(/[^\w.-]/g, '_')}.${ext}"`.replace(`.${ext}.${ext}`, `.${ext}`),
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
