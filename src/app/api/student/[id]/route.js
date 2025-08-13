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
    const data = await request.json();
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const batch = data.batch;
    const about = data.about;
    const profession = data.profession;
    const address = data.address;
    const type = data.type;
    const avatar = data.image;

    const exists = await Student.findById(id);
    if (!exists) {
      return NextResponse.json({ error: "Student not found" }, { status: 400 });
    }

    if (
      email &&
      (await Student.exists({
        email,
        _id: { $ne: id },
      }))
    ) {
      return NextResponse.json({ error: "Email already in use" });
    }
    if (
      phone &&
      (await Student.exists({
        phone,
        _id: { $ne: id },
      }))
    ) {
      return NextResponse.json({ error: "Phone already in use" });
    }

    if (avatar?.public_id) {
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
        avatar: avatar?.url ? avatar : exists.avatar,
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
