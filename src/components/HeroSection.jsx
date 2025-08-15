import Link from "next/link";
export default function HeroSection({ schoolName }) {
  return (
    <section className="relative shadow-xl p-4 py-20 rounded flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 object-cover object-top"
        style={{
          backgroundImage: `url('/cover.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-blue-800/10 to-purple-600/10"></div>

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl md:text-4xl mb-2 font-bold text-blue font-roboto-condensed clear-text-shadow">
            {schoolName}
          </h1>
          <h2 className="text-xs font-bold mb-2 leading-tight invisible">
            Chachaitara Madla United High School
          </h2>
          <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
            Alumni Association
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/join"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer"
          >
            Join Alumni
          </Link>
          <Link
            href="/event"
            className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-4 py-2 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Upcoming Events
          </Link>
        </div>
      </div>
    </section>
  );
}
