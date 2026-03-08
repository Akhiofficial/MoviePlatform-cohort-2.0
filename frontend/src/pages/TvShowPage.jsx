import React, { useState, useEffect } from 'react';
import { Play, Filter, Star, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getDiscoverTvShows } from '../services/tmdb';
import { GridCardSkeleton } from '../components/Loader';
import { useFavorites } from '../context/FavoritesContext';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const FavoriteMovieCard = ({ movie }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(movie.id);
    const navigate = useNavigate();

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
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

const TvShowPage = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreShows = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    const loaderRef = useInfiniteScroll(loadMoreShows, hasMore);

    useEffect(() => {
        const fetchShows = async () => {
            if (page === 1) setLoading(true);
            try {
                const response = await getDiscoverTvShows(page);
                const formattedShows = response.data.results.map(item => ({
                    id: item.id,
                    title: item.name || item.original_name, // TV Shows use 'name' instead of 'title'
                    rating: item.vote_average ? parseFloat((item.vote_average / 2).toFixed(1)) : 'N/A',
                    genre: 'TV Series',
                    year: (item.first_air_date || '').split('-')[0],
                    poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
                    media_type: 'tv' // useful for consistency
                }));

                setShows(prev => page === 1 ? formattedShows : [...prev, ...formattedShows]);

                if (formattedShows.length === 0 || page >= response.data.total_pages) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching TV shows:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchShows();
        if (page === 1) window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="min-h-screen bg-[#110C0C] text-white pt-[100px] pb-24">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-4">
                    <div>
                        <h1 className="text-4xl md:text-[44px] font-bold mb-3 tracking-tight text-white">
                            TV Shows
                        </h1>
                        <p className="text-[#AAAAAA] text-[16px] font-medium max-w-lg leading-relaxed">
                            Binge-worthy series and trending episodic content. {shows.length} shows loaded.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-[#F40612] hover:bg-red-700 text-white px-6 py-2.5 rounded-[4px] font-bold transition-transform hover:scale-105 active:scale-95 text-sm cursor-pointer">
                            <Play className="w-4 h-4 fill-current" />
                            Play Shuffle
                        </button>
                        <button className="flex items-center justify-center w-[42px] h-[42px] bg-transparent hover:bg-white/5 rounded-[4px] border border-white/20 transition-colors cursor-pointer">
                            <Filter className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                {/* Shows Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-10">
                    {shows.map((show, index) => (
                        <FavoriteMovieCard key={`${show.id}-${index}`} movie={show} />
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

                {!hasMore && shows.length > 0 && (
                    <div className="w-full text-center py-12 text-gray-500 font-medium">
                        You've reached the end of the collection.
                    </div>
                )}

            </div>
        </div>
    );
};

export default TvShowPage;
