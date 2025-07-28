// app/api/posts/route.js
import { getPaginatedPosts } from '@/lib/getDatas';
import connectDB from '@/config/db';
import { localTime } from '@/config/localTime';
import Post from '@/models/postModel';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectDB();

  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const youtubeLink = formData.get('youtubeLink');
    const files = formData.getAll('images');

    const images = [];
    for (const file of files) {
      if (file.size > 0) {
        const buffer = await file.arrayBuffer();
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "post" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(Buffer.from(buffer));
        });
        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    const newPost = new Post({
      title,
      content,
      youtubeLink,
      images,
      createDate: localTime(),
      updateDate: localTime(),
    });

    await newPost.save();

    return NextResponse.json(
      { message: "Post created", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const result = await getPaginatedPosts({ page, limit });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}