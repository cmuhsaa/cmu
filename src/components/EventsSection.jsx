import Link from 'next/link';

export default function EventsSection({ events }) {
  return (
    <section className="py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on these exciting opportunities to reconnect and celebrate
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {events.map((event, index) => (
            <div key={event._id} className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-102">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700"></div>
              <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=${index === 0 ? 'Elegant formal gala dinner event with round tables, warm lighting, people in formal attire socializing, luxurious ballroom setting, golden decorations, celebration atmosphere, professional event photography' : 'Professional networking event with people in business attire talking, modern conference room, bright lighting, handshakes and conversations, corporate setting, diverse professionals mingling'}&width=800&height=600&seq=event-${index}&orientation=landscape')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              
              <div className="relative z-10 p-8 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-2xl font-bold">{event.eventDate}</div>
                  </div>
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Register Now
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h3>
                <p className="text-lg opacity-90 mb-4">{event.titleBangla}</p>
                <p className="text-base opacity-80 mb-6">{event.description}</p>
                
                <div className="flex items-center gap-4 text-sm opacity-90 mb-6">
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center"></i>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                    <span>{event.registrationStartDate} - {event.registrationEndDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/event" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 whitespace-nowrap cursor-pointer">
            View All Events
            <i className="ri-calendar-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
