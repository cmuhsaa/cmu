import { getLinksContent } from "@/lib/getDatas";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TbTargetArrow } from "react-icons/tb";
import { TfiTarget } from "react-icons/tfi";

const backgroundPageData = {
  stats: [
    { icon: "ri-calendar-line", label: "বছরের ঐতিহ্য", value: "৫৮+" },
    { icon: "ri-graduation-cap-line", label: "একর ক্যাম্পাস", value: "২১" },
    { icon: "ri-group-line", label: "প্রাক্তন শিক্ষার্থী", value: "১০০০+" },
    { icon: "ri-award-line", label: "সম্মাননা", value: "অসংখ্য" },
  ],
};

export const dynamic = "force-static";

export default async function BackgroundPage() {
  const { data } = await getLinksContent();
  if (!data) {
    notFound();
  }
  const { stats } = backgroundPageData;
  const { formation, establishment, vision, mission, achievements } = data;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Hero */}
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20university%20campus%20in%20Bangladesh%20with%20lush%20green%20hills%2C%20traditional%20academic%20buildings%2C%20students%20walking%20on%20pathways%2C%20serene%20natural%20environment%2C%20peaceful%20educational%20atmosphere%2C%20blue%20sky%20with%20white%20clouds%2C%20vibrant%20green%20landscapes%20surrounding%20the%20campus&width=800&height=320&seq=bg-hero-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/60"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">পরিচিতি</h1>
          <p className="text-xl">চাঁচাইতারা মাদলা ইউনাইটেড হাই স্কুল</p>
        </div>
      </div>

      {/* Quote */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-l-4 border-blue-500">
          <blockquote className="italic text-lg text-gray-700 leading-relaxed">
            <i className="ri-double-quotes-l text-3xl text-blue-500 float-left mr-2 mt-1"></i>
            &quot;বিশ্ববিদ্যালয়ের প্রাক্তন শিক্ষার্থীরা হলেন এর জীবন্ত ইতিহাস
            এবং ভবিষ্যতের রূপকার। তাদের সমন্বিত প্রচেষ্টাই পারে বিশ্ববিদ্যালয়ের
            গৌরবময় ঐতিহ্যকে আরও সমৃদ্ধ করতে।&quot;
          </blockquote>
        </div>

        {/* Formation */}
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <i className="ri-team-line w-7 h-7 mr-3 text-green-600"></i>
          গঠনের ইতিহাস
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
              ২০১৬
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">
                প্রাথমিক উদ্যোগ
              </h3>
              <p className="text-sm text-gray-600">
                সুবর্ণজয়ন্তী অনুষ্ঠানের পর
              </p>
            </div>
          </div>
          <pre className="rounded-md p-4 text-gray-700 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed">
            {formation}
          </pre>
        </div>

        {/* Establishment */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-10">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
              ২০১৮
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">
                আনুষ্ঠানিক প্রতিষ্ঠা
              </h3>
              <p className="text-sm text-gray-600">২২ ডিসেম্বর, ২০১৮</p>
            </div>
          </div>
          <pre className="rounded-md p-4 text-gray-700 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed">
            {establishment}
          </pre>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div
            className={`bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-8`}
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">
                <TbTargetArrow />
              </span>
              <h3 className="text-xl font-bold">আমাদের লক্ষ্য</h3>
            </div>
            <pre className="rounded-md p-4 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed">
              {mission}
            </pre>
          </div>
          <div
            className={`bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-8`}
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">
                <TfiTarget />
              </span>
              <h3 className="text-xl font-bold">আমাদের দৃষ্টিভঙ্গি</h3>
            </div>
            <pre className="rounded-md p-4 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed">
              {vision}
            </pre>
          </div>
        </div>

        {/* Achievements */}
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <i className="ri-trophy-line w-7 h-7 mr-3 text-yellow-600"></i>
          কৃতিত্ব ও অর্জন
        </h2>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 mb-10">
          <pre className="rounded-md p-4 text-gray-700 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed">
            {achievements}
          </pre>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center"
            >
              <i className={`${item.icon} text-3xl mb-2 opacity-80`}></i>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm opacity-90">{item.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">আমাদের সাথে যুক্ত হন</h3>
          <p className="text-lg opacity-90 mb-6">
            চাঁচাইতারা মাদলা ইউনাইটেড হাই স্কুলের গৌরবময় ঐতিহ্যের অংশীদার হয়ে
            আমাদের সাথে এগিয়ে চলুন
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/student`}
              className={`px-6 py-3 rounded-full font-medium transition-colors border-2 border-white text-white hover:bg-white hover:text-blue-600`}
            >
              শিক্ষার্থী তালিকা
            </Link>
            <Link
              href={`/event`}
              className={`px-6 py-3 rounded-full font-medium transition-colors bg-white text-blue-600 hover:bg-blue-50`}
            >
              আসন্ন ইভেন্ট
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
