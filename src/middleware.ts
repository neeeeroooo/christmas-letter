import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { routing } from './i18n/routing';
import createMiddleware from 'next-intl/middleware';

// Helper function for token expiration check
const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp! * 1000 < Date.now(); // `exp` is in seconds
  } catch (error) {
    console.error('Invalid token:', error);
    return true; // Treat invalid token as expired
  }
};

// Create middleware for i18n
const i18nMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Run i18n middleware first
  const i18nResponse = i18nMiddleware(request);
  if (i18nResponse) {
    return i18nResponse; // If i18n middleware handles the response, return it
  }

  const pathname = new URL(request.url).pathname;
  const localeMatch = routing.locales.find((locale) =>
    pathname.startsWith(`/${locale}`),
  );
  const locale = localeMatch || routing.defaultLocale;

  // // Public route handling
  // if (pathname.startsWith('/dashboard/')) {
  //   // Allow access without token validation for public routes
  //   return NextResponse.next();
  // }

  // // JWT Authentication logic
  // const accessToken = (await cookies()).get('accessToken')?.value;
  // const refreshToken = (await cookies()).get('refreshToken')?.value;

  // if (accessToken) {
  //   // Check if the token is valid
  //   if (!isTokenExpired(accessToken)) {
  //     // Redirect from login page if already authenticated
  //     if (
  //       pathname === `/` ||
  //       pathname === `/${locale}` ||
  //       pathname === `/${locale}/login`
  //     ) {
  //       return NextResponse.redirect(new URL(`/${locale}/app`, request.url));
  //     }
  //     return NextResponse.next(); // Allow navigation
  //   }
  // }

  // if (!refreshToken || isTokenExpired(refreshToken)) {
  //   // Redirect to login if no valid tokens are present
  //   if (pathname !== `/${locale}/login`) {
  //     return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  //   }
  // }

  return NextResponse.next(); // Proceed to the next middleware or page
}

export const config = {
  matcher: [
    '/(th|en)/:path*', // Match i18n paths
    '/events/:path*',
    '/home/:path*',
    '/',
    '/login/:path*',
    '/editor/:path*',
    '/card/:path*',
    '/card-for-you/:path*',
    // '/login',
    // '/landing-page',
    // '/public/:path*',
  ],
};
