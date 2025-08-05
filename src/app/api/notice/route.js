// app/api/notices/route.js
import { getPaginatedNotices } from "@/lib/getDatas";
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import Notice from "@/models/noticeModel";
import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";

export async function POST(request) {
  await connectDB();

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const type = formData.get("type");
    const dateTime = formData.get("dateTime");
    const files = formData.getAll("images");

    const images = [];
    for (const file of files) {
      if (file.size > 0) {
        if (file.size > 4.2 * 1024 * 1024) {
          return NextResponse.json(
            { error: "Image shold be less than 4.2 MB" },
            { status: 500 }
          );
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "notice" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(Buffer.from(buffer));
        });
        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    const newNotice = new Notice({
      title,
      description,
      type,
      dateTime,
      images,
      updateDate: localTime(),
      createDate: localTime(),
    });

    await newNotice.save();

    return NextResponse.json(
      { message: "Notice created", notice: newNotice },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const result = await getPaginatedNotices({ page, limit });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
