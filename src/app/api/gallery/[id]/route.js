// app/api/gallery/[id]/route.js
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";

import Gallery from "@/models/galleryModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const data = await request.json(); // parse JSON body

    const title = data.title;
    const youtubeLink = data.youtubeLink;
    const images = data.images;

    const exists = await Gallery.findById(id);
    if (!exists) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 400 });
    }

    if (images.length > 0) {
      await Promise.all(
        exists.images.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      {
        title: title || exists.title,
        images: images.length > 0 ? images : exists.images,
        youtubeLink: youtubeLink || exists.youtubeLink,
        updateDate: localTime(),
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Gallery updated", gallery: updatedGallery },
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
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    return NextResponse.json({ gallery });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    // Delete images from Cloudinary
    if (gallery.images && gallery.images.length > 0) {
      await Promise.all(
        gallery.images.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
    }

    // Delete the gallery document
    const deletedGallery = await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Gallery and images deleted successfully",
      deletedGallery,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
