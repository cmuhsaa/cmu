import Edit from "@/components/Edit";
import MediaCarousel from "@/components/MediaCarousel";
import { getPostById } from "@/lib/getData";
import { getPaginatedPosts } from "@/lib/getDatas";
import { notFound } from "next/navigation";

const Page = async ({ params }) => {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container p-3 lg:p-0">
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with title */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8 text-white">
          <h1 className="text-3xl font-bold text-gray-900 text-white">{post.title}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-300">
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

export async function generateStaticParams() {
  const posts = await getPaginatedPosts({ page: 1, limit: Infinity });
  return posts.posts.map((post) => ({
    id: post._id.toString(),
  }));
}
