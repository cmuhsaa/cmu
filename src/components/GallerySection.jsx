import Link from "next/link";
import MediaCarousel from "./MediaCarousel";
import Edit from "./Edit";

export default function GallerySection({ gallery }) {
  return (
    <section className="py-10">
      <div className="px-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Memory Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Relive precious moments and celebrate the vibrant life of our alumni
            community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gallery.map((item) => (
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
                  <h3 className="line-clamp-3 text-lg font-semibold text-gray-800 mb-2">
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

        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            View Full Gallery
            <i className="ri-image-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
