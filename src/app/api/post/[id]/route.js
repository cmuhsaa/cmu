// app/api/posts/[id]/route.js
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";

export async function PUT(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const data = await request.json();
    const title = data.title;
    const content = data.content;
    const youtubeLink = data.youtubeLink;
    const images = data.images;

    const exists = await Post.findById(id);
    if (!exists) {
      return NextResponse.json({ error: "Post not found" }, { status: 400 });
    }

    if (images.length > 0) {
      await Promise.all(
        exists.images.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title: title || exists.title,
        content: content || exists.content,
        youtubeLink: youtubeLink || exists.youtubeLink,
        images: images.length > 0 ? images : exists.images,
        updateDate: localTime(),
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Post updated", post: updatedPost },
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
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete images from Cloudinary
    if (post.images && post.images.length > 0) {
      await Promise.all(
        post.images.map(async (image) => {
          await cloudinary.uploader.destroy(image.public_id);
        })
      );
    }

    // Delete the post document
    const deletedPost = await Post.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Post and all associated images deleted successfully",
      deletedPost,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
