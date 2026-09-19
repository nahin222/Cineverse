import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Film, Compass, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center group">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg ${
                isActive('/') 
                  ? 'text-white font-bold bg-gray-800/50' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
              }`}
            >
              Home
            </Link>

            {/* Prominent [ Movies ] Button matching assignment wireframe: [ Movies ] */}
            <Link
              to="/movies"
              className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 shadow-md ${
                isActive('/movies')
                  ? 'bg-red-600 text-white shadow-red-600/40 border border-red-400 ring-2 ring-red-500/30'
                  : 'bg-gray-800/90 text-white hover:bg-red-600 border border-gray-700/80 hover:border-red-500 hover:shadow-red-600/25 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              <Film className="w-4 h-4 text-red-400 group-hover:text-white" />
              <span>Movies</span>
            </Link>
          </nav>

          {/* Mobile top-right actions */}
          <div className="flex md:hidden items-center gap-2.5">
            <Link
              to="/movies"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                isActive('/movies')
                  ? 'bg-red-600 text-white border-red-400 shadow-sm'
                  : 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-red-600 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-red-400" />
              <span>Movies</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-800 bg-gray-900/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive('/') ? 'bg-red-600/10 text-red-500 font-bold' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            Home
          </Link>
          <Link
            to="/movies"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium ${
              isActive('/movies') ? 'bg-red-600/10 text-red-500 font-bold' : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            All Movies & Shows
          </Link>
          <div className="pt-2">
            <Link
              to="/movies"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg shadow-red-600/30"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Movies</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
