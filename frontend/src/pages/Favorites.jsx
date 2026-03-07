import React from 'react';
import { Play, Filter, Plus, Star } from 'lucide-react';

const FavoriteCard = ({ movie }) => (
  <div className="flex flex-col gap-2 group cursor-pointer w-full">
    {/* Poster Image Container */}
    <div className="relative aspect-3/4 w-full rounded-[24px] overflow-hidden shadow-lg border border-white/5 transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:border-white/20 bg-white/5">
      <img
        src={movie.poster}
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
      <div className="flex items-center text-[13px] text-gray-400 font-medium">
        <span>{movie.genre}</span>
        <span className="mx-1.5">•</span>
        <span>{movie.year}</span>
      </div>
    </div>
  </div>
);

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
  const favoriteMovies = [
    { id: 1, title: 'Inception', rating: '8.8', genre: 'Sci-Fi', year: '2010', poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'Interstellar', rating: '8.6', genre: 'Drama', year: '2014', poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop' },
    { id: 3, title: 'The Godfather', rating: '9.0', genre: 'Crime', year: '1972', poster: 'https://images.unsplash.com/photo-1485001564903-56e6a54d46ce?q=80&w=2070&auto=format&fit=crop' },
    { id: 4, title: 'Blade Runner 2049', rating: '8.2', genre: 'Sci-Fi', year: '2017', poster: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1950&auto=format&fit=crop' },
    { id: 5, title: 'Pulp Fiction', rating: '8.9', genre: 'Crime', year: '1994', poster: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2070&auto=format&fit=crop' },
    { id: 6, title: 'Spirited Away', rating: '8.4', genre: 'Animation', year: '2001', poster: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop' },
    { id: 7, title: 'The Dark Knight', rating: '9.0', genre: 'Action', year: '2008', poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1928&auto=format&fit=crop' },
    { id: 8, title: 'Mad Max: Fury Road', rating: '8.1', genre: 'Action', year: '2015', poster: 'https://images.unsplash.com/photo-1533221971485-d62fcefeafcc?q=80&w=2070&auto=format&fit=crop' },
    { id: 9, title: 'Parasite', rating: '8.6', genre: 'Thriller', year: '2019', poster: 'https://images.unsplash.com/photo-1505506874110-6a7a6c9924c7?q=80&w=1974&auto=format&fit=crop' },
  ];

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
              Your curated collection of cinematic masterpieces. 12 movies saved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/20 text-sm">
              <Play className="w-4 h-4 fill-current" />
              Play Shuffle
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
              <Filter className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 mb-20">
          {favoriteMovies.map((movie) => (
            <FavoriteCard key={movie.id} movie={movie} />
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