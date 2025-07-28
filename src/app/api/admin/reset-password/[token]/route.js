// app/api/admin/reset-password/[token]/route.js
import { NextResponse } from 'next/server';
import Admin from '@/models/adminModel';
import jwt from 'jsonwebtoken';
import connectDB from '@/config/db';
import { localTime } from '@/config/localTime';

export async function POST(request, { params }) {
  await connectDB();

  try {
    const { token } = await params;
    const { newPassword, confirmPassword } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: "Token not found." },
        { status: 404 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirm password did not match." },
        { status: 402 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_PASSWORD_KEY);
      
      if (!decoded) {
        return NextResponse.json(
          { error: "Unable to verify admin. Token has expired or is invalid." },
          { status: 401 }
        );
      }

      const admin = await Admin.findOne({ email: decoded.email });
      if (!admin) {
        return NextResponse.json(
          { error: "Unable to reset password. Admin does not exist." },
          { status: 400 }
        );
      }

      admin.password = newPassword;
      admin.updateDate = localTime(0);
      await admin.save();

      return NextResponse.json({
        success: true,
        message: "Password has been reset successfully",
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return NextResponse.json(
          { error: "Token has expired." },
          { status: 401 }
        );
      } else if (error.name === "JsonWebTokenError") {
        return NextResponse.json(
          { error: "Invalid token." },
          { status: 401 }
        );
      }
      throw error;
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}