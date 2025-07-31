import Edit from "@/components/Edit";
import MediaCarousel from "@/components/MediaCarousel";
import { getPostById } from "@/lib/getData";

export const dynamic = "force-static"; // Optional: forces static + ISR


const Page = async ({ params }) => {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600">
        Post not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with title */}
        <header className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {post.createDate?.date} at {post.createDate?.formatedTime}
            </div>
            {post.updateDate && (
              <div>
                <span className="font-medium">Updated:</span>{" "}
                {post.updateDate?.date} at {post.updateDate?.formatedTime}
              </div>
            )}
          </div>
        </header>

        {/* Media section */}
        <section className="p-6">
          <MediaCarousel
            youtubeLink={post.youtubeLink.toString()}
            images={post.images.map((item) => ({ url: item.url }))}
          />
        </section>

        {/* Content section */}
        <section className="p-6 pt-0">
          <div className="prose max-w-none text-gray-700">
            <p className="whitespace-pre-line">{post.content}</p>
            <Edit model="post" id={id} />
          </div>
        </section>
      </article>
    </div>
  );
};

export default Page;
