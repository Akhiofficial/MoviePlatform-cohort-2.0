import React, { useState, useEffect } from 'react';
import { Play, Filter, Clock, Shuffle, SortAsc, SortDesc } from 'lucide-react';
import { useUserActivity } from '../context/UserActivityContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HistoryCard = ({ movie }) => {
    const navigate = useNavigate();
    // Force at least 15% width if watched at all, to ensure visibility on small cards
    const progressPercent = movie.currentTime && (movie.duration || 180)
        ? Math.max(15, Math.min((movie.currentTime / (movie.duration || 180)) * 100, 100))
        : 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/movie/${movie.movieId}`)}
            className="flex flex-col gap-2 group cursor-pointer w-full"
        >
            <div className="relative aspect-3/4 w-full rounded-[24px] overflow-hidden shadow-lg border border-gray-200 dark:border-white/5 transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:border-white/20 bg-gray-100 dark:bg-white/5">
                <img
                    src={movie.poster || movie.backdrop}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />

                {/* Ultra Prominent Progress Bar (Netflix Style) */}
                {movie.currentTime > 0 && (
                    <div className="absolute bottom-2 left-2 right-2 h-2.5 bg-gray-300 dark:bg-white/10 rounded-full overflow-hidden z-40 backdrop-blur-sm border border-gray-200 dark:border-white/5">
                        <div
                            className="h-full bg-brand-red shadow-[0_0_15px_rgba(229,9,20,1)] transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-red/90 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-white ml-1 fill-current" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 px-1 mt-1">
                <h3 className="text-gray-900 dark:text-white font-bold text-[17px] leading-tight group-hover:text-brand-red transition-colors">{movie.title}</h3>
                <div className="flex items-center text-[13px] text-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    <span>Watched Recently</span>
                </div>
            </div>
        </motion.div>
    );
};

const History = () => {
    const { history } = useUserActivity();
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'

    useEffect(() => {
        setItems(history);
    }, [history]);

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-white dark:bg-[#141010] text-gray-900 dark:text-white pt-32 pb-24 transition-colors duration-300"
        >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="text-brand-red text-xs font-bold tracking-widest mb-4 uppercase">
                    ACTIVITY <span className="text-gray-600 mx-2">{'>'}</span> WATCH HISTORY
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-[48px] font-bold mb-3 tracking-tight text-gray-900 dark:text-white">
                            Watch History
                        </h1>
                        <p className="text-gray-400 text-[17px] font-medium max-w-lg leading-relaxed">
                            Movies and TV shows you've recently viewed. {history.length} items.
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
                            className={`flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 transition-colors ${sortOrder !== 'none' ? 'text-brand-red border-brand-red/50' : 'text-gray-900 dark:text-white'}`}
                            title={sortOrder === 'asc' ? 'Sort Z-A' : 'Sort A-Z'}
                        >
                            {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : sortOrder === 'desc' ? <SortDesc className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {history.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 mb-20">
                        {items.map((movie) => (
                            <HistoryCard key={movie.movieId} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-gray-200 dark:border-white/5 rounded-3xl bg-gray-50 dark:bg-white/5">
                        <Clock className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Watch History</h2>
                        <p className="text-gray-400 font-medium max-w-md mx-auto">
                            Explore the catalog and view movies. Your activity will magically appear right here!
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default History;
