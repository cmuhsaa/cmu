import { getPaginatedNotices } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import MediaCarousel from "@/components/MediaCarousel";
import { Calendar, Clock, FileText, AlertCircle } from "lucide-react";

export default async function NoticePage({ params }) {
  let { page } = await params;
  page = parseInt(page) || 1;
  const limit = 10;

  const { notices, total } = await getPaginatedNotices({ page, limit });
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Notice</h1>
        </div>
      </div>

      {notices.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">
            No notices available at this time.
          </p>
        </div>
      ) : (
        <>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 px-3 xl:px-0">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
              >
                <Edit model="notice" id={notice._id.toString()} />
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            notice.type === "urgent"
                              ? "bg-red-100 text-red-800"
                              : notice.type === "general"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {notice.type}
                        </span>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5 text-gray-500" />
                          <span>
                            {new Date(notice.dateTime).toLocaleDateString(
                              "en-GB"
                            )}
                          </span>
                        </div>
                      </div>

                      <Link href={`/notice/${notice._id}`} className="group">
                        <h3 className="line-clamp-1 text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-3">
                          {notice.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 line-clamp-2 mb-2">
                        {notice.description}
                      </p>
                    </div>
                  </div>

                  {notice.images?.length > 0 && (
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-700 mb-3">
                        <FileText className="h-5 w-5" />
                        <h4 className="font-medium">Attachments</h4>
                      </div>
                      <MediaCarousel
                        images={notice.images.map((item) => ({
                          url: item.url,
                        }))}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
            <div className="text-sm text-gray-600">
              Showing {notices.length} of {total} notices
            </div>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/notice/page/${page - 1}`}
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
                      href={`/notice/page/${pageNum}`}
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
                  href={`/notice/page/${page + 1}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex items-center"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
