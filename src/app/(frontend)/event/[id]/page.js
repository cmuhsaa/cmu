import Edit from "@/components/Edit";
import { getEventById } from "@/lib/getData";
import { getPaginatedEvents } from "@/lib/getDatas";
import { notFound } from "next/navigation";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }
  return {
    title: "Event | " + event.title,
    description: event.description,
  };
}

const Page = async ({ params }) => {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  // Format dates for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative p-3 xl:p-0 max-w-6xl mx-auto">
      <Edit model="event" id={id} />
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with title */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {event.title} ({event.titleBangla})
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <FaClock className="text-indigo-200" />
              <span>
                Created: {event.createDate?.date} at{" "}
                {event.createDate?.formatedTime}
              </span>
            </div>
            {event.updateDate && (
              <div className="flex items-center gap-1">
                <FaClock className="text-indigo-200" />
                <span>
                  Updated: {event.updateDate?.date} at{" "}
                  {event.updateDate?.formatedTime}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Event details */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-indigo-600" />
                Description
              </h3>
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          {/* Event metadata */}
          <div className="bg-gray-50 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Event Details
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaCalendarAlt className="text-indigo-600" />
                  <span className="font-medium">Event Date</span>
                </div>
                <p className="text-gray-800">{formatDate(event.eventDate)}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaCalendarAlt className="text-indigo-600" />
                  <span className="font-medium">Registration Period</span>
                </div>
                <p className="text-gray-800">
                  {formatDate(event.registrationStartDate)} to{" "}
                  {formatDate(event.registrationEndDate)}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaMapMarkerAlt className="text-indigo-600" />
                  <span className="font-medium">Location</span>
                </div>
                <p className="text-gray-800">{event.location}</p>
              </div>
            </div>

            {/* Registration status */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaCalendarAlt className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Registration Status
                  </h4>
                  <p className="text-sm text-gray-600">
                    {new Date() > new Date(event.registrationEndDate)
                      ? "Registration closed"
                      : new Date() < new Date(event.registrationStartDate)
                        ? `Registration opens on ${formatDate(event.registrationStartDate)}`
                        : "Registration open now"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const events = await getPaginatedEvents({ page: 1, limit: Infinity });
  return events.events.map((event) => ({
    id: event._id.toString(),
  }));
}
