import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// the exported function must be the default export when using proxy
export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // protect dashboard and its subpaths
    if (pathname.startsWith('/dashboard')) {
        const cookie = req.headers.get('cookie') || '';
        const res = await fetch(`${req.nextUrl.origin}/api/auth/me`, {
            headers: { cookie },
        });
        if (res.ok) {
            return NextResponse.next();
        } else {
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
