import React, { useState, useEffect } from 'react';
import { Play, Filter, Plus, Star, Shuffle, SortAsc, SortDesc } from 'lucide-react';
import { useUserActivity } from '../context/UserActivityContext';

import { useNavigate } from 'react-router-dom';

const FavoriteCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.movieId}`)}
      className="flex flex-col gap-2 group cursor-pointer w-full"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-3/4 w-full rounded-[24px] overflow-hidden shadow-lg border border-white/5 transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:border-white/20 bg-white/5">
        <img
          src={movie.poster || movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Rating Badge - Custom position for Favorites design */}
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
          <span className="text-white text-[13px] font-bold tracking-wide">{movie.rating}</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 px-1 mt-1">
        <h3 className="text-white font-bold text-[17px] leading-tight group-hover:text-brand-red transition-colors">{movie.title}</h3>
        <div className="flex items-center text-[13px] text-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          <span>{movie.genre || (movie.media_type === 'tv' ? 'TV Series' : 'Movie')}</span>
          <span className="mx-1.5">•</span>
          <span>{movie.year}</span>
        </div>
      </div>
    </div>
  );
};

const AddNewCard = () => (
  <div className="flex flex-col gap-2 group cursor-pointer w-full h-full min-h-[300px]">
    <div className="relative w-full h-full rounded-[24px] border-2 border-dashed border-white/10 hover:border-brand-red/50 hover:bg-white/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 aspect-3/4">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-red transition-colors group-hover:scale-110 duration-300">
        <Plus className="w-6 h-6 text-white" />
      </div>
      <span className="text-gray-400 font-bold group-hover:text-white transition-colors">Add New</span>
    </div>
  </div>
);

const Favorites = () => {
  const { favorites } = useUserActivity();
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'

  useEffect(() => {
    setItems(favorites);
  }, [favorites]);

  const handleShuffle = () => {
    if (items.length > 0) {
      const shuffled = [...items].sort(() => Math.random() - 0.5);
      setItems(shuffled);
      setSortOrder('none');
    }
  };

  const handleSort = () => {
    const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...items].sort((a, b) => {
      if (nextOrder === 'asc') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });
    setItems(sorted);
    setSortOrder(nextOrder);
  };

  return (
    <div className="min-h-screen bg-[#141010] text-white pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* Breadcrumb Info */}
        <div className="text-brand-red text-xs font-bold tracking-widest mb-4 uppercase">
          LIBRARY <span className="text-gray-600 mx-2">{'>'}</span> FAVORITES
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-[48px] font-bold mb-3 tracking-tight">
              My Favorites
            </h1>
            <p className="text-gray-400 text-[17px] font-medium max-w-lg leading-relaxed">
              Your curated collection of cinematic masterpieces. {favorites.length} items saved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/20 text-sm"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle Collections
            </button>
            <button
              onClick={handleSort}
              className={`flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors ${sortOrder !== 'none' ? 'text-brand-red border-brand-red/50' : 'text-white'}`}
              title={sortOrder === 'asc' ? 'Sort Z-A' : 'Sort A-Z'}
            >
              {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : sortOrder === 'desc' ? <SortDesc className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 mb-20">
          {items.map((movie) => (
            <FavoriteCard key={movie.movieId} movie={movie} />
          ))}
          {/* Static Add New Card at the end */}
          <AddNewCard />
        </div>

        {/* Build a Collection Banner */}
        <div className="bg-[#1C1717] rounded-[24px] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="space-y-3 relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold">Build a Collection</h3>
            <p className="text-gray-400 font-medium text-base">
              Share your favorite movies with friends or create public playlists for the CinemaCloud community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto">
            <button className="w-full sm:w-auto bg-transparent border-2 border-white/10 hover:border-white/30 hover:bg-white/5 text-white px-8 py-3.5 rounded-full font-bold transition-all text-sm">
              Create Playlist
            </button>
            <button className="w-full sm:w-auto bg-brand-red hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/20 text-sm">
              Share Favorites
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Favorites;