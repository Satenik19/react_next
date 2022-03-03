import { NextResponse } from 'next/server';
// import useAuth from '../../services/useAuth';

export function middleware(request) {
    // let isAuthenticated = null;
    // if (typeof window !== 'undefined') {
    //     isAuthenticated = localStorage.getItem('access_token');
    // }
    // const isAuthenticated = useAuth();
    const { pathname } = request.nextUrl;
    if (pathname.includes('/login') && request.headers.Authorization) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LOCAL}/home`);
    }
}
