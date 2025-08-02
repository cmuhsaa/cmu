import Link from "next/link";
export default function HeroSection({ schoolName, total, eventTotal }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 object-cover object-top"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20Indian%20high%20school%20campus%20with%20modern%20buildings%2C%20green%20lawns%2C%20students%20walking%2C%20palm%20trees%2C%20bright%20sunny%20day%2C%20educational%20institution%20architecture%2C%20welcoming%20entrance%20gate%2C%20vibrant%20school%20environment%2C%20academic%20atmosphere&width=1920&height=1080&seq=hero-school&orientation=landscape')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>

      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="font-['Pacifico'] text-4xl md:text-6xl mb-4 text-yellow-300">
            {schoolName}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Alumni Network
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Connecting generations of excellence. Stay connected with your alma
            mater and fellow graduates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/join"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer"
          >
            Join Alumni Network
          </Link>
          <Link
            href="/event"
            className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Upcoming Events
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">
              {total}+
            </div>
            <div className="text-gray-200">Registered Alumni</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">25+</div>
            <div className="text-gray-200">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-300 mb-2">
              {eventTotal}+
            </div>
            <div className="text-gray-200">Annual Events</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <i className="ri-arrow-down-line text-3xl w-8 h-8 flex items-center justify-center"></i>
      </div>
    </section>
  );
}
