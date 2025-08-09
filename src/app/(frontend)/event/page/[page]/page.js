import { getPaginatedEvents } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import { MapPin } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "CMUHSAA Events",
  };
}

export default async function EventPage({ params }) {
  let { page } = await params;
  page = parseInt(page) || 1;
  const limit = 10;

  const { events, total } = await getPaginatedEvents({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="rounded-2xl overflow-hidden">
      <div
        className="relative h-80 bg-cover bg-center mb-6"
        style={{
          backgroundImage: `url('/cover2.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-green-900/10"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Events</h1>
        </div>
      </div>

      {/* All Events */}
      <section>
        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">
              No upcoming events found. Check back later!
            </p>
          </div>
        ) : (
          <div className="space-y-6 px-3 xl:px-0">
            {events.map((event) => (
              <div
                key={event._id}
                className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <Edit model="event" id={event._id.toString()} />
                <div className="md:flex">
                  <div className="md:w-1/4 bg-gray-100 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {event.eventDate}
                      </div>
                      <div className="text-sm font-semibold text-gray-600">
                        {event.registrationStartDate} -{" "}
                        {event.registrationEndDate}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Reg Start - Reg End
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          <Link href={`/event/${event._id.toString()}`}>
                            {event.title}
                            {event.titleBangla && (
                              <span className="ml-3 text-lg font-normal text-gray-600 mt-1">
                                ({event.titleBangla})
                              </span>
                            )}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-gray-700">
                              {event?.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-gray-700 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          Alumni Event
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
              <div className="text-sm text-gray-600">
                Showing {events.length} of {total} events
              </div>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`/event/page/${page - 1}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex items-center"
                  >
                    Previous
                  </Link>
                )}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    page <= 3
                      ? i + 1
                      : page >= totalPages - 2
                        ? totalPages - 4 + i
                        : page - 2 + i;
                  return (
                    pageNum <= totalPages && (
                      <Link
                        key={pageNum}
                        href={`/event/page/${pageNum}`}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          page === pageNum
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    )
                  );
                })}
                {page < totalPages && (
                  <Link
                    href={`/event/page/${page + 1}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex items-center"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
