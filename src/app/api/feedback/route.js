// app/api/feedback/route.js
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import { AuthCheck } from "@/lib/auth";
import FeedBack from "@/models/feedbackModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  try {
    const { name, email, phone, batch, message } = await request.json();

    const newFeedback = new FeedBack({
      name,
      email,
      phone,
      batch,
      message,
      createDate: localTime(),
      updateDate: localTime(),
    });

    await newFeedback.save();

    return NextResponse.json(
      { message: "Feedback submitted", feedback: newFeedback },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  await connectDB();
  await AuthCheck(request);

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const feedbacks = await FeedBack.find()
      .populate("batch", "name")
      .sort({ createDate: -1 })
      .skip(skip)
      .limit(limit);

    const totalFeedback = await FeedBack.countDocuments();

    return NextResponse.json({
      feedbacks,
      count: feedbacks.length,
      total: totalFeedback,
      page,
      limit,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
