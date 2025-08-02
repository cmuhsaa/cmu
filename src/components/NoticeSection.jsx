import Link from "next/link";
import MediaCarousel from "./MediaCarousel";

export default function NoticeSection({ notices }) {
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Important Notices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest announcements and important information
            from Chanchaitara Madla United High School
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {notices.map((notice, index) => (
            <div
              key={notice._id}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        notice.type === "important"
                          ? "bg-red-500 animate-pulse"
                          : "bg-orange-500"
                      }`}
                    ></div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        notice.type === "important"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {notice.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{notice.dateTime}</div>
                </div>

                <div className="flex-grow">
                  <MediaCarousel
                    images={notice.images.map((item) => ({ url: item.url }))}
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {notice.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {notice.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    Publish Date:
                  </div>
                  <div className="text-sm text-gray-500">
                    {notice.createDate.formatedTime} • {notice.createDate.date}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/notice/${notice._id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Read Full Notice
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
                  </Link>

                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-300 cursor-pointer">
                      <i className="ri-bookmark-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                    <button className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors duration-300 cursor-pointer">
                      <i className="ri-share-line w-5 h-5 flex items-center justify-center"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/notice"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            View All Notices
            <i className="ri-notification-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
