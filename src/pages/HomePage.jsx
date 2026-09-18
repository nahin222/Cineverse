import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Film, Star, Sparkles, TrendingUp, Compass } from 'lucide-react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getShows } from '../services/api';

export default function HomePage() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        const data = await getShows();
        // Curate top rated shows for the home page showcase
        const sorted = [...data]
          .filter((s) => s.rating && s.rating >= 7.5)
          .slice(0, 8);
        setFeaturedMovies(sorted.length > 0 ? sorted : data.slice(0, 8));
      } catch (err) {
        console.error('Error loading featured movies:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19]">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Banner matching wireframe specifications */}
      <HeroBanner />

      {/* Featured Showcase Section */}
      <section id="featured" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 tracking-wider uppercase mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Shows & Movies
            </h2>
          </div>

          <Link
            to="/movies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors group"
          >
            <span>View All in Movie Listing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Movie Cards Grid */}
        {loading ? (
          <LoadingSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={(m) => setSelectedMovie(m)}
              />
            ))}
          </div>
        )}

        {/* Explore More Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-red-950/40 via-gray-900 to-gray-900 border border-red-500/20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Looking for something specific?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Search by title, explore various genres, filter by ratings, and discover thousands of television shows and films.
            </p>
            <div className="pt-2">
              <Link
                to="/movies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30 transition-all duration-200"
              >
                <Compass className="w-4 h-4" />
                <span>Open CineVerse Search</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
