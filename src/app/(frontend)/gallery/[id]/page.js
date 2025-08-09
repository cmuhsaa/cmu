import Edit from "@/components/Edit";
import MediaCarousel from "@/components/MediaCarousel";
import { getGalleryById } from "@/lib/getData";
import { getPaginatedGalleries } from "@/lib/getDatas";
import { notFound } from "next/navigation";

const Page = async ({ params }) => {
  const { id } = await params;
  const gallery = await getGalleryById(id);

  if (!gallery) {
    notFound();
  }

  return (
    <div className="relative p-3 xl:p-0">
      <Edit model="gallery" id={id} />
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with title */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8 text-white">
          <h1 className="text-3xl font-bold text-gray-900 text-white">
            {gallery.title}
          </h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-300">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {gallery.createDate?.date} at {gallery.createDate?.formatedTime}
            </div>
            {gallery.updateDate && (
              <div>
                <span className="font-medium">Updated:</span>{" "}
                {gallery.updateDate?.date} at {gallery.updateDate?.formatedTime}
              </div>
            )}
          </div>
        </header>

        {/* Media section */}
        <section className="p-6">
          <MediaCarousel
            youtubeLink={gallery.youtubeLink.toString()}
            images={gallery.images.map((item) => ({ url: item.url }))}
          />
        </section>

        {/* Content section */}
      </article>
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const galleries = await getPaginatedGalleries({ page: 1, limit: Infinity });
  return galleries.galleries.map((gallery) => ({
    id: gallery._id.toString(),
  }));
}
