// app/api/admin/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
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