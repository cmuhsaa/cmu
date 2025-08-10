import Link from "next/link";
import MediaCarousel from "./MediaCarousel";

export default function PostsSection({ posts }) {
  return (
    <section className="py-10 bg-white">
      <div className="px-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Alumni Stories & Updates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating achievements and sharing inspiring stories from our
            alumni community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <div className="flex-grow">
                  <MediaCarousel
                    youtubeLink={post.youtubeLink.toString()}
                    images={post.images.map((item) => ({ url: item.url }))}
                  />
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg line-clamp-1 font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  <Link href={`/post/${post._id.toString()}`}>
                    {post.title}
                  </Link>
                </h3>

                <div className="flex items-center justify-between">
                  <Link
                    href={`/post/${post._id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 cursor-pointer"
                  >
                    Read Full Story
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/post"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            View All Posts
            <i className="ri-file-text-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
