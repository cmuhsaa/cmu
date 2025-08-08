import jwt from "jsonwebtoken";
import connectDB from "@/config/db";
import adminModel from "@/models/adminModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const { value: token } = cookieStore.get("access_token");
    if (!token) {
      return NextResponse.json({ success: false }, { status: 500 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();
    const admin = await adminModel.findById(decoded.id).select("-password");

    if (!admin) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 405 });
  }
}
