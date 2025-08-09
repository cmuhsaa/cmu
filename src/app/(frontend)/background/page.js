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
  const { history } = data;
  return {
    title: "প্রেক্ষাপট ও ইতিহাস",
    description: history,
  };
}

export const dynamic = "force-static";

export default async function BackgroundPage() {
  const { data } = await getLinksContent();
  if (!data) {
    notFound();
  }
  const { history, vision, mission, achievements } = data;

  return (
    <div className="bg-white/40 backdrop-blur-[2px] rounded-2xl shadow-xl overflow-hidden">
      {/* Hero */}
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `url('/cover2.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-green-900/10"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            প্রেক্ষাপট ও ইতিহাস
          </h1>
        </div>
      </div>

      {/* Quote */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-l-4 border-blue-500">
          <blockquote className="italic text-lg text-gray-700 leading-relaxed">
            <i className="ri-double-quotes-l text-3xl text-blue-500 float-left mr-2 mt-1"></i>
            &quot;মহান দার্শনিক রুশো বলেছিলেন &apos;বিশ্ববিদ্যালয় হবে শহর থেকে
            দূরে নির্জন কোনো জায়গায়, যেখানে থাকবে না কোনো কোলাহল, পরিবেশ হবে
            মুক্ত, শিক্ষার্থীরা বেড়ে উঠবে অপরূপ এক প্রকৃতির কোলে, প্রকৃতি হবে
            তাদের শিক্ষক&apos;।&quot;
          </blockquote>
          <cite className="block text-sm text-blue-600 font-medium mt-4">
            - জঁ-জাক রুশো
          </cite>
        </div>

        {/* History */}
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <i className="ri-time-line w-7 h-7 mr-3 text-green-600"></i>
          ঐতিহাসিক পটভূমি
        </h2>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold"></div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">প্রতিষ্ঠাকাল</h3>
            </div>
          </div>
          <pre className="rounded-md p-4 text-gray-700 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed">
            {history}
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
