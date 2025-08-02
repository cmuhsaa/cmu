'use client';

export default function StatsSection() {
  const stats = [
    {
      number: "15,000+",
      label: "Active Alumni",
      icon: "ri-group-line"
    },
    {
      number: "120+",
      label: "Countries Worldwide",
      icon: "ri-global-line"
    },
    {
      number: "85%",
      label: "Career Success Rate",
      icon: "ri-trophy-line"
    },
    {
      number: "50+",
      label: "Annual Events",
      icon: "ri-calendar-event-line"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Alumni Network
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A global community of achievers making impact across industries and continents
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:rotate-6 transition-transform duration-300">
                  <i className={`${stat.icon} text-2xl text-white w-8 h-8 flex items-center justify-center`}></i>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}