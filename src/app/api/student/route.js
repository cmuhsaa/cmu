// app/api/students/route.js
import { NextResponse } from "next/server";
import Student from "@/models/studentModel";
import { localTime } from "@/config/localTime";
import connectDB from "@/config/db";
import { getPaginatedStudents } from "@/lib/getDatas";

export async function POST(request) {
  await connectDB();

  try {
    const data = await request.json();
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const batch = data.batch;
    const about = data.about;
    const profession = data.profession;
    const address = data.address;
    const type = data.type;
    const isActive = data.isActive;
    const image = data.image;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 500 });
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
      avatar: image,
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
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Phone already exists" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
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
