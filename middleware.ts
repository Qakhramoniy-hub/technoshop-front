import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Since we're using localStorage (client-side only), 
  // authentication checks must be done client-side
  // The middleware will only handle basic routing
  
  const pathname = request.nextUrl.pathname;

  // For admin routes, we need to let the page handle authentication
  // via client-side localStorage checks
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
