import { useState } from 'react';
import { Star, Calendar, Info } from 'lucide-react';
import { formatRating, getReleaseYear, PLACEHOLDER_POSTER } from '../utils/formatters';

export default function MovieCard({ movie, onSelect }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterSrc = !imageError && (movie.image?.medium || movie.image?.original)
    ? (movie.image?.medium || movie.image?.original)
    : PLACEHOLDER_POSTER;

  const releaseYear = getReleaseYear(movie.premiered);
  const ratingText = formatRating(movie.rating);

  return (
    <div className="group flex flex-col rounded-2xl bg-gray-900/80 border border-gray-800/90 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-950/20 hover:border-gray-700/80 transition-all duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-[2/3] w-full bg-gray-950 overflow-hidden">
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{ratingText}</span>
        </div>

        {movie.genres && movie.genres.length > 0 && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-red-950/80 backdrop-blur-md border border-red-500/30 text-red-300 text-[11px] font-semibold">
            {movie.genres[0]}
          </div>
        )}

        <img
          src={posterSrc}
          alt={movie.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-gray-900 to-[#0d131f]">
        <div>
          <h3 
            className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-red-400 transition-colors"
            title={movie.name}
          >
            {movie.name}
          </h3>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mt-2">
            <span className="flex items-center gap-1 font-semibold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              {ratingText}
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1 font-medium text-gray-300">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {releaseYear}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-gray-800/60">
          <button
            type="button"
            onClick={() => onSelect(movie)}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-bold text-white bg-gray-800/90 hover:bg-red-600 active:bg-red-700 rounded-xl border border-gray-700/60 hover:border-red-500/60 shadow-sm hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 group/btn"
          >
            <Info className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors" />
            <span>See Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
