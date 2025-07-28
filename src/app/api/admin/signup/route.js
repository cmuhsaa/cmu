// app/api/admin/verify/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/config/db';
import Admin from '@/models/adminModel';
import { localTime } from '@/config/localTime';
import Otp from '@/models/otpModel';

export async function POST(request) {
  await connectDB();

  try {
    const { email } = await request.json();

    const admin = await Admin.findOne({ email });
    if (admin) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 400 }
      );
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const createDate = localTime();
    const expireDate = localTime(10);

    const otpExists = await Otp.findOne({ email });
    if (otpExists) {
      await Otp.deleteOne({ email });
    }

    const otp = await Otp.create({
      email,
      otp: verificationCode,
      role: "admin",
      createDate,
      expireDate,
    });

    const emailData = {
      email,
      subject: "Verify Your Email - Library Management System",
      html: `
        <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 10px; box-sizing: border-box; font-family: Arial, sans-serif;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h1 style="text-align: center; color: #d9534f; margin-bottom: 5px;">Library Management System</h1>
            <h2 style="text-align: center; color: #5cb85c;">Hello There,</h2>
            <p style="text-align: center; font-size: 18px; color: #333;">Use the following verification code to verify your email:</p>
            
            <div style="text-align: center; margin: 10px 0;">
              <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #0275d8; background: #e9ecef; padding: 10px 20px; border-radius: 5px; letter-spacing: 2px;">
                ${verificationCode}
              </span>
            </div>

            <p style="text-align: center; font-size: 16px; color: #555;">
              This code will expire in <strong style="color: #d9534f;">${expireDate.expireTime}</strong>.
            </p>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
            <p style="text-align: center; font-size: 14px; color: #777;">
              If you did not request this verification, you can ignore this email.
            </p>
          </div>
        </div>
      `,
    };

    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to send verification email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `A verification code has been sent to ${email}.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}