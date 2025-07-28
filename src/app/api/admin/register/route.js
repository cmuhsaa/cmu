// app/api/admin/register/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Admin from '@/models/adminModel';
import { localTime } from '@/config/localTime';
import Otp from '@/models/otpModel';
import cloudinaryfrom '@/config/cloudinary';

export async function POST(request) {
  await connectDB();

  try {
    const formData = await request.formData();
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const verificationCode = formData.get('verificationCode');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const nId = formData.get('nId');
    const avatarFile = formData.get('avatar');

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password and Confirm Password did not match." },
        { status: 400 }
      );
    }

    if (!verificationCode) {
      return NextResponse.json(
        { error: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    const otp = await Otp.findOne({ email, otp: verificationCode });
    if (!otp) {
      return NextResponse.json(
        { error: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    const createDate = localTime(0);
    const updateDate = localTime(0);

    const givenTime = new Date(`${otp.expireDate.date} ${otp.expireDate.expireTime}`);
    const currentTime = new Date(`${createDate.date} ${createDate.time}`);

    if (currentTime > givenTime) {
      await Otp.deleteOne({ email, otp: verificationCode, role: "admin" });
      return NextResponse.json(
        { error: "OTP has expired." },
        { status: 400 }
      );
    }

    let avatar = {
      public_id: "",
      url: "",
    };
    
    if (avatarFile && avatarFile.size > 0) {
      const buffer = await avatarFile.arrayBuffer();
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "admins" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(Buffer.from(buffer));
      });
      avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const admin = await Admin.create({
      name,
      email,
      phone,
      nId,
      password,
      avatar,
      createDate,
      updateDate,
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Unable to create admin" },
        { status: 401 }
      );
    }

    await Otp.deleteOne({ email, otp: verificationCode });

    const emailData = {
      email,
      subject: "Welcome to Library Management System - Account Created Successfully",
      html: `
        <div style="background-color: #f4f4f4; width: 100%; min-width: 350px; padding: 10px; box-sizing: border-box; font-family: Arial, sans-serif;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 10px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            <h1 style="text-align: center; color: #d9534f; margin-bottom: 10px;">Library Management System</h1>
            <h2 style="text-align: center; color: #5cb85c;">Account Created Successfully!</h2>
            
            <p style="text-align: center; font-size: 18px; color: #333;">
              Congratulations, <strong>${admin.name}</strong>! 🎉 Your account has been successfully created.
            </p>

            <div style="text-align: center; margin: 10px 0;">
              <p style="font-size: 16px; color: #555;">You can now log in and start managing your library resources.</p>
              <a href="${process.env.CLIENT_URL}/login" 
                 style="display: inline-block; background-color: #0275d8; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; padding: 10px 20px; border-radius: 5px;">
                Login Now
              </a>
            </div>

            <p style="text-align: center; font-size: 16px; color: #555;">
              If you did not create this account, please contact our support team immediately.
            </p>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
            <p style="text-align: center; font-size: 14px; color: #777;">
              Thank you for joining us! 📚<br> Library Management System Team
            </p>
          </div>
        </div>
      `,
    };

    try {
      await sendEmailWithNode(emailData);
    } catch (error) {
      console.error("Email sending error:", error);
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}