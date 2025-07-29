// app/api/admin/update-password/route.js
import { NextResponse } from "next/server";
import Admin from "@/models/adminModel";
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import jwt from "jsonwebtoken";

export async function PUT(request) {
  await connectDB();
  await AuthCheck(request);

  try {
    const token = request.cookies.get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { oldPassword, newPassword, confirmPassword } = await request.json();

    const admin = await Admin.findById(decoded.id).select("+password");
    if (!admin) {
      return NextResponse.json(
        { error: "Unable to update password. Admin does not exist." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New Password and Confirm New Password did not match." },
        { status: 402 }
      );
    }

    const isPasswordMatch = await admin.comparedPassword(oldPassword);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Incorrect old password." },
        { status: 401 }
      );
    }

    admin.password = newPassword;
    admin.updateDate = localTime(0);
    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
