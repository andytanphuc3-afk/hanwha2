import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  if (username === 'admin' && password === 'admin123') {
    const response = NextResponse.json({ success: true });
    // Set cookie without HttpOnly so that client can detect if user is logged in
    response.cookies.set('auth_token', 'admin-logged-in', {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return response;
  }
  
  return NextResponse.json({ success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' }, { status: 401 });
}
