// app/api/students/[id]/route.js
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";

import Student from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const batch = formData.get("batch");
    const about = formData.get("about");
    const profession = formData.get("profession");
    const address = formData.get("address");
    const type = formData.get("type");
    const avatarFile = formData.get("image");

    const exists = await Student.findById(id);
    if (!exists) {
      return NextResponse.json({ error: "Student not found" }, { status: 400 });
    }

    if (!avatarFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 500 });
    }

    let avatar = {};
    if (avatarFile && avatarFile.size > 0) {
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "student" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(Buffer.from(buffer));
      });
      avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    if (avatar.public_id) {
      await cloudinary.uploader.destroy(exists.avatar.public_id);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name: name || exists.name,
        email: email || exists.email,
        phone: phone || exists.phone,
        batch: batch || exists.batch,
        about: about || exists.about,
        profession: profession || exists.profession,
        address: address || exists.address,
        type: type || exists.type,
        avatar: Object.keys(avatar).length ? avatar : exists.avatar,
        isActive: true,
        updateDate: localTime(),
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Student updated", student: updatedStudent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const student = await Student.findById(id).populate("batch", "name");

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ student });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const student = await Student.findById(id);

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Delete avatar from Cloudinary if exists
    if (student.avatar?.public_id) {
      await cloudinary.uploader.destroy(student.avatar.public_id);
    }

    // Delete the student document
    const deletedStudent = await Student.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Student and avatar deleted successfully",
      deletedStudent,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
