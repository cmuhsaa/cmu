import connectDB from "@/config/db";
import { localTime } from "@/config/localTime";
import { NextResponse } from "next/server";
import Event from "@/models/eventsModel";
import { AuthCheck } from "@/lib/auth";

export async function PUT(request, { params }) {
  await connectDB();
  await AuthCheck(request);

  try {
    const { id } = await params;
    const {
      title,
      titleBangla,
      description,
      eventDate,
      registrationStartDate,
      registrationEndDate,
      location,
    } = await request.json();

    const exists = await Event.findById(id);
    if (!exists) {
      return NextResponse.json({ error: "Event not found" }, { status: 400 });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title: title || exists.title,
        titleBangla: titleBangla || exists.titleBangla,
        description: description || exists.description,
        eventDate: eventDate || exists.eventDate,
        registrationStartDate:
          registrationStartDate || exists.registrationStartDate,
        registrationEndDate: registrationEndDate || exists.registrationEndDate,
        location: location || exists?.location,
        updateDate: localTime(),
      },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event updated", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// In the same file: app/api/events/[id]/route.js
export async function GET(request, { params }) {
  await connectDB();

  try {
    const { id } = await params;
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
