import React, { useState, useEffect } from 'react';
import { Play, Filter, Star, Heart, Shuffle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getDiscoverMovies, getGenres } from '../services/tmdb';
import { GridCardSkeleton } from '../components/Loader';
import { useUserActivity } from '../context/UserActivityContext';
import { useAuth } from '../context/AuthContext';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const FavoriteMovieCard = ({ movie }) => {
    const { isFavorite, toggleFavorite } = useUserActivity();
    const { user } = useAuth();
    const isFav = isFavorite(movie.id);
    const navigate = useNavigate();

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            navigate('/login');
            return;
        }
        toggleFavorite(movie);
    };

    const handleCardClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div onClick={handleCardClick} className="flex flex-col gap-2 group cursor-pointer w-full">
            {/* Poster Image Container */}
            <div className="relative aspect-3/4 w-full rounded-[16px] overflow-hidden bg-[#222]">
                {movie.poster ? (
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4">
                        <span className="text-white font-medium text-center opacity-80">{movie.title}</span>
                    </div>
                )}

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 bg-[#1A1A1A] px-2 py-1 rounded-[6px] flex items-center gap-1.5 z-10">
                    <Star className="w-3.5 h-3.5 fill-[#F2B01E] text-[#F2B01E]" />
                    <span className="text-white text-[13px] font-bold">{movie.rating}</span>
                </div>

                {/* Heart Icon */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 backdrop-blur-md p-1.5 rounded-full text-white transition-colors z-10"
                >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-brand-red text-brand-red' : ''}`} />
                </button>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-0.5 px-0.5 mt-1">
                <h3 className="text-white font-bold text-[16px] truncate">{movie.title}</h3>
                <div className="flex items-center text-[13px] text-gray-400">
                    <span>{movie.genre}</span>
                    <span className="mx-1.5">•</span>
                    <span>{movie.year}</span>
                </div>
            </div>
        </div>
    );
};

const MoviePage = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreMovies = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    const loaderRef = useInfiniteScroll(loadMoreMovies, hasMore);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await getGenres('movie');
                setGenres(response.data.genres || []);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            if (page === 1) setLoading(true);
            try {
                const response = await getDiscoverMovies(page, selectedGenre);
                const formattedMovies = response.data.results.map(item => ({
                    id: item.id,
                    title: item.title,
                    rating: item.vote_average ? parseFloat((item.vote_average / 2).toFixed(1)) : 'N/A',
                    genre: 'Movie',
                    year: (item.release_date || '').split('-')[0],
                    poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
                    media_type: 'movie' // useful for consistency
                }));

                setMovies(prev => page === 1 ? formattedMovies : [...prev, ...formattedMovies]);

                if (formattedMovies.length === 0 || page >= response.data.total_pages) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
        if (page === 1) window.scrollTo(0, 0);
    }, [page, selectedGenre]);

    const handleGenreSelect = (genreId) => {
        setSelectedGenre(genreId);
        setPage(1);
        setMovies([]);
        setHasMore(true);
    };

    const handleShuffle = () => {
        if (movies.length > 0) {
            const shuffled = [...movies].sort(() => Math.random() - 0.5);
            setMovies(shuffled);
        }
    };

    return (
        <div className="min-h-screen bg-[#110C0C] text-white pt-[100px] pb-24">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-4">
                    <div>
                        <h1 className="text-4xl md:text-[44px] font-bold mb-3 tracking-tight text-white">
                            Movies
                        </h1>
                        <p className="text-[#AAAAAA] text-[16px] font-medium max-w-lg leading-relaxed">
                            Explore our vast collection of cinematic masterpieces. {movies.length} movies loaded.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleShuffle}
                            className="flex items-center gap-2 bg-[#F40612] hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 text-sm cursor-pointer"
                        >
                            <Shuffle className="w-4 h-4" />
                            Shuffle Collections
                        </button>
                    </div>
                </div>

                {/* Genre Bar */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-6 -mx-6 px-6 lg:-mx-12 lg:px-12">
                    <button
                        onClick={() => handleGenreSelect('')}
                        className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${selectedGenre === '' ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
                    >
                        All
                    </button>
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => handleGenreSelect(genre.id)}
                            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${selectedGenre === genre.id ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>

                {/* Favorites Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
                    {movies.map((movie, index) => (
                        <FavoriteMovieCard key={`${movie.id}-${index}`} movie={movie} />
                    ))}

                    {/* First page loader */}
                    {loading && page === 1 && [...Array(10)].map((_, i) => (
                        <GridCardSkeleton key={i} />
                    ))}
                </div>

                {/* Infinite Scroll trigger */}
                {hasMore && (
                    <div ref={loaderRef} className="w-full h-32 flex items-center justify-center mt-8">
                        {loading && page > 1 && (
                            <div className="w-8 h-8 border-4 border-[#F40612]/30 border-t-[#F40612] rounded-full animate-spin"></div>
                        )}
                    </div>
                )}

                {!hasMore && movies.length > 0 && (
                    <div className="w-full text-center py-12 text-gray-500 font-medium">
                        You've reached the end of the collection.
                    </div>
                )}

            </div>
        </div>
    );
};

export default MoviePage;