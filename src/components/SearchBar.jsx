import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, isLoading }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 sm:left-5 pointer-events-none text-gray-400">
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-red-500" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* Input matching wireframe: Search for a movie... */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="🔍 Search for a movie or show by title..."
          className="w-full pl-12 sm:pl-14 pr-12 py-4 sm:py-5 text-base sm:text-lg rounded-2xl bg-gray-900/90 text-white placeholder-gray-400 border border-gray-700/70 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-200"
          aria-label="Search movies"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 sm:right-5 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Query status hint */}
      {value && (
        <div className="mt-2.5 px-2 flex items-center justify-between text-xs sm:text-sm text-gray-400">
          <span>
            Showing results for: <span className="text-red-400 font-semibold">"{value}"</span>
          </span>
          <button
            onClick={onClear}
            className="text-xs text-gray-500 hover:text-gray-300 underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
