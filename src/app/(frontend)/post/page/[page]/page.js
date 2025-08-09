import { getPaginatedPosts } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import MediaCarousel from "@/components/MediaCarousel";

export async function generateMetadata() {
  return {
    title: "CMUHSAA Posts",
  };
}

// This remains a Server Component
export default async function PostPage({ params }) {
  let { page } = await params;
  page = parseInt(page) || 1;
  const limit = 10;

  const { posts, total } = await getPaginatedPosts({ page, limit });
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Posts</h1>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No post data found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-3 xl:px-0">
            {posts.map((post) => (
              <div
                key={post._id}
                className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Edit model="post" id={post._id.toString()} />
                <div className="p-6 h-full">
                  <div className="flex justify-between items-start">
                    <Link href={`/post/${post._id}`} className="group">
                      <h3 className="line-clamp-1 text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                    </Link>
                  </div>

                  <p className="line-clamp-2 mt-2 text-gray-600">
                    {post.content}
                  </p>

                  {/* Media Carousel */}
                  {(post.youtubeLink || post.images?.length > 0) && (
                    <div className="mt-auto">
                      <h4 className="text-lg font-medium text-gray-700 mb-3">
                        Media
                      </h4>
                      <MediaCarousel
                        youtubeLink={String(post.youtubeLink || "")}
                        images={post.images?.map((img) => ({
                          url: String(img.url),
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
              <Link href={`/post/page/${page - 1}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Previous
                </button>
              </Link>
            )}
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link href={`/post/page/${page + 1}`}>
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
