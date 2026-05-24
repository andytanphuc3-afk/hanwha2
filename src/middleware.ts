import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  const protectedPaths = ['/courses', '/quiz', '/vocabulary', '/viral-marketing'];
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && token !== 'admin-logged-in') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/courses/:path*', '/quiz/:path*', '/vocabulary/:path*', '/viral-marketing/:path*'],
};
