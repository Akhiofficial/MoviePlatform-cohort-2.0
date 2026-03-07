import React from 'react';
import { Play, Info, TrendingUp } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

const Home = () => {
    // Dummy data representing the design
    const trendingMovies = [
        { id: 1, title: 'The Dark Knight', rating: '4.9', year: '2008', poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1928&auto=format&fit=crop' },
        { id: 2, title: 'Inception', rating: '4.8', year: '2010', poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, title: 'Dune: Part Two', rating: '4.7', year: '2024', poster: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1950&auto=format&fit=crop' },
        { id: 4, title: 'The Matrix', rating: '4.8', year: '1999', poster: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop' },
        { id: 5, title: 'Interstellar', rating: '4.8', year: '2014', poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' },
    ];

    const popularMovies = [
        { id: 6, title: 'John Wick', rating: '4.6', year: '2014', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop' },
        { id: 7, title: 'Blade Runner 2049', rating: '4.6', year: '2017', poster: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop' },
        { id: 8, title: 'Gladiator', rating: '4.8', year: '2000', poster: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2070&auto=format&fit=crop' },
        { id: 9, title: 'Avatar', rating: '4.7', year: '2009', poster: 'https://images.unsplash.com/photo-1618519764620-7403abdbdf9c?q=80&w=2070&auto=format&fit=crop' },
    ];

    const topRatedTvShows = [
        { id: 10, title: 'Breaking Bad', rating: '9.5', year: '2008', poster: 'https://images.unsplash.com/photo-1533221971485-d62fcefeafcc?q=80&w=2070&auto=format&fit=crop' },
        { id: 11, title: 'House of the Dragon', rating: '8.4', year: '2022', poster: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=2050&auto=format&fit=crop' },
        { id: 12, title: 'Dark', rating: '8.7', year: '2017', poster: 'https://images.unsplash.com/photo-1505506874110-6a7a6c9924c7?q=80&w=1974&auto=format&fit=crop' },
        { id: 13, title: 'Stranger Things', rating: '8.7', year: '2016', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop' },
    ];

    return (
        <div className="min-h-screen bg-bg-dark text-white pb-20">
            {/* Hero Section */}
            <div className="relative w-full h-[85vh] md:h-[95vh]">
                {/* Background Image & Gradient overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                        alt="Interstellar Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-bg-dark via-bg-dark/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-bg-dark/20 to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-center pt-20">
                    <div className="max-w-2xl space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded bg-opacity-90">TRENDING #1</span>
                            <span className="text-gray-300 font-medium text-sm drop-shadow-md">2h 49m • Sci-Fi • 2014</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter shadow-sm text-white drop-shadow-2xl">
                            INTERSTELLAR
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-xl drop-shadow-lg">
                            A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth faces a global collapse.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <button className="flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-red/30">
                                <Play className="w-5 h-5 fill-current" />
                                Play Trailer
                            </button>
                            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                                <Info className="w-5 h-5" />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" mx-auto px-6 lg:px-12 -mt-32 relative z-10 space-y-16">

                {/* Trending Now */}
                <section>
                    <div className="flex items-center justify-between mb-2 mt-30">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-brand-red" />
                            Trending Now
                        </h2>
                        <Link to="/movies" className="text-brand-red hover:text-red-400 font-semibold text-sm transition-colors">
                            View All
                        </Link>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x">
                        {trendingMovies.map((movie) => (
                            <div key={movie.id} className="snap-start">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Movies */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold">Popular Movies</h2>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x">
                        {popularMovies.map((movie) => (
                            <div key={movie.id} className="snap-start">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Top Rated TV Shows */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold">Top Rated TV Shows</h2>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x">
                        {topRatedTvShows.map((movie) => (
                            <div key={movie.id} className="snap-start">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Home;