import { getLinksContent } from "@/lib/getDatas";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TbTargetArrow } from "react-icons/tb";
import { TfiTarget } from "react-icons/tfi";

export async function generateMetadata() {
  const { data } = await getLinksContent();
  if (!data) {
    notFound();
  }
  const { secretaryMessage } = data;
  return {
    title: "সাধারণ সম্পাদকর বাণী",
    description: secretaryMessage.message,
  };
}

export const dynamic = "force-static";

export default async function BackgroundPage() {
  const { data } = await getLinksContent();
  if (!data) {
    notFound();
  }
  const { vision, mission, achievements, secretaryMessage } = data;

  return (
    <div className="bg-white/40 backdrop-blur-[2px] rounded-2xl shadow-xl overflow-hidden">
      {/* Hero Section - Same as before */}
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url('/cover2.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-green-900/10"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            সাধারণ সম্পাদকর বাণী
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
                  src={secretaryMessage.image.url}
                  alt={secretaryMessage.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800">
                {secretaryMessage.name}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {secretaryMessage.designation}
              </p>
            </div>
            <div className="md:w-2/3">
              <div className="relative">
                <i className="ri-double-quotes-l text-2xl text-red-400 opacity-20 absolute -top-2 -left-2"></i>
                <pre className="rounded-md p-4 text-gray-700 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed relative z-10">
                  {secretaryMessage.message}
                </pre>
                <i className="ri-double-quotes-r text-2xl text-red-400 opacity-20 absolute -bottom-2 -right-2"></i>
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
