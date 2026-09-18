import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Film } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800/80 bg-[#070b12] text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-800/60">
          {/* Brand Info with New Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link to="/" className="inline-block group">
              <Logo size="small" />
            </Link>
            <p className="text-xs text-gray-400 max-w-sm">
              Your premier gateway to discover movies, explore television shows, ratings, and in-depth storylines.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/movies" className="hover:text-white transition-colors">
              Movies
            </Link>
            <a 
              href="https://www.tvmaze.com/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span>TVMaze Data</span>
            </a>
          </div>

          {/* Action Link */}
          <div className="flex items-center gap-3">
            <Link
              to="/movies"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-gray-800/70 hover:bg-gray-800 border border-gray-700/60 transition-all duration-200"
            >
              <Film className="w-3.5 h-3.5 text-red-500" />
              <span>Explore Catalog</span>
            </Link>
          </div>
        </div>

        {/* Clean Copyright notice (no assignment references) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© {currentYear} CineVerse. All rights reserved.</p>
          <p className="text-gray-500">
            Powered by React, Tailwind CSS & TVMaze API
          </p>
        </div>
      </div>
    </footer>
  );
}
