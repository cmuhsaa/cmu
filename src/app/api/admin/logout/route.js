// app/api/admin/logout/route.js
import { AuthCheck } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await AuthCheck(request)
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully"
  });

  // Clear cookie
  response.cookies.set('access_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}