import Edit from "@/components/Edit";
import MediaCarousel from "@/components/MediaCarousel";
import { getNoticeById } from "@/lib/getData";
import { getPaginatedNotices } from "@/lib/getDatas";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const notice = await getNoticeById(id);

  if (!notice) {
    notFound();
  }
  return {
    title: "Notice | " + notice.title,
    description: notice.description,
  };
}

const Page = async ({ params }) => {
  const { id } = await params;
  const notice = await getNoticeById(id);

  if (!notice) {
    notFound();
  }

  return (
    <div className="relative p-3 xl:p-0">
      <Edit model="notice" id={id} />
      <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Header section */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl text-white md:text-3xl lg:text-2xl font-bold text-gray-900 leading-tight">
                {notice.title}
              </h1>
              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {notice.type}
              </div>
            </div>
            <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
              <div className="font-medium text-gray-700">Date:</div>
              <div>{new Date(notice.dateTime).toLocaleDateString("en-GB")}</div>
            </div>
          </div>
        </header>

        {/* Main content area with responsive columns */}
        <div className="flex flex-col lg:flex-row">
          {/* Media section - takes full width on mobile, half on desktop */}
          <section className="p-6 lg:p-8 lg:w-1/2 lg:border-r">
            <div className="sticky top-6">
              <MediaCarousel
                images={notice.images.map((item) => ({ url: item.url }))}
                className="rounded-xl overflow-hidden shadow-md"
              />
            </div>
          </section>

          {/* Content section - takes full width on mobile, half on desktop */}
          <section className="p-6 lg:p-8 lg:w-1/2">
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="whitespace-pre-line mb-6 leading-relaxed">
                {notice.description}
              </p>
            </div>

            {/* Meta information - moves to bottom on mobile, stays in column on desktop */}
            <footer className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Created
                  </h3>
                  <p className="font-medium text-gray-700">
                    {notice.createDate?.date}{" "}
                    <span className="text-gray-500">
                      at {notice.createDate?.formatedTime}
                    </span>
                  </p>
                </div>
                {notice.updateDate && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Updated
                    </h3>
                    <p className="font-medium text-gray-700">
                      {notice.updateDate?.date}{" "}
                      <span className="text-gray-500">
                        at {notice.updateDate?.formatedTime}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </footer>
          </section>
        </div>
      </article>
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const notices = await getPaginatedNotices({ page: 1, limit: Infinity });
  return notices.notices.map((notice) => ({
    id: notice._id.toString(),
  }));
}
