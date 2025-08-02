'use client';

import Link from 'next/link';

interface News {
  id: string;
  ti: string;
  de: string;
  ty: string;
  dt: string;
  im: Array<{ pi: string; u: string }>;
  pb: string;
  cd: { d: string; t: string };
  ud: { d: string; t: string };
}

interface NewsSectionProps {
  news: News[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Latest News & Updates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest developments and achievements in our alumni community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {news.map((item, index) => (
            <article key={item.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://readdy.ai/api/search-image?query=${index === 0 ? 'Students receiving scholarships at university ceremony, graduation caps in air, academic celebration, diverse group of happy students, diploma ceremony, university campus background, bright natural lighting' : 'Award ceremony with trophies and medals, successful alumni being recognized, formal presentation setting, applause and celebration, professional achievement recognition, elegant stage setup'}&width=600&height=400&seq=news-${index}&orientation=landscape')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.ty === 'announcement' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {item.ty === 'announcement' ? 'Announcement' : 'Achievement'}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                  <span>{item.dt}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {item.ti}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.de}
                </p>
                
                <div className="flex items-center justify-between">
                  <Link href={`/news/${item.id}`} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
                    Read More
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
                  </Link>
                  
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                      <i className="ri-heart-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                      <i className="ri-share-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/news" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap cursor-pointer">
            View All News
            <i className="ri-newspaper-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}