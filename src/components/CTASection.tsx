'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=University%20campus%20aerial%20view%20with%20historic%20buildings%2C%20green%20spaces%2C%20pathways%20connecting%20different%20areas%2C%20students%20walking%20across%20quad%2C%20beautiful%20architecture%2C%20collegiate%20atmosphere%2C%20inspiring%20educational%20environment&width=1920&height=600&seq=cta-bg&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Join Our Growing
            <span className="block text-yellow-300">Alumni Family</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed">
            Connect with thousands of alumni worldwide, share your achievements, find mentors, 
            and give back to the next generation. Your journey continues here.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-team-line text-3xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Network & Connect</h3>
              <p className="text-gray-300">Build meaningful relationships with fellow alumni across industries and generations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-lightbulb-line text-3xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Share & Inspire</h3>
              <p className="text-gray-300">Tell your story and inspire current students with your achievements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-line text-3xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Give Back</h3>
              <p className="text-gray-300">Support scholarships, mentoring programs, and campus development</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/join" className="bg-yellow-500 hover:bg-yellow-600 text-black px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer">
              Join Alumni Network
            </Link>
            <Link href="/donate" className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 whitespace-nowrap cursor-pointer">
              Make a Donation
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-300">15K+</div>
              <div className="text-sm text-gray-300">Alumni Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">$2.5M</div>
              <div className="text-sm text-gray-300">Scholarships Funded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">120+</div>
              <div className="text-sm text-gray-300">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300">95%</div>
              <div className="text-sm text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}