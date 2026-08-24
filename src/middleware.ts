import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    console.log('Login request comes');
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    const isLoginPage = request.nextUrl.pathname === '/login';
    const isDashboardPage = request.nextUrl.pathname === '/dashboard';

    if ((token && isLoginPage) || (!token && isDashboardPage)) {
        const redirectUrl = token ? '/dashboard' : '/login';
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/dashboard','/']
}
