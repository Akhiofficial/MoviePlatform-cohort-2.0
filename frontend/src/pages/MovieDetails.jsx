import React, { useState } from 'react';
import { Play, Heart, Star, Calendar, Clock, User } from 'lucide-react';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Dummy Data to match design
  const movieInfo = {
    title: 'Interstellar',
    rating: '8.7/10 IMDb',
    year: '2014',
    duration: '2h 49m',
    director: 'Christopher Nolan',
    budget: '$165 Million',
    revenue: '$701.8 Million',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
    synopsis: 'With our time on Earth coming to an end, a team of explorers undertakes the most important mission in human history; traveling beyond this galaxy to discover whether mankind has a future among the stars. As Earth faces a global famine, a group of astronauts must find a new habitable planet.',
    cast: [
      { id: 1, name: 'M. McConaughey', role: 'Cooper', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop' },
      { id: 2, name: 'Anne Hathaway', role: 'Brand', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop' },
      { id: 3, name: 'Jessica Chastain', role: 'Murph', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop' },
      { id: 4, name: 'Michael Caine', role: 'Professor Brand', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop' },
    ],
    trailerPreview: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1'
  };

  const recommendedMovies = [
    { id: 1, title: 'Inception', rating: '4.8', year: '2010', genre: 'Sci-Fi', poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'The Martian', rating: '4.7', year: '2015', genre: 'Adventure', poster: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, title: 'Blade Runner 2049', rating: '4.6', year: '2017', genre: 'Sci-Fi', poster: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1950&auto=format&fit=crop' },
    { id: 4, title: 'Gravity', rating: '4.5', year: '2013', genre: 'Thriller', poster: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, title: 'Arrival', rating: '4.6', year: '2016', genre: 'Drama', poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1928&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* Hero Backdrop Setup */}
      <div className="relative w-full h-[60vh] md:h-[99vh]">
        <div className="absolute inset-0">
          <img
            src={movieInfo.backdrop}
            alt="Backdrop"
            className="w-full h-full object-cover opacity-60"
            style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)' }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-transparent to-transparent"></div>
        </div>

        <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-end pb-12 gap-8 md:gap-12 pt-32">
          {/* Poster */}
          <div className="w-48 md:w-64 lg:w-72 shrink-0 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl relative z-10 hidden md:block aspect-2/3">
            <img src={movieInfo.poster} alt={movieInfo.title} className="w-full h-full object-cover" />
          </div>

          {/* Meta Info */}
          <div className="flex-1 space-y-4 md:space-y-6 max-w-3xl relative z-10 w-full mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded bg-opacity-90 tracking-wide uppercase">Featured</span>
              <div className="flex items-center gap-1.5 text-yellow-500 bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-gray-200 text-sm font-semibold">{movieInfo.rating}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none drop-shadow-md">
              {movieInfo.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 font-medium pb-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-red" />
                <span>{movieInfo.year}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-red" />
                <span>{movieInfo.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-red" />
                <span>{movieInfo.director}</span>
              </div>
            </div>

            {/* Genre Pills */}
            <div className="flex flex-wrap gap-2">
              {movieInfo.genres.map(genre => (
                <span key={genre} className="px-4 py-1.5 rounded-full border border-brand-red/50 text-brand-red text-xs font-bold uppercase tracking-wide bg-brand-red/10">
                  {genre}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 bg-brand-red hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-red/20 w-full md:w-auto">
                <Play className="w-5 h-5 fill-current" />
                Watch Trailer
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 w-full md:w-auto">
                <Heart className="w-5 h-5" />
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Poster on Mobile */}
      <div className="px-6 -mt-32 mb-10 w-48 mx-auto shadow-2xl rounded-2xl overflow-hidden border-2 border-white/10 relative z-20 md:hidden aspect-2/3 bg-black">
        <img src={movieInfo.poster} alt={movieInfo.title} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-16 pb-20">
        {/* Synopsis and Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 border-t border-white/10 pt-12 md:pt-16">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-brand-red rounded-full"></div>
              <h3 className="text-xl md:text-2xl font-bold">Synopsis</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-base md:text-lg">
              {movieInfo.synopsis}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brand-red rounded-full"></div>
              <h3 className="text-xl md:text-2xl font-bold">Info</h3>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-500 font-medium text-sm">Director</span>
              <span className="text-white font-semibold text-sm">{movieInfo.director}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-500 font-medium text-sm">Budget</span>
              <span className="text-white font-semibold text-sm">{movieInfo.budget}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500 font-medium text-sm">Revenue</span>
              <span className="text-white font-semibold text-sm">{movieInfo.revenue}</span>
            </div>
          </div>
        </div>

        {/* Main Cast */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Main Cast</h3>
          <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 no-scrollbar">
            {movieInfo.cast.map(person => (
              <div key={person.id} className="flex flex-col items-center gap-3 min-w-[100px]">
                <img src={person.image} alt={person.name} className="w-24 h-24 rounded-full object-cover border-2 border-brand-red/20 shadow-lg p-1" />
                <div className="text-center">
                  <h4 className="text-white font-bold text-sm leading-tight">{person.name}</h4>
                  <p className="text-gray-500 text-xs mt-1">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Spotlight */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Video Spotlight</h3>
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden group border border-white/10 shadow-2xl bg-black">
            {!isVideoPlaying ? (
              <div className="w-full h-full cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                <img src={movieInfo.trailerPreview} alt="Trailer preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(229,9,20,0.6)]">
                    <Play className="w-8 h-8 fill-current text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-black via-black/80 to-transparent">
                  <h4 className="text-white font-bold text-xl md:text-2xl">Official Trailer #1</h4>
                  <p className="text-gray-400 text-sm mt-1">2:34 • HD • English</p>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src={movieInfo.trailerUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        <div className="space-y-6 pt-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">You May Also Like</h3>
            <button className="text-brand-red text-sm font-bold hover:text-red-400 transition-colors">View All</button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x">
            {recommendedMovies.map(movie => (
              <div key={movie.id} className="snap-start">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;