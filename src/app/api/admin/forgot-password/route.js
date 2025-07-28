// app/api/admin/forgot-password/route.js
import { NextResponse } from 'next/server';
import Admin from '@/models/adminModel';
import { sendEmailWithNode } from '@/config/nodemailer';
import connectDB from '@/config/db';
import { localTime } from '@/config/localTime';

export async function POST(request) {
  await connectDB();

  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: "Admin not found." },
        { status: 404 }
      );
    }

    const token = createJsonWebToken(
      { email: email },
      process.env.JWT_PASSWORD_KEY,
      10 * 60 * 1000 // 10 minutes
    );

    const time = localTime(10);

    const emailData = {
      email,
      subject: "Reset Password",
      html: `
        <div style="background-color: rgba(175, 175, 175, 0.455); width: 100%; min-width: 350px; padding: 1rem; box-sizing: border-box;">
          <p style="font-size: 25px; font-weight: 500; text-align: center; color: tomato;">Library Management System</p>
          <h2 style="font-size: 30px; font-weight: 700; text-align: center; color: green;">Hello ${admin.name}</h2>
          <p style="margin: 0 auto; font-size: 22px; font-weight: 500; text-align: center; color: black;">
            This is a confirmation Email for reset password. We received a request from your email address to reset your password.
            <br /> If you did not make this request, please ignore this email.
          </p>
          <p style="text-align: center;">
            <a style="margin: 0 auto; text-align: center; background-color: #34eb34; font-size: 25px; box-shadow: 0 0 5px black; color: black; font-weight: 700; padding: 5px 10px; text-decoration: none;" href="${process.env.CLIENT_URL}/reset-password/${token}" target="_blank">Click Here</a>
          </p>
          <p style="text-align: center; font-size: 18px; color: black;">to reset your password.</p>
          <p style="text-align: center;">
            <b style="color: red; font-size: 20px;">This email will expire in <span style="color: black;">${time.expireTime}</span>, please reset your password before that time.</b>
          </p>
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
      message: `An email has been sent to ${admin.email}. Please check your inbox to reset your password.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}