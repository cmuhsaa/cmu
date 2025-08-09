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
    const data = await request.json(); // parse JSON body

    const title = data.title;
    const youtubeLink = data.youtubeLink;
    const images = data.images;

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
