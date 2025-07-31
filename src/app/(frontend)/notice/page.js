import { getPaginatedNotices } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import MediaCarousel from "@/components/MediaCarousel";

export const dynamic = "force-static"; // Optional: forces static + ISR


export default async function NoticePage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;

  const { notices, total } = await getPaginatedNotices({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Notice List
      </h2>

      {notices.length === 0 ? (
        <p className="text-gray-600 text-center">No notice data found.</p>
      ) : (
        <>
          <div className="space-y-8">
            {notices.map((notice) => (
              <div
                key={notice._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <Link href={`/notice/${notice._id}`} className="group">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                        {notice.title}
                      </h3>
                    </Link>
                    <Edit model="notice" id={notice._id.toString()} />
                  </div>

                  <div className="mt-4 space-y-3 text-gray-600">
                    <p>
                      <strong className="text-gray-700">Description:</strong>{" "}
                      {notice.description}
                    </p>
                    <p>
                      <strong className="text-gray-700">Type:</strong>{" "}
                      {notice.type}
                    </p>
                    <p>
                      <strong className="text-gray-700">Date & Time:</strong>{" "}
                      {notice.dateTime}
                    </p>
                    <p>
                      <strong className="text-gray-700">Created:</strong>{" "}
                      {notice.createDate?.date} at{" "}
                      {notice.createDate?.formatedTime}
                    </p>
                    <p>
                      <strong className="text-gray-700">Updated:</strong>{" "}
                      {notice.updateDate?.date} at{" "}
                      {notice.updateDate?.formatedTime}
                    </p>
                  </div>

                  {/* Media Carousel for Images */}
                  {notice.images?.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-medium text-gray-700 mb-3">
                        Images
                      </h4>
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
          <div className="flex justify-center items-center mt-10 gap-4">
            {page > 1 && (
              <Link href={`?page=${page - 1}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Previous
                </button>
              </Link>
            )}
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`?page=${page + 1}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Next
                </button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
