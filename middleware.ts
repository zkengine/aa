import { geolocation } from '@vercel/functions';
import { NextRequest, NextResponse } from 'next/server';

// List of blocked countries (ISO 3166-1 alpha-2 country codes)
// North Korea (KP), Iran (IR), Syria (SY), Cuba (CU), Crimea (UA-43), Luhansk (UA-09), Donetsk (UA-14)
const BLOCKED_COUNTRIES = [
  'KP',
  'IR',
  'SY',
  'CU',
  'UA-43',
  'UA-09',
  'UA-14',
  // 'UNKNOWN',
];

const publicRoutes = ['/', '/favicon.ico'];

export default async function middleware(req: NextRequest) {
  const { country } = geolocation(req);
  const countryCode = country || 'UNKNOWN';

  if (BLOCKED_COUNTRIES.includes(countryCode)) {
    console.log(`Country ${countryCode} is blocked`);
    return new Response('Orchid platform not available in your country', {
      status: 403,
    });
  }

  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some(route => path === route);
  const acceptHeader = req.headers.get('accept');
  if (isPublicRoute || (acceptHeader && acceptHeader.includes('text/x-component'))) {
    return NextResponse.next();
  }

  const headers = new Headers(req.headers);
  headers.set('x-current-path', path);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
