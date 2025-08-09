// app/api/notices/[id]/route.js
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import Notice from "@/models/noticeModel";
import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";

export async function PUT(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;

    const data = await request.json();
    const title = data.title;
    const description = data.description;
    const type = data.type;
    const dateTime = data.dateTime;
    const images = data.images;

    const exists = await Notice.findById(id);
    if (!exists) {
      return NextResponse.json({ error: "Notice not found" }, { status: 400 });
    }

    if (images.length > 0) {
      await Promise.all(
        exists.images.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
    }

    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      {
        title: title || exists.title,
        description: description || exists.description,
        type: type || exists.type,
        dateTime: dateTime || exists.dateTime,
        images: images.length > 0 ? images : exists.images,
        updateDate: localTime(),
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Notice updated", notice: updatedNotice },
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
    const notice = await Notice.findById(id);

    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ notice });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const notice = await Notice.findById(id);

    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if it exists
    // Delete images from Cloudinary
    if (notice.images && notice.images.length > 0) {
      await Promise.all(
        notice.images.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
    }

    // Delete the notice document
    const deletedNotice = await Notice.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Notice and associated image deleted successfully",
      deletedNotice,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
