// app/api/students/route.js
import { NextResponse } from "next/server";
import Student from "@/models/studentModel";
import { localTime } from "@/config/localTime";
import connectDB from "@/config/db";
import { getPaginatedStudents } from "@/lib/getDatas";
import cloudinary from "@/config/cloudinary";

export async function POST(request) {
  await connectDB();

  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const batch = formData.get("batch");
    const about = formData.get("about");
    const profession = formData.get("profession");
    const address = formData.get("address");
    const type = formData.get("type");
    const isActive = formData.get("isActive");
    const avatarFile = formData.get("image");

    if (!avatarFile) {
      NextResponse.json({ error: "Image is required" }, { status: 500 });
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

    const newStudent = new Student({
      name,
      email,
      phone,
      batch,
      about,
      profession,
      address,
      type,
      avatar,
      isActive,
      createDate: localTime(),
      updateDate: localTime(),
    });

    await newStudent.save();

    return NextResponse.json(
      { message: "Student created successfully", student: newStudent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      batch: searchParams.get("batch"),
      type: searchParams.get("type"),
      search: searchParams.get("search"),
      sortBy: searchParams.get("sortBy"),
      sortOrder: searchParams.get("sortOrder"),
      isActive: searchParams.get("isActive"),
      page: parseInt(searchParams.get("page")) || 1,
      limit: parseInt(searchParams.get("limit")) || 10,
    };

    const result = await getPaginatedStudents(query);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
