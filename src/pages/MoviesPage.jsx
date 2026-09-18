import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Film, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getShows, searchShows } from '../services/api';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load initial shows from /shows
  const loadInitialShows = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getShows();
      setMovies(data);
    } catch (err) {
      console.error('Error fetching shows:', err);
      setError('Unable to load movies. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialShows();
  }, [loadInitialShows]);

  // Debounced search query handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      // If query cleared, reload all shows
      loadInitialShows();
      return;
    }

    setSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        setError(null);
        const results = await searchShows(searchQuery);
        setMovies(results);
      } catch (err) {
        console.error('Error searching shows:', err);
        setError('Search failed. Please try a different search term.');
      } finally {
        setSearching(false);
      }
    }, 350); // 350ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, loadInitialShows]);

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Filter and sort movies in memory
  const displayedMovies = useMemo(() => {
    let list = [...movies];

    // 1. Filter by Genre
    if (selectedGenre !== 'All') {
      list = list.filter((movie) =>
        movie.genres?.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // 2. Sorting
    switch (sortBy) {
      case 'rating-desc':
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'rating-asc':
        list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case 'year-desc':
        list.sort((a, b) => (b.premiered || '').localeCompare(a.premiered || ''));
        break;
      case 'year-asc':
        list.sort((a, b) => (a.premiered || '').localeCompare(b.premiered || ''));
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [movies, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Page Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Movie Listing Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Explore All Movies & Shows
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Search our extensive database powered by TVMaze API or filter by your favorite genre.
          </p>
        </div>

        {/* Search Bar at the Top (matching wireframe) */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={handleClearSearch}
          isLoading={searching}
        />

        {/* Filter and Sort Bar */}
        <FilterBar
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          totalCount={displayedMovies.length}
        />

        {/* Error State */}
        {error && (
          <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/40 text-center max-w-xl mx-auto my-10 space-y-4">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
            <p className="text-red-200 text-sm font-medium">{error}</p>
            <button
              onClick={loadInitialShows}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading ? (
          <LoadingSkeleton count={12} />
        ) : displayedMovies.length === 0 ? (
          /* Empty Search / Filter State */
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mx-auto text-gray-500">
              <Film className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No Movies Found</h3>
            <p className="text-sm text-gray-400">
              {searchQuery
                ? `We couldn't find any shows matching "${searchQuery}". Try searching with different keywords.`
                : `No movies match the genre "${selectedGenre}".`}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold transition-all border border-gray-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Responsive Movie Grid: 1 col mobile, 2 col tablet, 3-4 col desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={(m) => setSelectedMovie(m)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
