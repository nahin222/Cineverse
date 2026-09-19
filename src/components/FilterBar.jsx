import { Tag, ArrowUpDown } from 'lucide-react';
import { GENRES } from '../constants/genres';

export default function FilterBar({
  selectedGenre,
  onSelectGenre,
  sortBy,
  onSelectSort,
  totalCount,
}) {
  return (
    <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-md shadow-xl">
      {/* Top Header Row of FilterBar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 pb-3 border-b border-gray-800/70">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider">
          <Tag className="w-4 h-4 text-red-500" />
          <span>Filter by Genre</span>
        </div>

        {/* Sort & Count Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
          <div className="text-xs text-gray-400">
            Showing <span className="text-white font-bold px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700/60">{totalCount}</span> {totalCount === 1 ? 'title' : 'titles'}
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value)}
              className="bg-gray-800/90 border border-gray-700 text-gray-200 text-xs sm:text-sm rounded-xl px-3 py-1.5 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 cursor-pointer shadow-sm"
              aria-label="Sort movies"
            >
              <option value="default">Sort: Default</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
              <option value="name-asc">Title: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Genre Pills: Wrap nicely without awkward horizontal scrollbar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {GENRES.map((genre) => {
          const isSelected = selectedGenre === genre;
          return (
            <button
              key={genre}
              type="button"
              onClick={() => onSelectGenre(genre)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-md shadow-red-600/30 border border-red-400 scale-[1.03]'
                  : 'bg-gray-800/70 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700/60 hover:border-gray-600 active:scale-95'
              }`}
            >
              {genre === 'All' ? '🌟 All Genres' : genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}
