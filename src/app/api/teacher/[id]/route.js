// app/api/teachers/[id]/route.js
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import Teacher from "@/models/teacherModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const title = formData.get("title");
    const about = formData.get("about");
    const address = formData.get("address");
    const avatarFile = formData.get("avatar");

    const exists = await Teacher.findById(id);
    if (!exists) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 400 });
    }

    let avatar = {};
    if (avatarFile && avatarFile.size > 0) {
      const buffer = await avatarFile.arrayBuffer();
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "teacher" }, (error, result) => {
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

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      {
        name: name || exists.name,
        email: email || exists.email,
        phone: phone || exists.phone,
        title: title || exists.title,
        about: about || exists.about,
        address: address || exists.address,
        avatar: Object.keys(avatar).length ? avatar : exists.avatar,
        updateDate: localTime(),
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Teacher updated", teacher: updatedTeacher },
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
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json({ teacher });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
