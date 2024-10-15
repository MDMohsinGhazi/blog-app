import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ secret: process.env.NEXTAUTH_SECRET, req: request });
    const url = request.nextUrl;

    if (token && url.pathname.startsWith('/auth/:path*')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (url.pathname === '/auth') {
        return NextResponse.redirect(new URL('/auth/log-in', request.url));
    }

    if (!token && url.pathname.startsWith('/write')) {
        return NextResponse.redirect(new URL('/auth/log-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/:path*', '/write'],
};
