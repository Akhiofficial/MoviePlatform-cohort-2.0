import React, { useState } from 'react';
import { Search as SearchIcon, X, Star } from 'lucide-react';

const SearchResultCard = ({ movie }) => (
  <div className="flex flex-col gap-3 group cursor-pointer w-full">
    {/* Poster Image Container */}
    <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden shadow-lg border border-white/5 transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:border-white/20 bg-white/5">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      {/* Rating Badge */}
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2 py-1 rounded flex items-center gap-1.5 border border-white/10">
        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
        <span className="text-white text-xs font-bold">{movie.rating}</span>
      </div>
    </div>

    {/* Details */}
    <div className="flex flex-col gap-1 px-1">
      <h3 className="text-white font-bold text-[17px] leading-tight group-hover:text-brand-red transition-colors">{movie.title}</h3>
      <div className="flex items-center text-sm text-gray-400 font-medium">
        <span>{movie.year}</span>
        <span className="mx-1.5">•</span>
        <span>{movie.genre}</span>
      </div>
    </div>
  </div>
);

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('Batman');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Movies', 'TV Shows', 'People'];

  const searchResults = [
    { id: 1, title: 'The Batman', rating: '8.5', year: '2022', genre: 'Action, Drama', poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'The Dark Knight', rating: '9.0', year: '2008', genre: 'Crime, Thriller', poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1928&auto=format&fit=crop' },
    { id: 3, title: 'Batman Begins', rating: '7.8', year: '2005', genre: 'Action, Adventure', poster: 'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?q=80&w=2070&auto=format&fit=crop' },
    { id: 4, title: 'Batman: The Series', rating: '7.0', year: '1992', genre: 'Animation, Crime', poster: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, title: 'Batman Returns', rating: '7.5', year: '1992', genre: 'Action, Fantasy', poster: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-[#141010] text-white pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Search Header */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl md:text-[44px] font-bold mb-8 tracking-tight">
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
              className="w-full bg-[#2A2323] hover:bg-[#342A2A] transition-colors rounded-full py-4 pl-14 pr-12 text-lg text-white placeholder-gray-500 outline-none border border-transparent focus:border-white/20 shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
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
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${activeTab === tab
                  ? 'bg-brand-red text-white shadow-md shadow-brand-red/20'
                  : 'bg-[#2A2323] text-gray-300 hover:bg-[#342A2A] hover:text-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-8">
          <h2 className="text-2xl font-bold flex gap-2">
            Results for <span className="italic text-gray-200">"{searchQuery}"</span>
          </h2>
          <span className="text-gray-400 text-sm font-medium">Showing {searchResults.length * 16 + 4} titles</span>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 mb-16">
          {searchResults.map((movie) => (
            <SearchResultCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="bg-[#2A2323] hover:bg-[#342A2A] text-white px-8 py-3.5 rounded-full font-bold transition-colors border border-white/5 hover:border-white/10 shadow-lg">
            View More Results
          </button>
        </div>

      </div>
    </div>
  );
};

export default Search;