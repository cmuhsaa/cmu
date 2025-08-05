// app/api/teachers/route.js
import { NextResponse } from "next/server";
import Teacher from "@/models/teacherModel";
import { localTime } from "@/config/localTime";
import connectDB from "@/config/db";
import cloudinary from "@/config/cloudinary";

import { getPaginatedTeachers } from "@/lib/getDatas";

export async function POST(request) {
  await connectDB();

  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const about = formData.get("about");
    const title = formData.get("title");
    const address = formData.get("address");
    const avatarFile = formData.get("image");

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

    const newTeacher = new Teacher({
      name,
      email,
      phone,
      about,
      title,
      address,
      avatar,
      createDate: localTime(),
      updateDate: localTime(),
    });

    await newTeacher.save();

    return NextResponse.json(
      { message: "Teacher created successfully", teacher: newTeacher },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createDate";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const data = await getPaginatedTeachers({
      search,
      sortBy,
      sortOrder,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
