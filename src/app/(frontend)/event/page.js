import { getPaginatedEvents } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export const dynamic = "force-static";

export default async function EventPage({ params }) {
  let { page } = await params;
  page = parseInt(page) || 1;
  const limit = 10;

  const { events, total } = await getPaginatedEvents({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container rounded-2xl overflow-hidden">
      <div
        className="relative h-80 bg-cover bg-center mb-6"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20university%20campus%20in%20Bangladesh%20with%20lush%20green%20hills%2C%20traditional%20academic%20buildings%2C%20students%20walking%20on%20pathways%2C%20serene%20natural%20environment%2C%20peaceful%20educational%20atmosphere%2C%20blue%20sky%20with%20white%20clouds%2C%20vibrant%20green%20landscapes%20surrounding%20the%20campus&width=800&height=320&seq=bg-hero-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/60"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
        </div>
      </div>

      <section>
        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">
              No upcoming events found. Check back later!
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Suggest an Event
            </button>
          </div>
        ) : (
          <div className="space-y-6 px-3 lg:px-0">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
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
                          {event.title}
                          {event.titleBangla && (
                            <span className="ml-3 text-lg font-normal text-gray-600 mt-1">
                              ({event.titleBangla})
                            </span>
                          )}
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

                      <Edit model="event" id={event._id.toString()} />
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
