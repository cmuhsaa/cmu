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
  const { vision, mission, achievements, patronMessage } = data;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Hero Section - Same as before */}
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20university%20campus%20in%20Bangladesh%20with%20lush%20green%20hills%2C%20traditional%20academic%20buildings%2C%20students%20walking%20on%20pathways%2C%20serene%20natural%20environment%2C%20peaceful%20educational%20atmosphere%2C%20blue%20sky%20with%20white%20clouds%2C%20vibrant%20green%20landscapes%20surrounding%20the%20campus&width=800&height=320&seq=bg-hero-001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/60"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            প্রধান পৃষ্ঠপোষকের বাণী
          </h1>
        </div>
      </div>

      {/* Patron Message Section - NEW */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 mb-10 border-l-4 border-red-500">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                <img
                  src={patronMessage.image.url}
                  alt={patronMessage.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800">
                {patronMessage.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {patronMessage.designation}
              </p>
            </div>
            <div className="md:w-2/3">
              <div className="relative">
                <i className="ri-double-quotes-l text-4xl text-red-400 opacity-20 absolute -top-2 -left-2"></i>
                <pre className="rounded-md p-4 text-gray-700 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed relative z-10">
                  {patronMessage.message}
                </pre>
                <i className="ri-double-quotes-r text-4xl text-red-400 opacity-20 absolute -bottom-2 -right-2"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div
            className={`bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-8`}
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">
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
              <span className="text-4xl mr-3">
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
