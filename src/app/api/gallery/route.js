// app/api/gallery/route.js
import { getPaginatedGalleries } from "@/lib/getDatas";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import Gallery from "@/models/galleryModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const youtubeLink = formData.get("youtubeLink");
    const files = formData.getAll("images");

    const images = [];
    for (const file of files) {
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "gallery" }, (error, result) => {
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

    const newGallery = new Gallery({
      title,
      images,
      youtubeLink,
      createDate: localTime(),
      updateDate: localTime(),
    });

    await newGallery.save();

    return NextResponse.json(
      { message: "Gallery created", gallery: newGallery },
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

    const result = await getPaginatedGalleries({ page, limit });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
