import React from 'react';
import { Heart, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserActivity } from '../context/UserActivityContext';
import { useAuth } from '../context/AuthContext';

const MovieCard = ({ movie }) => {
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
        <div onClick={handleCardClick} className="flex flex-col gap-3 group w-[220px] min-w-[220px] sm:w-[260px] sm:min-w-[260px] cursor-pointer">
            {/* Poster Image Container */}
            <div className="relative aspect-2/3 w-full rounded-2xl overflow-hidden shadow-lg border border-white/5 transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:border-white/20">
                <img
                    src={movie?.poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"}
                    alt={movie?.title || "Movie Poster"}
                    className="w-full h-full object-cover"
                />

                {/* Heart Icon */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 backdrop-blur-md p-2 rounded-full text-white transition-colors z-10"
                >
                    <Heart className={`w-5 h-5 ${isFav ? 'fill-brand-red text-brand-red' : ''}`} />
                </button>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1 px-1">
                <h3 className="text-white font-bold text-lg truncate">{movie?.title || "Movie Title"}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400 font-medium tracking-wide">
                    <div className="flex items-center gap-1.5 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-gray-300">{movie?.rating || "0.0"}</span>
                    </div>
                    <span>{movie?.year || "2024"}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;