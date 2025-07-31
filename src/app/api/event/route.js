// app/api/events/route.js
import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import { NextResponse } from "next/server";
import Event from "@/models/eventsModel";
import { getPaginatedEvents } from "@/lib/getDatas";


export async function POST(request) {
  await connectDB();
  

  try {
    const {
      title,
      titleBangla,
      description,
      eventDate,
      registrationStartDate,
      registrationEndDate,
      location,
    } = await request.json();

    const newEvent = new Event({
      title,
      titleBangla,
      description,
      eventDate,
      registrationStartDate,
      registrationEndDate,
      location,
      createDate: localTime(),
      updateDate: localTime(),
    });

    await newEvent.save();

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;

    const result = await getPaginatedEvents({ page, limit });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
