import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Play, Compass, Film } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-gray-800/60">
      {/* Dynamic cinema backdrop gradient & ambient glow */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-sm scale-105 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/85 to-[#0b0f19]/95 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Hero Content Container */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Cinema Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>Unlimited Entertainment • TV Shows & Cinema</span>
        </div>

        {/* Application Title / Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase">
          DISCOVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">MOVIES</span>
        </h1>

        {/* Short, engaging description */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-300 font-normal leading-relaxed mb-10">
          Explore and discover your favorite movies and shows from around the world. Search ratings, release dates, and full plot summaries.
        </p>

        {/* Call-To-Action (CTA) buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/movies"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Explore Now</span>
          </Link>

          <a
            href="#featured"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-gray-300 hover:text-white bg-gray-900/80 hover:bg-gray-800 rounded-xl border border-gray-700/60 transition-all duration-200"
          >
            <Film className="w-4 h-4 text-red-400" />
            <span>Featured Titles</span>
          </a>
        </div>

        {/* Quick Highlights / Wireframe Accent Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-14 pt-8 border-t border-gray-800/80 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">1000+</div>
            <div className="text-xs sm:text-sm text-gray-400 font-medium">Shows & Movies</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">⭐ 8.5+</div>
            <div className="text-xs sm:text-sm text-gray-400 font-medium">Top Rated</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-red-400">Instant</div>
            <div className="text-xs sm:text-sm text-gray-400 font-medium">Live Search</div>
          </div>
        </div>
      </div>
    </section>
  );
}
