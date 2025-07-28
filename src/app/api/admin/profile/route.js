// app/api/admin/profile/route.js
import { NextResponse } from 'next/server';
import Admin from '@/models/adminModel';
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
    const admin = await Admin.findById(decoded.id).select("-password");
    
    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      admin,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}