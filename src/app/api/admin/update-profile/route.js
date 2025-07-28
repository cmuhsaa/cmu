// app/api/admin/update-profile/route.js
import { NextResponse } from 'next/server';
import Admin from '@/models/adminModel';
import connectDB from '@/config/db';
import { localTime } from '@/config/localTime';
import cloudinary from '@/config/cloudinary';

export async function PUT(request) {
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
    const formData = await request.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const nId = formData.get('nId');
    const avatarFile = formData.get('avatar');

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return NextResponse.json(
        { error: "Unable to update Profile. Admin does not exist." },
        { status: 400 }
      );
    }

    const updatedData = {
      name: name || admin.name,
      phone: phone || admin.phone,
      nId: nId || admin.nId,
      updateDate: localTime(0),
    };

    // Upload new avatar if exists
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
      
      updatedData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      
      // Delete old avatar if exists
      if (admin.avatar?.public_id) {
        await cloudinary.uploader.destroy(admin.avatar.public_id);
      }
    }

    await Admin.findByIdAndUpdate(
      decoded.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json({ 
      success: true,
      message: "Profile updated successfully"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}