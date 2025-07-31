import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";

import { getAllBatch } from "@/lib/getDatas";
import Batch from "@/models/batchModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  

  try {
    const { name } = await request.json();

    const newBatch = new Batch({
      name,
      createDate: localTime(),
      updateDate: localTime(),
    });

    await newBatch.save();

    return NextResponse.json(
      { message: "Batch created successfully", batch: newBatch },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const batches = await getAllBatch();
    return NextResponse.json({ batches });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
