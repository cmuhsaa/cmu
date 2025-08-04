import { getPaginatedGalleries } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import MediaCarousel from "@/components/MediaCarousel";

export const dynamic = "force-static"; // Optional: forces static + ISR

export default async function GalleryPage({ params }) {
  let { page } = await params;
  page = parseInt(page) || 1;
  const limit = 10;

  const { galleries, total } = await getPaginatedGalleries({ page, limit });
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
        </div>
      </div>

      {galleries.length === 0 ? (
        <p className="text-gray-600 text-center">No gallery data found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 lg:px-0">
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
                      <span className="font-medium">Post On:</span>{" "}
                      {item.createDate?.date} {item.createDate?.formatedTime}
                    </p>
                    
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
