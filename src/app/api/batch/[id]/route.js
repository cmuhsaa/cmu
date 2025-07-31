// app/api/batches/[id]/route.js
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";

import Batch from "@/models/batchModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  await connectDB();
  

  try {
    const { id } = await params;
    const { name } = await request.json();

    const updatedBatch = await Batch.findByIdAndUpdate(
      id,
      {
        name,
        updateDate: localTime(),
      },
      {
        new: true,
      }
    );

    if (!updatedBatch) {
      return NextResponse.json({ message: "Batch not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Batch updated", batch: updatedBatch },
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
    const batch = await Batch.findById(id);

    if (!batch) {
      return NextResponse.json({ message: "Batch not found" }, { status: 404 });
    }

    return NextResponse.json({ batch }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const deletedBatch = await Batch.findByIdAndDelete(id);

    if (!deletedBatch) {
      return NextResponse.json({ message: "Batch not found" }, { status: 404 });
    }

    return NextResponse.json({ deletedBatch }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}