// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import Admin from '@/models/adminModel';
import connectDB from '@/config/db';

export async function POST(request) {
  await connectDB();

  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter email and password" },
        { status: 401 }
      );
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordMatch = await admin.comparedPassword(password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = admin.getJWTToken();
    const response = NextResponse.json({
      success: true,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        avatar: admin.avatar,
      }
    });

    // Set cookie
    response.cookies.set('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}