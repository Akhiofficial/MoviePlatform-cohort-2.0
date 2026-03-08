import React, { useState, useEffect } from 'react';
import { Play, Info, TrendingUp } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { HeroSkeleton, MovieCardSkeleton } from '../components/Loader';
import { Link } from 'react-router-dom';
import { getTrending, getPopular, getTopRatedTv } from '../services/tmdb';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { api } from '../context/AuthContext';

import { motion } from 'framer-motion';

import { HorizontalLoader } from '../components/Loader';

const Home = () => {
    const [heroMovie, setHeroMovie] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);
    const [ourMovies, setOurMovies] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);

    const [pageTrending, setPageTrending] = useState(1);
    const [pagePopular, setPagePopular] = useState(1);
    const [pageTv, setPageTv] = useState(1);

    const [hasMoreTrending, setHasMoreTrending] = useState(true);
    const [hasMorePopular, setHasMorePopular] = useState(true);
    const [hasMoreTv, setHasMoreTv] = useState(true);

    const trendingRef = useInfiniteScroll(() => setPageTrending(p => p + 1), hasMoreTrending);
    const popularRef = useInfiniteScroll(() => setPagePopular(p => p + 1), hasMorePopular);
    const tvRef = useInfiniteScroll(() => setPageTv(p => p + 1), hasMoreTv);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch Our Latest Additions (Admin Movies)
                const ourRes = await api.get('/movies');
                const adminMovies = ourRes.data.movies.slice(0, 10).map(m => ({
                    id: m._id,
                    title: m.title,
                    poster: m.poster,
                    rating: 'N/A',
                    year: m.releaseDate ? new Date(m.releaseDate).getFullYear() : 'N/A',
                    genre: m.genre || 'Movie',
                    media_type: 'movie'
                }));
                setOurMovies(adminMovies);

                // Fetch Hero and First pages
                const trendingRes = await getTrending(1);
                const results = trendingRes.data.results;

                if (results.length > 0) {
                    // Filter movies with backdrops for a better hero experience
                    const moviesWithBackdrops = results.filter(m => m.backdrop_path);
                    const heroList = moviesWithBackdrops.length > 0 ? moviesWithBackdrops : results;
                    const randomIdx = Math.floor(Math.random() * Math.min(heroList.length, 10));
                    const hero = heroList[randomIdx];

                    setHeroMovie({
                        id: hero.id,
                        title: hero.title || hero.name,
                        overview: hero.overview,
                        backdrop: hero.backdrop_path ? `https://image.tmdb.org/t/p/original${hero.backdrop_path}` : null,
                        poster: hero.poster_path ? `https://image.tmdb.org/t/p/w500${hero.poster_path}` : null,
                        year: (hero.release_date || hero.first_air_date || '').split('-')[0],
                        media_type: hero.media_type
                    });

                    setTrendingMovies(results.map(formatMovie));
                }

                const popularRes = await getPopular(1);
                setPopularMovies(popularRes.data.results.map(formatMovie));

                const tvRes = await getTopRatedTv(1);
                setTopRatedTvShows(tvRes.data.results.map(formatMovie));

                setInitialLoading(false);
            } catch (error) {
                console.error("Error loading home data:", error);
                setInitialLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Pagination effects
    useEffect(() => {
        if (pageTrending > 1) {
            getTrending(pageTrending).then(res => {
                const newMovies = res.data.results.map(formatMovie);
                setTrendingMovies(prev => [...prev, ...newMovies]);
                if (newMovies.length === 0) setHasMoreTrending(false);
            });
        }
    }, [pageTrending]);

    useEffect(() => {
        if (pagePopular > 1) {
            getPopular(pagePopular).then(res => {
                const newMovies = res.data.results.map(formatMovie);
                setPopularMovies(prev => [...prev, ...newMovies]);
                if (newMovies.length === 0) setHasMorePopular(false);
            });
        }
    }, [pagePopular]);

    useEffect(() => {
        if (pageTv > 1) {
            getTopRatedTv(pageTv).then(res => {
                const newMovies = res.data.results.map(formatMovie);
                setTopRatedTvShows(prev => [...prev, ...newMovies]);
                if (newMovies.length === 0) setHasMoreTv(false);
            });
        }
    }, [pageTv]);

    const formatMovie = (item) => ({
        id: item.id,
        title: item.title || item.name,
        rating: item.vote_average ? parseFloat((item.vote_average / 2).toFixed(1)) : 'N/A',
        year: (item.release_date || item.first_air_date || '').split('-')[0],
        poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        media_type: item.media_type || (item.first_air_date ? 'tv' : 'movie')
    });

    const renderSkeletons = () => [...Array(6)].map((_, i) => <MovieCardSkeleton key={i} />);

    // Animation variants for hero content
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const headingVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-bg-light dark:bg-bg-dark text-gray-900 dark:text-white pb-20 overflow-hidden transition-colors duration-300"
        >
            {initialLoading && !heroMovie && <HeroSkeleton />}

            {!initialLoading && heroMovie && (
                <div className="relative w-full h-[85vh] md:h-[95vh]">
                    <div className="absolute inset-0">
                        <motion.img
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            src={heroMovie.backdrop || heroMovie.poster}
                            alt={heroMovie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-gray-50/90 dark:from-bg-dark via-gray-50/50 dark:via-bg-dark/80 to-transparent"></div>
                        <div className="absolute inset-0 bg-linear-to-t from-gray-50 dark:from-bg-dark via-transparent to-transparent"></div>
                    </div>

                    <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-center pt-20 cursor-default">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="max-w-2xl space-y-6"
                        >
                            <motion.div variants={itemVariants} className="flex items-center gap-3">
                                <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-[4px] bg-opacity-90">TRENDING #1</span>
                                <span className="text-gray-600 dark:text-gray-300 font-medium text-sm drop-shadow-md">
                                    {heroMovie.media_type === 'tv' ? 'TV Series' : 'Movie'} • {heroMovie.year}
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter shadow-sm text-gray-900 dark:text-white drop-shadow-2xl uppercase"
                            >
                                {heroMovie.title}
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed max-w-xl drop-shadow-lg line-clamp-3"
                            >
                                {heroMovie.overview}
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
                                <Link to={`/movie/${heroMovie.id}`} className="group/btn flex items-center gap-2 bg-brand-red hover:bg-[#F40612] text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-[0_4px_14px_rgba(229,9,20,0.3)] cursor-pointer">
                                    <Play className="w-5 h-5 fill-current" />
                                    Play Trailer
                                </Link>
                                <Link to={`/movie/${heroMovie.id}`} className="flex items-center gap-2 bg-gray-900/10 dark:bg-white/10 hover:bg-gray-900/20 dark:hover:bg-white/20 backdrop-blur-md text-gray-900 dark:text-white border border-gray-900/10 dark:border-white/10 px-8 py-3.5 rounded-full font-bold transition-all cursor-pointer">
                                    <Info className="w-5 h-5" />
                                    More Info
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            )}

            <div className="mx-auto px-6 lg:px-12 -mt-32 relative z-10 space-y-16">

                {/* Our Latest Additions (Admin Movies) */}
                {ourMovies.length > 0 && (
                    <section>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={headingVariants}
                            className="flex items-center justify-between mb-2 mt-30"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                                <TrendingUp className="w-6 h-6 text-brand-red" />
                                Our Latest Additions
                            </h2>
                            <Link to="/movies" className="text-brand-red hover:text-[#F40612] font-semibold text-sm transition-colors border-2 border-transparent hover:border-brand-red/20 px-3 py-1 rounded-full pointer-events-auto">
                                View All
                            </Link>
                        </motion.div>
                        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x snap-mandatory">
                            {initialLoading ? renderSkeletons() : ourMovies.map((movie, index) => (
                                <Link to={`/movie/${movie.id}`} key={`local-${movie.id}-${index}`} className="snap-start block shrink-0">
                                    <MovieCard movie={movie} />
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Trending Now */}
                <section>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={headingVariants}
                        className={ourMovies.length > 0 ? "flex items-center justify-between mb-2 mt-6" : "flex items-center justify-between mb-2 mt-30"}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                            <TrendingUp className="w-6 h-6 text-brand-red" />
                            Trending Now
                        </h2>
                        <Link to="/movies" className="text-brand-red hover:text-[#F40612] font-semibold text-sm transition-colors border-2 border-transparent hover:border-brand-red/20 px-3 py-1 rounded-full pointer-events-auto">
                            View All
                        </Link>
                    </motion.div>
                    <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x snap-mandatory">
                        {initialLoading ? renderSkeletons() : trendingMovies.map((movie, index) => (
                            <Link to={`/movie/${movie.id}`} key={`${movie.id}-${index}`} className="snap-start block shrink-0">
                                <MovieCard movie={movie} />
                            </Link>
                        ))}
                        {hasMoreTrending && !initialLoading && (
                            <div ref={trendingRef} className="snap-start shrink-0">
                                <HorizontalLoader />
                            </div>
                        )}
                    </div>
                </section>

                {/* Popular Movies */}
                <section>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={headingVariants}
                        className="flex items-center justify-between mb-6"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Popular Movies</h2>
                    </motion.div>
                    <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x snap-mandatory">
                        {initialLoading ? renderSkeletons() : popularMovies.map((movie, index) => (
                            <Link to={`/movie/${movie.id}`} key={`${movie.id}-${index}`} className="snap-start block shrink-0">
                                <MovieCard movie={movie} />
                            </Link>
                        ))}
                        {hasMorePopular && !initialLoading && (
                            <div ref={popularRef} className="snap-start shrink-0">
                                <HorizontalLoader />
                            </div>
                        )}
                    </div>
                </section>

                {/* Top Rated TV Shows */}
                <section>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={headingVariants}
                        className="flex items-center justify-between mb-6"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Top Rated TV Shows</h2>
                    </motion.div>
                    <div className="flex gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x snap-mandatory">
                        {initialLoading ? renderSkeletons() : topRatedTvShows.map((show, index) => (
                            <Link to={`/movie/${show.id}`} key={`${show.id}-${index}`} className="snap-start block shrink-0">
                                <MovieCard movie={show} />
                            </Link>
                        ))}
                        {hasMoreTv && !initialLoading && (
                            <div ref={tvRef} className="snap-start shrink-0">
                                <HorizontalLoader />
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </motion.div>
    );
};

export default Home;