// app/api/admin/manage/[id]/route.js
import { NextResponse } from 'next/server';
import Admin from '@/models/adminModel';
import connectDB from '@/config/db';

export async function PUT(request, { params }) {
  await connectDB();

  try {
    const { id } = params;
    const admin = await Admin.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Admin approved successfully"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}