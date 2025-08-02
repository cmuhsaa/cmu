'use client';

import Link from 'next/link';

interface Alumni {
  av: { pi: string; u: string };
  id: string;
  na: string;
  em: string;
  ph: string;
  ba: { id: string; na: string };
  ab: string;
  pr: string;
  ad: string;
  ty: string;
  ia: number;
  cd: { d: string; t: string };
  ud: { d: string; t: string };
}

interface AlumniSpotlightProps {
  alumni: Alumni[];
}

export default function AlumniSpotlight({ alumni }: AlumniSpotlightProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Alumni Spotlight
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Celebrating the remarkable achievements of our distinguished graduates
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {alumni.map((person, index) => (
            <div key={person.id} className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div 
                      className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex-shrink-0"
                      style={{
                        backgroundImage: `url('https://readdy.ai/api/search-image?query=${index === 0 ? 'Professional headshot of successful doctor in white coat, confident smile, medical background, modern hospital setting, professional lighting, friendly demeanor, stethoscope around neck' : 'Professional headshot of successful female CEO, confident expression, business attire, modern office background, natural lighting, leadership presence, corporate portrait style'}&width=200&height=200&seq=alumni-${index}&orientation=squarish')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 flex items-center justify-center">
                      <i className="ri-check-line text-white text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{person.na}</h3>
                    <div className="text-yellow-400 font-semibold mb-1">{person.pr}</div>
                    <div className="text-gray-300 text-sm mb-2">{person.ad}</div>
                    <div className="inline-block bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm">
                      {person.ba.na}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{person.ab}. Their innovative approach and dedication continue to inspire the next generation of graduates."
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link href={`mailto:${person.em}`} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                      <i className="ri-mail-line text-white w-5 h-5 flex items-center justify-center"></i>
                    </Link>
                    <Link href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer">
                      <i className="ri-linkedin-fill text-white w-5 h-5 flex items-center justify-center"></i>
                    </Link>
                  </div>
                  
                  <Link href={`/alumni/${person.id}`} className="text-yellow-400 hover:text-yellow-300 font-semibold cursor-pointer">
                    Read Full Story →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/alumni" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 whitespace-nowrap cursor-pointer">
            Meet More Alumni
            <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}