'use client';

import Link from 'next/link';

interface Memory {
  id: string;
  ti: string;
  ct: string;
  yl: string;
  im: Array<{ pi: string; u: string }>;
  pb: string;
  cd: { d: string; t: string };
  ud: { d: string; t: string };
}

interface MemoriesSectionProps {
  memories: Memory[];
}

export default function MemoriesSection({ memories }: MemoriesSectionProps) {
  return (
    <section className="py-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      <div className="px-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Cherished Memories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stories and moments that define our shared journey through the decades
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-400 to-pink-400 h-full rounded-full"></div>
          
          <div className="space-y-16">
            {memories.map((memory, index) => (
              <div key={memory.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                        <i className="ri-time-line text-2xl text-white w-8 h-8 flex items-center justify-center"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{memory.ti}</h3>
                        <p className="text-yellow-400 font-semibold">{memory.yl}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {memory.ct}
                    </p>
                    
                    <Link href={`/memories/${memory.id}`} className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold cursor-pointer">
                      Explore Memory
                      <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
                    </Link>
                  </div>
                </div>
                
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full border-4 border-white/20 flex items-center justify-center flex-shrink-0 z-10">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}>
                  <div 
                    className="aspect-video rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url('https://readdy.ai/api/search-image?query=${index === 0 ? 'Nostalgic 1990s university campus life, students with vintage clothing, retro atmosphere, film photography style, classic brick buildings, young people socializing, analog aesthetic, warm golden tones' : 'University campus life in early 2000s, students with books and backpacks, diverse group studying together, brick walkways, autumn leaves, classic collegiate atmosphere, natural lighting'}&width=600&height=400&seq=memory-${index}&orientation=landscape')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link href="/memories" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-pink-500 text-black px-4 py-2 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-pink-600 transition-all duration-300 whitespace-nowrap cursor-pointer">
            Share Your Memory
            <i className="ri-add-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}