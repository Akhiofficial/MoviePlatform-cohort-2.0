import React, { useState, useEffect } from 'react';
import { Play, Info, TrendingUp } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { HeroSkeleton, MovieCardSkeleton } from '../components/Loader';
import { Link } from 'react-router-dom';
import { getTrending, getPopular, getTopRatedTv } from '../services/tmdb';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Home = () => {
    // Media States
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);
    const [heroMovie, setHeroMovie] = useState(null);

    // Page & Loading States
    const [initialLoading, setInitialLoading] = useState(true);
    const [trendingPage, setTrendingPage] = useState(1);
    const [popularPage, setPopularPage] = useState(1);
    const [tvPage, setTvPage] = useState(1);
    const [hasMoreTrending, setHasMoreTrending] = useState(true);
    const [hasMorePopular, setHasMorePopular] = useState(true);
    const [hasMoreTv, setHasMoreTv] = useState(true);

    // Loading indicator flags for infinite scroll dots
    const [loadingTrending, setLoadingTrending] = useState(false);
    const [loadingPopular, setLoadingPopular] = useState(false);
    const [loadingTv, setLoadingTv] = useState(false);

    const mapData = (item) => ({
        id: item.id,
        title: item.title || item.name,
        rating: item.vote_average ? parseFloat((item.vote_average / 2).toFixed(1)) : 'N/A',
        year: (item.release_date || item.first_air_date || '').split('-')[0],
        poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
        backdrop: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : null,
        overview: item.overview,
        media_type: item.media_type || (item.title ? 'movie' : 'tv')
    });

    // Initial Fetch Effect
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [trendingRes, popularRes, topRatedTvRes] = await Promise.all([
                    getTrending(1),
                    getPopular(1),
                    getTopRatedTv(1)
                ]);

                const trending = trendingRes.data.results.map(mapData);
                const popular = popularRes.data.results.map(mapData);
                const tvShows = topRatedTvRes.data.results.map(mapData);

                setTrendingMovies(trending);
                setPopularMovies(popular);
                setTopRatedTvShows(tvShows);

                if (trending.length > 0) {
                    setHeroMovie(trending[0]);
                }
            } catch (error) {
                console.error("Error fetching initial TMDB data:", error);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Load More Trending
    const loadMoreTrending = async () => {
        if (!hasMoreTrending || loadingTrending || initialLoading) return;
        setLoadingTrending(true);
        try {
            const res = await getTrending(trendingPage + 1);
            const newMovies = res.data.results.map(mapData);
            setTrendingMovies(prev => [...prev, ...newMovies]);
            setTrendingPage(prev => prev + 1);
            if (newMovies.length === 0 || trendingPage >= res.data.total_pages) setHasMoreTrending(false);
        } catch (error) {
            console.error("Error loading more trending:", error);
        } finally {
            setLoadingTrending(false);
        }
    };

    // Load More Popular
    const loadMorePopular = async () => {
        if (!hasMorePopular || loadingPopular || initialLoading) return;
        setLoadingPopular(true);
        try {
            const res = await getPopular(popularPage + 1);
            const newMovies = res.data.results.map(mapData);
            setPopularMovies(prev => [...prev, ...newMovies]);
            setPopularPage(prev => prev + 1);
            if (newMovies.length === 0 || popularPage >= res.data.total_pages) setHasMorePopular(false);
        } catch (error) {
            console.error("Error loading more popular:", error);
        } finally {
            setLoadingPopular(false);
        }
    };

    // Load More TV Shows
    const loadMoreTv = async () => {
        if (!hasMoreTv || loadingTv || initialLoading) return;
        setLoadingTv(true);
        try {
            const res = await getTopRatedTv(tvPage + 1);
            const newShows = res.data.results.map(mapData);
            setTopRatedTvShows(prev => [...prev, ...newShows]);
            setTvPage(prev => prev + 1);
            if (newShows.length === 0 || tvPage >= res.data.total_pages) setHasMoreTv(false);
        } catch (error) {
            console.error("Error loading more TV shows:", error);
        } finally {
            setLoadingTv(false);
        }
    };

    // Scroll Observers
    const trendingRef = useInfiniteScroll(loadMoreTrending, hasMoreTrending);
    const popularRef = useInfiniteScroll(loadMorePopular, hasMorePopular);
    const tvRef = useInfiniteScroll(loadMoreTv, hasMoreTv);

    const renderSkeletons = () => (
        [...Array(6)].map((_, i) => <MovieCardSkeleton key={i} />)
    );

    const HorizontalLoader = () => (
        <div className="shrink-0 w-[200px] sm:w-[220px] lg:w-[240px] aspect-3/4 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-red/30 border-t-brand-red rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#110C0C] text-white pb-20 overflow-hidden">
            {initialLoading && !heroMovie && <HeroSkeleton />}

            {!initialLoading && heroMovie && (
                <div className="relative w-full h-[85vh] md:h-[95vh]">
                    <div className="absolute inset-0">
                        <img
                            src={heroMovie.backdrop || heroMovie.poster}
                            alt={heroMovie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-[#110C0C] via-[#110C0C]/80 to-transparent"></div>
                        <div className="absolute inset-0 bg-linear-to-t from-[#110C0C] via-[#110C0C]/20 to-transparent"></div>
                    </div>

                    <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-center pt-20 cursor-default">
                        <div className="max-w-2xl space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-[4px] bg-opacity-90">TRENDING #1</span>
                                <span className="text-gray-300 font-medium text-sm drop-shadow-md">
                                    {heroMovie.media_type === 'tv' ? 'TV Series' : 'Movie'} • {heroMovie.year}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter shadow-sm text-white drop-shadow-2xl uppercase">
                                {heroMovie.title}
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed max-w-xl drop-shadow-lg line-clamp-3">
                                {heroMovie.overview}
                            </p>

                            <div className="flex items-center gap-4 pt-4">
                                <Link to={`/movie/${heroMovie.id}`} className="flex items-center gap-2 bg-brand-red hover:bg-[#F40612] text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(229,9,20,0.3)] cursor-pointer">
                                    <Play className="w-5 h-5 fill-current" />
                                    Play Trailer
                                </Link>
                                <Link to={`/movie/${heroMovie.id}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer">
                                    <Info className="w-5 h-5" />
                                    More Info
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto px-6 lg:px-12 -mt-32 relative z-10 space-y-16">

                {/* Trending Now */}
                <section>
                    <div className="flex items-center justify-between mb-2 mt-30">
                        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-white">
                            <TrendingUp className="w-6 h-6 text-brand-red" />
                            Trending Now
                        </h2>
                        <Link to="/movies" className="text-brand-red hover:text-[#F40612] font-semibold text-sm transition-colors border-2 border-transparent hover:border-brand-red/20 px-3 py-1 rounded-full pointer-events-auto">
                            View All
                        </Link>
                    </div>
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
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Popular Movies</h2>
                    </div>
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
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Top Rated TV Shows</h2>
                    </div>
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
        </div>
    );
};

export default Home;