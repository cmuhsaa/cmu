import { getPaginatedPosts } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";
import MediaCarousel from "@/components/MediaCarousel";

export const dynamic = "force-static"; // Optional: forces static + ISR

// This remains a Server Component
export default async function PostPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;

  const { posts, total } = await getPaginatedPosts({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Post List
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center">No post data found.</p>
      ) : (
        <>
          <div className="space-y-10">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <Link href={`/post/${post._id}`} className="group">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                    </Link>
                    <Edit model="post" id={post._id.toString()} />
                  </div>

                  <p className="mt-2 text-gray-600">{post.content}</p>

                  {/* Media Carousel */}
                  {(post.youtubeLink || post.images?.length > 0) && (
                    <div className="mt-6">
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
