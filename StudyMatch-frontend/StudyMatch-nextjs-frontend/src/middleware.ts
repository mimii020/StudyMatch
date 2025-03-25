import { url } from "inspector";
import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');

    if (!token || !request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}