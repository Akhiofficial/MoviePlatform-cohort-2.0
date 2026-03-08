import React, { useState, useEffect, useRef } from 'react';
import { Play, Heart, Star, Calendar, Clock, User } from 'lucide-react';
import ReactPlayer from 'react-player';
import MovieCard from '../components/MovieCard';
import { HeroSkeleton } from '../components/Loader';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../services/tmdb';
import { useUserActivity } from '../context/UserActivityContext';
import { useAuth, api } from '../context/AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const { isFavorite, toggleFavorite, addToHistory, history } = useUserActivity();
  const { user } = useAuth();
  const playerRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchProgress, setWatchProgress] = useState({ currentTime: 0, duration: 0 });
  const [lastSyncTime, setLastSyncTime] = useState(0);

  // We need to pass the ID properly to check if it's favorited. TMDB ID is technically a number, but useParams is a string. Check conversion later if needed.
  const isFav = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      try {
        const isLocal = isNaN(id) && id.length === 24; // MongoDB ObjectIds are 24-char hex strings

        if (isLocal) {
          // Fetch from local backend
          const res = await api.get(`/movies/${id}`);
          const data = res.data.movie;

          const extractYoutubeId = (url) => {
            if (!url) return null;
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[7].length === 11) ? match[7] : null;
          };

          const formattedMovie = {
            id: data._id,
            media_type: data.category ? data.category.toLowerCase() : 'movie',
            title: data.title,
            rating: 'N/A',
            stars: '0.0',
            year: data.releaseDate ? new Date(data.releaseDate).getFullYear() : 'Unknown',
            duration: data.duration ? `${Math.floor(data.duration / 60)}h ${data.duration % 60}m` : 'N/A',
            director: data.director || 'Unknown',
            budget: data.budget !== 'Unknown' && data.budget ? `$${data.budget}` : 'Unknown',
            revenue: data.revenue !== 'Unknown' && data.revenue ? `$${data.revenue}` : 'Unknown',
            genres: [data.genre].filter(Boolean) || [],
            backdrop: data.poster,
            poster: data.poster,
            synopsis: data.description || 'No synopsis available.',
            cast: [],
            trailerKey: extractYoutubeId(data.trailer),
            trailerPreview: data.poster,
          };

          setMovie(formattedMovie);
          addToHistory(formattedMovie);
          setSimilarMovies([]); // Empty or fetch generic similar local movies
        } else {
          // Fetch from TMDB
          const [detailsRes, similarRes] = await Promise.all([
            getMovieDetails(id),
            getSimilarMovies(id)
          ]);

          const data = detailsRes.data;

          const trailerVideo = data.videos?.results?.find(vid => vid.site === 'YouTube' && vid.type === 'Trailer') ||
            data.videos?.results?.find(vid => vid.site === 'YouTube');

          const directorInfo = data.credits?.crew?.find(person => person.job === 'Director');

          const formattedMovie = {
            id: data.id,
            media_type: data.title ? 'movie' : 'tv',
            title: data.title || data.name,
            rating: data.vote_average ? `${data.vote_average.toFixed(1)}/10 IMDb` : 'N/A',
            stars: data.vote_average ? (data.vote_average / 2).toFixed(1) : '0.0',
            year: (data.release_date || data.first_air_date || '').split('-')[0] || 'Unknown',
            duration: data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : 'N/A',
            director: directorInfo ? directorInfo.name : 'Unknown',
            budget: data.budget ? `$${(data.budget / 1000000).toFixed(1)} Million` : 'Unknown',
            revenue: data.revenue ? `$${(data.revenue / 1000000).toFixed(1)} Million` : 'Unknown',
            genres: data.genres?.map(g => g.name) || [],
            backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
            poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
            synopsis: data.overview || 'No synopsis available.',
            cast: data.credits?.cast?.slice(0, 6).map(actor => ({
              id: actor.id,
              name: actor.name,
              role: actor.character,
              image: actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'
            })) || [],
            trailerKey: trailerVideo ? trailerVideo.key : null,
            trailerPreview: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
          };

          setMovie(formattedMovie);
          addToHistory(formattedMovie);

          const similar = similarRes.data.results.map(item => ({
            id: item.id,
            title: item.title,
            rating: item.vote_average ? parseFloat((item.vote_average / 2).toFixed(1)) : 'N/A',
            year: (item.release_date || '').split('-')[0],
            poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
          })).slice(0, 10);

          setSimilarMovies(similar);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
      setIsVideoPlaying(false);
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#110C0C]">
        <HeroSkeleton />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#110C0C] flex items-center justify-center text-white">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#110C0C] text-white">
      {/* Hero Backdrop Setup */}
      <div className="relative w-full h-[60vh] md:h-[99vh]">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt="Backdrop"
            className="w-full h-full object-cover opacity-60"
            style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)' }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#110C0C] via-transparent to-transparent"></div>
        </div>

        <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-end pb-12 gap-8 md:gap-12 pt-32 cursor-default">
          {/* Poster */}
          <div className="w-48 md:w-64 lg:w-72 shrink-0 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl relative z-10 hidden md:block aspect-2/3">
            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          {/* Meta Info */}
          <div className="flex-1 space-y-4 md:space-y-6 max-w-3xl relative z-10 w-full mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-brand-red text-white text-xs font-bold px-2.5 py-1 rounded-[4px] bg-opacity-90 tracking-wide uppercase">Featured</span>
              <div className="flex items-center gap-1.5 text-yellow-500 bg-black/40 px-2 py-1 rounded-[4px] backdrop-blur-sm border border-white/5">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-gray-200 text-sm font-semibold">{movie.stars}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none drop-shadow-md">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 font-medium pb-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-red" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-red" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-red" />
                <span>{movie.director}</span>
              </div>
            </div>

            {/* Genre Pills */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(genre => (
                <span key={genre} className="px-4 py-1.5 rounded-full border border-brand-red/50 text-brand-red text-xs font-bold uppercase tracking-wide bg-brand-red/10">
                  {genre}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={() => {
                  if (movie.trailerKey) {
                    setIsVideoPlaying(true);
                    addToHistory(movie);
                  }
                }}
                className={`flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto ${movie.trailerKey ? 'bg-brand-red hover:bg-[#F40612] text-white shadow-brand-red/20 cursor-pointer' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
              >
                <Play className="w-5 h-5 fill-current" />
                Watch Trailer
              </button>
              <button
                onClick={() => {
                  if (!user) return;
                  toggleFavorite(movie)
                }}
                className={`flex items-center justify-center gap-2 border border-white/10 backdrop-blur-md px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto cursor-pointer ${isFav ? 'bg-brand-red/20 text-brand-red hover:bg-brand-red/30 border-brand-red/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-brand-red' : ''}`} />
                {isFav ? 'Added to Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Poster on Mobile */}
      <div className="px-6 -mt-32 mb-10 w-48 mx-auto shadow-2xl rounded-2xl overflow-hidden border-2 border-white/10 relative z-20 md:hidden aspect-2/3 bg-black">
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
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
              {movie.synopsis}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brand-red rounded-full"></div>
              <h3 className="text-xl md:text-2xl font-bold">Info</h3>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-500 font-medium text-sm">Director</span>
              <span className="text-white font-semibold text-sm">{movie.director}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-500 font-medium text-sm">Budget</span>
              <span className="text-white font-semibold text-sm">{movie.budget}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500 font-medium text-sm">Revenue</span>
              <span className="text-white font-semibold text-sm">{movie.revenue}</span>
            </div>
          </div>
        </div>

        {/* Main Cast */}
        {movie.cast && movie.cast.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Main Cast</h3>
            <div className="flex gap-6 md:gap-10 overflow-x-auto pb-4 no-scrollbar">
              {movie.cast.map(person => (
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
        )}

        {/* Video Spotlight */}
        {movie.trailerKey && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Video Spotlight</h3>
            <div className="relative w-full aspect-video rounded-[24px] overflow-hidden group border border-white/10 shadow-2xl bg-black">
              {!isVideoPlaying ? (
                <div
                  className="w-full h-full cursor-pointer relative"
                  onClick={() => {
                    setIsVideoPlaying(true);
                    setIsPlaying(true);
                    addToHistory(movie);
                  }}
                >
                  <img src={movie.trailerPreview} alt="Trailer preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(229,9,20,0.6)]">
                      <Play className="w-8 h-8 fill-current text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-black via-black/80 to-transparent">
                    <h4 className="text-white font-bold text-xl md:text-2xl">Official Trailer</h4>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <ReactPlayer
                    ref={playerRef}
                    src={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0"
                    playing={isPlaying}
                    controls={true}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onReady={() => {
                      try {
                        const savedHistory = history.find(h => h.movieId === (movie.id?.toString() || id));
                        if (savedHistory && savedHistory.currentTime > 0 && playerRef.current) {
                          playerRef.current.seekTo(savedHistory.currentTime, 'seconds');
                        }
                      } catch (err) {
                        console.error("Seeking error:", err);
                      }
                    }}
                    onError={(e) => console.error("ReactPlayer Error:", e)}
                    onTimeUpdate={(e) => {
                      const currentTime = Math.floor(e.target.currentTime);
                      setWatchProgress(prev => ({ ...prev, currentTime }));

                      if (currentTime - lastSyncTime >= 10) {
                        addToHistory(movie, { currentTime, duration: watchProgress.duration });
                        setLastSyncTime(currentTime);
                      }
                    }}
                    onDurationChange={(e) => {
                      setWatchProgress(prev => ({ ...prev, duration: Math.floor(e.target.duration) }));
                    }}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 0, rel: 0, modestbranding: 1 }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* You May Also Like */}
        {similarMovies.length > 0 && (
          <div className="space-y-6 pt-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">You May Also Like</h3>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x">
              {similarMovies.map(movie => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="snap-start block shrink-0">
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MovieDetails;