import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';

const COOKIE = 'tsukure_admin';
const MAX_AGE = 60 * 60 * 8;

function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error('AUTH_SECRET harus diisi (minimal 32 karakter)');
  return new TextEncoder().encode(s);
}

export type AdminSession = { id: string; email: string; name: string };

export async function createSession(admin: AdminSession): Promise<void> {
  const token = await new SignJWT({ ...admin })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.id !== 'string' || typeof payload.email !== 'string') return null;
    return { id: payload.id, email: payload.email, name: String(payload.name ?? '') };
  } catch {
    return null;
  }
}

/** Dipanggil di setiap halaman/aksi admin. Otorisasi selalu dicek di server. */
export async function requireAdmin(): Promise<AdminSession> {
  const s = await getSession();
  if (!s) redirect('/admin/login');
  return s;
}
