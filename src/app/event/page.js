import { getPaginatedEvents } from "@/lib/getDatas"; // তুমি আগেই এটা বানিয়েছো
import Edit from "@/components/Edit";
import Link from "next/link";

export default async function EventPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;

  const { events, total } = await getPaginatedEvents({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Event List</h2>
      {events.length === 0 ? (
        <p>No event data found.</p>
      ) : (
        <>
          {events.map((event) => (
            <div key={event._id}>
              <Edit model="event" id={event._id.toString()} />

              <hr style={{ margin: "25px 0" }} />
              <h3>
                {event.title} ({event.titleBangla})
              </h3>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Event Date:</strong> {event.eventDate}
              </p>
              <p>
                <strong>Registration:</strong> {event.registrationStartDate} to{" "}
                {event.registrationEndDate}
              </p>
              <p>
                <strong>Created At:</strong> {event.createDate?.date}{" "}
                {event.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated At:</strong> {event.updateDate?.date}{" "}
                {event.updateDate?.formatedTime}
              </p>
            </div>
          ))}

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {page > 1 && (
              <Link href={`?page=${page - 1}`}>
                <button>Previous</button>
              </Link>
            )}
            <span>
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`?page=${page + 1}`}>
                <button>Next</button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
