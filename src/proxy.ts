import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { requireUser } from '@/middleware/auth';

// the exported function must be the default export when using proxy
export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // protect dashboard and its subpaths
    if (pathname.startsWith('/dashboard')) {
        try {
            requireUser(req);
            return NextResponse.next();
        } catch {
            const url = req.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
