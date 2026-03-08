import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, Star, User, Heart } from 'lucide-react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { searchMovies } from '../services/tmdb';
import { GridCardSkeleton } from '../components/Loader';
import { useFavorites } from '../context/FavoritesContext';

const SearchResultCard = ({ item }) => {
  const isPerson = item.media_type === 'person';
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = !isPerson ? isFavorite(item.id) : false;
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Create consistent movie object for context
    const favoriteItem = {
      id: item.id,
      title: item.title || item.name,
      rating: item.vote_average ? parseFloat((item.vote_average / 2).toFixed(1)) : 'N/A',
      year: (item.release_date || item.first_air_date || '').split('-')[0],
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
      backdrop: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : null,
      overview: item.overview,
      media_type: item.media_type
    };

    toggleFavorite(favoriteItem);
  };

  const handleCardClick = () => {
    if (isPerson) return; // Ignore person clicks for now
    navigate(`/movie/${item.id}`);
  };

  return (
    <div onClick={handleCardClick} className={`flex flex-col gap-2 group w-full ${!isPerson ? 'cursor-pointer' : ''}`}>
      {/* Image Container */}
      <div className="relative aspect-3/4 w-full rounded-[16px] overflow-hidden bg-[#222]">
        {item.poster_path || item.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${isPerson ? item.profile_path : item.poster_path}`}
            alt={item.title || item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#1A1A1A]">
            {isPerson ? (
              <User className="w-12 h-12 text-gray-500 mb-2 opacity-50" />
            ) : null}
            <span className="text-white font-medium text-center opacity-80">{item.title || item.name}</span>
          </div>
        )}

        {/* Rating Badge (Only for Movies/TV) */}
        {!isPerson && item.vote_average > 0 && (
          <div className="absolute bottom-3 left-3 bg-[#1A1A1A] px-2 py-1 rounded-[6px] flex items-center gap-1.5 z-10">
            <Star className="w-3.5 h-3.5 fill-[#F2B01E] text-[#F2B01E]" />
            <span className="text-white text-[13px] font-bold">{parseFloat((item.vote_average / 2).toFixed(1))}</span>
          </div>
        )}

        {/* Heart Icon (Only for Movies/TV) */}
        {!isPerson && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 backdrop-blur-md p-1.5 rounded-full text-white transition-colors z-10"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-brand-red text-brand-red' : ''}`} />
          </button>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-0.5 px-0.5 mt-1">
        <h3 className="text-white font-bold text-[16px] truncate">{item.title || item.name}</h3>
        <div className="flex items-center text-[13px] text-gray-400 capitalize">
          <span>{item.media_type === 'tv' ? 'TV Series' : item.media_type}</span>

          {/* Show Year for Movie/TV, Known For Department for Person */}
          <span className="mx-1.5">•</span>
          <span className="truncate">
            {isPerson
              ? item.known_for_department
              : (item.release_date || item.first_air_date || '').split('-')[0] || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('All');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const tabs = ['All', 'Movies', 'TV Shows', 'People'];

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setLoading(true);
        try {
          const res = await searchMovies(searchQuery.trim());
          // Sort by popularity as a proxy for relevance
          const sortedResults = res.data.results.sort((a, b) => b.popularity - a.popularity);
          setResults(sortedResults);
          setSearched(true);

          // Update URL purely for shareability
          setSearchParams({ q: searchQuery.trim() }, { replace: true });
        } catch (error) {
          console.error("Error searching TMDB:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setSearched(false);
        setSearchParams({}, { replace: true });
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, setSearchParams]);

  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
    setSearched(false);
    setSearchParams({});
  };

  // Filter Results based on Active Tab
  const filteredResults = results.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Movies') return item.media_type === 'movie';
    if (activeTab === 'TV Shows') return item.media_type === 'tv';
    if (activeTab === 'People') return item.media_type === 'person';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#110C0C] text-white pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Search Header */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-[44px] font-bold mb-8 tracking-tight text-white">
            Find your next favorite story
          </h1>

          {/* Search Bar */}
          <div className="w-full max-w-[760px] relative flex items-center mb-8">
            <SearchIcon className="absolute left-6 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, tv shows, people..."
              className="w-full bg-[#1A1A1A] hover:bg-[#222] transition-colors rounded-full py-4 pl-14 pr-12 text-lg text-white placeholder-gray-500 outline-none border border-white/10 focus:border-white/30 shadow-lg"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute right-5 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer ${activeTab === tab
                  ? 'bg-[#F40612] text-white shadow-lg shadow-[#F40612]/20'
                  : 'bg-[#1A1A1A] text-gray-300 hover:bg-[#222] hover:text-white border border-white/5'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner / Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10 mb-16 mt-8">
            {[...Array(10)].map((_, i) => (
              <GridCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Search Results Summary */}
        {!loading && searched && (
          <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-8">
            <h2 className="text-2xl font-bold flex gap-2">
              Results for <span className="italic text-gray-200">"{searchQuery}"</span>
            </h2>
            <span className="text-gray-400 text-[15px] font-medium">Showing {filteredResults.length} matches</span>
          </div>
        )}

        {/* Empty State */}
        {!loading && searched && filteredResults.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchIcon className="w-16 h-16 text-white/10 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
            <p className="text-gray-400">We couldn't find anything matching "{searchQuery}" in {activeTab === 'All' ? 'any category' : activeTab}.</p>
          </div>
        )}

        {/* Initial Graphic before searching */}
        {!loading && !searched && searchQuery.trim() === '' && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ClapperboardGraphic />
            <h3 className="text-xl font-bold text-gray-300 mb-2 mt-6">Start Typing to Search</h3>
            <p className="text-gray-500 max-w-md">Discover thousands of movies, TV shows, and your favorite actors instantly in real-time.</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && filteredResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10 mb-16">
            {filteredResults.map((item) => (
              <SearchResultCard key={item.id} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

const ClapperboardGraphic = () => (
  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
    <SearchIcon className="w-10 h-10 text-brand-red opacity-80" />
  </div>
);

export default Search;
