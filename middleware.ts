import { NextResponse, type NextRequest } from 'next/server';

/** Lapisan awal: arahkan ke login bila tidak ada cookie. Verifikasi token yang sebenarnya tetap dilakukan di server (requireAdmin). */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !req.cookies.get('tsukure_admin')) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
