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
    const data = await request.json();
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const about = data.about;
    const title = data.title;
    const address = data.address;
    const avatar = data.image;

    if (!avatar) {
      return NextResponse.json({ error: "Image is required" }, { status: 500 });
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
