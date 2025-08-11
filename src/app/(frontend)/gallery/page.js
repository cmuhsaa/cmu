import { getPaginatedGalleries } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import MediaCarousel from "@/components/MediaCarousel";

export async function generateMetadata() {
  return {
    title: "CMUHSAA Gallery",
  };
}

export const dynamic = "force-static"; // Optional: forces static + ISR

export default async function GalleryPage({ params }) {
  let { page } = await params;
  page = parseInt(page) || 1;
  const limit = 10;

  const { galleries, total } = await getPaginatedGalleries({ page, limit });
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Gallery</h1>
        </div>
      </div>

      {galleries.length === 0 ? (
        <p className="text-gray-600 text-center">No gallery data found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 xl:px-0">
            {galleries.map((item) => (
              <div
                key={item._id}
                className="relative bg-white/50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <Edit model="gallery" id={item._id.toString()} />
                {/* Media Carousel - Top Section */}
                <div className="flex-grow">
                  <MediaCarousel
                    youtubeLink={item.youtubeLink.toString()}
                    images={item.images.map((item) => ({ url: item.url }))}
                  />
                </div>

                {/* Content - Bottom Section */}
                <div className="p-2">
                  <div className="flex justify-between items-start">
                    <h3 className="line-clamp-1 text-lg font-semibold text-gray-800 mb-2">
                      <Link href={`/gallery/${item._id.toString()}`}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-10 gap-4">
            {page > 1 && (
              <Link href={`/gallery/page/${page - 1}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Previous
                </button>
              </Link>
            )}
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`/gallery/page/${page + 1}`}>
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
