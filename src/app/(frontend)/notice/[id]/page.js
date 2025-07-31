import Edit from "@/components/Edit";
import MediaCarousel from "@/components/MediaCarousel";
import { getNoticeById } from "@/lib/getData";
import { getPaginatedNotices } from "@/lib/getDatas";
import { notFound } from "next/navigation";

const Page = async ({ params }) => {
  const { id } = await params;
  const notice = await getNoticeById(id);

  if (!notice) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header section */}
        <header className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {notice.title}
              </h1>
              <div className="mt-1 inline-block px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-800">
                {notice.type}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div>
                <span className="font-medium">Date:</span> {notice.dateTime}
              </div>
            </div>
          </div>
        </header>

        {/* Media section */}
        <section className="p-6">
          <MediaCarousel
            images={notice.images.map((item) => ({ url: item.url }))}
          />
        </section>

        {/* Content section */}
        <section className="p-6 pt-0">
          <div className="prose max-w-none text-gray-700">
            <p className="whitespace-pre-line">{notice.description}</p>
            <Edit model="notice" id={id} />
          </div>
        </section>

        {/* Meta information */}
        <footer className="p-6 border-t bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Created
              </h3>
              <p>
                {notice.createDate?.date} at {notice.createDate?.formatedTime}
              </p>
            </div>
            {notice.updateDate && (
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Updated
                </h3>
                <p>
                  {notice.updateDate?.date} at {notice.updateDate?.formatedTime}
                </p>
              </div>
            )}
          </div>
        </footer>
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
