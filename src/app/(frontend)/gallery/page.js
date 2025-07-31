import { getPaginatedGalleries } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import MediaCarousel from "@/components/MediaCarousel";

export const dynamic = "force-static"; // Optional: forces static + ISR

export default async function GalleryPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;

  const { galleries, total } = await getPaginatedGalleries({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Gallery List
      </h2>

      {galleries.length === 0 ? (
        <p className="text-gray-600 text-center">No gallery data found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Media Carousel - Top Section */}
                <div className="flex-grow">
                  <MediaCarousel
                    youtubeLink={item.youtubeLink.toString()}
                    images={item.images.map((item) => ({ url: item.url }))}
                  />
                </div>

                {/* Content - Bottom Section */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <Edit model="gallery" id={item._id.toString()} />
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Created:</span>{" "}
                      {item.createDate?.date} {item.createDate?.formatedTime}
                    </p>
                    <p>
                      <span className="font-medium">Updated:</span>{" "}
                      {item.updateDate?.date} {item.updateDate?.formatedTime}
                    </p>
                  </div>
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
