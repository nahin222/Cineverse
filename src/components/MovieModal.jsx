import { useEffect } from 'react';
import { X, Star, Calendar, Clock, Globe, Tv, Layers, ExternalLink } from 'lucide-react';
import { stripHtml, formatRating, getReleaseYear, PLACEHOLDER_BACKDROP } from '../utils/formatters';

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    if (!movie) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const backdropSrc = movie.image?.original || movie.image?.medium || PLACEHOLDER_BACKDROP;
  const ratingText = formatRating(movie.rating);
  const releaseYear = getReleaseYear(movie.premiered);
  const cleanSummary = stripHtml(movie.summary);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-gray-900 border border-gray-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto transform transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-20">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-950/80 hover:bg-red-600 text-gray-300 hover:text-white border border-gray-700/60 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video sm:aspect-[21/9] w-full bg-gray-950 overflow-hidden">
          <img
            src={backdropSrc}
            alt={movie.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          
          {movie.status && (
            <div className="absolute bottom-3 left-4 sm:left-6 px-2.5 py-1 rounded-md bg-gray-950/80 backdrop-blur-sm border border-gray-700/60 text-xs font-semibold text-gray-300">
              Status: <span className="text-white font-bold">{movie.status}</span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {movie.name}
            </h2>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm mt-3 text-gray-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Rating: {ratingText}</span>
              </span>

              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-800/80 border border-gray-700/60 text-gray-200 font-medium">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Release: {releaseYear}</span>
              </span>

              {movie.runtime && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-800/80 border border-gray-700/60 text-gray-200 font-medium">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{movie.runtime} min</span>
                </span>
              )}
            </div>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Genres</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-red-950/60 text-red-300 border border-red-500/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-h-48 overflow-y-auto pr-2">
              {cleanSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-800 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-gray-500" />
              <span>Network / Platform: <strong className="text-gray-200">{movie.network}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span>Language: <strong className="text-gray-200">{movie.language}</strong></span>
            </div>
            {movie.officialSite && (
              <div className="sm:col-span-2 pt-1">
                <a
                  href={movie.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 hover:underline"
                >
                  <span>Visit Official Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-800 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gray-800 hover:bg-red-600 active:bg-red-700 text-white border border-gray-700 hover:border-red-500 transition-all duration-200 shadow-md"
            >
              <X className="w-4 h-4 text-red-400 hover:text-white" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
