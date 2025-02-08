import { NextResponse, type NextRequest } from 'next/server';
import Session from './app/_lib/classes/Session';

export default async function middleware(request: NextRequest) {
  const session = await Session.get();

  if (session == undefined) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|login|signup|images|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}   