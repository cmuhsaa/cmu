// app/api/admin/auth/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/config/db';

export async function GET(request) {
  await connectDB();

  try {
    const token = request.cookies.get('access_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return NextResponse.json({
      success: true,
      admin: decoded
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }
}