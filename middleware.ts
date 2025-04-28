import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/login', '/signup'];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    if (isPublicPath) {
      return NextResponse.next();
    }

    // If trying to access a protected route and not authenticated
    if (!req.nextauth.token) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    // If authenticated, allow
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const publicPaths = ['/', '/login', '/signup'];
        const { pathname } = req.nextUrl;

        if (publicPaths.includes(pathname)) {
          return true; // Allow public pages
        }

        return !!token; // Otherwise, require token
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Match all except /api, /_next, and static files
};
