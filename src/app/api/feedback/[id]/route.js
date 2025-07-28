// app/api/feedback/[id]/route.js
import connectDB from "@/config/db";
import feedbackModel from "@/models/feedbackModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const feedback = await feedbackModel.findById(id).populate("batch", "name");

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ feedback });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
