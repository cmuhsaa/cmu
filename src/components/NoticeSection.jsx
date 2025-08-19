import Link from "next/link";

export default function NoticeSection({ notices }) {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Important Notices
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest announcements from Govt. Chanchaitara Madla United High School
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 mb-10">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-red-500"
            >
              <Link href={`/notice/${notice._id}`} className="block">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          notice.type === "important"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {notice.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {notice.createDate.date}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {notice.department && `For: ${notice.department}`}
                    </span>
                  </div>

                  <h3 className="line-clamp-1 text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                    {notice.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {notice.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {new Date(notice.dateTime).toLocaleDateString("en-GB")}
                    </div>

                    <span className="inline-flex items-center text-red-600 font-medium text-sm group-hover:underline">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/notice"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            View All Notices
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
