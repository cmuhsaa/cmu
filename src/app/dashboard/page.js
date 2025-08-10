import {
  getPaginatedEvents,
  getPaginatedGalleries,
  getPaginatedNotices,
  getPaginatedPosts,
  getPaginatedStudents,
} from "@/lib/getDatas";
import Link from "next/link";

const Page = async () => {
  const [
    { total: totalEvents },
    { total: totalGalleries },
    { total: totalNotices },
    { total: totalPosts },
    { total: totalStudents },
  ] = await Promise.all([
    getPaginatedEvents({ page: 1, limit: 2 }),
    getPaginatedGalleries({ page: 1, limit: 2 }),
    getPaginatedNotices({ page: 1, limit: 7 }),
    getPaginatedPosts({ page: 1, limit: 2 }),
    getPaginatedStudents({ page: 1, limit: 2, isActive: true }),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Events Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-500">Events</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">
                  {totalEvents}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <Link
              href="/event"
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View all
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Galleries Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-500">Galleries</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">
                  {totalGalleries}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <PhotoIcon className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <Link
              href="/gallery"
              className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-800 font-medium"
            >
              View all
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Notices Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-500">Notices</h3>
                <p className="text-3xl font-bold text-emerald-600 mt-2">
                  {totalNotices}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <BellIcon className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <Link
              href="/notice"
              className="mt-4 inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
            >
              View all
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Posts Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-500">Posts</h3>
                <p className="text-3xl font-bold text-rose-600 mt-2">
                  {totalPosts}
                </p>
              </div>
              <div className="bg-rose-100 p-3 rounded-full">
                <NewspaperIcon className="h-6 w-6 text-rose-600" />
              </div>
            </div>
            <Link
              href="/post"
              className="mt-4 inline-flex items-center text-rose-600 hover:text-rose-800 font-medium"
            >
              View all
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Students Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-500">Students</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {totalStudents}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Link
              href="/student"
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View all
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons (you can replace these with your actual icon components)
const CalendarIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const PhotoIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const BellIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const NewspaperIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
);

const AcademicCapIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
    />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

export default Page;
