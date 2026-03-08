import React from 'react';

// Spinner for generic loading (like buttons)
export const Spinner = ({ className = "w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin" }) => (
    <div className={className}></div>
);

// Full Page Spinner if needed
const Loader = () => {
    return (
        <div className="min-h-screen bg-[#110C0C] flex items-center justify-center pt-[100px]">
            <Spinner className="w-12 h-12 border-4 border-[#F40612] border-t-transparent rounded-full animate-spin" />
        </div>
    );
};

// Skeleton for the Hero Section on Home Page
export const HeroSkeleton = () => (
    <div className="relative w-full h-[85vh] md:h-[95vh] bg-[#110C0C] overflow-hidden">
        {/* Background Gradient/Pulse */}
        <div className="absolute inset-0 bg-[#1A1515] animate-pulse">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#110C0C]/50 to-[#110C0C]"></div>
        </div>

        {/* Content Skeleton */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 h-full flex flex-col justify-end pb-24 md:pb-32">
            <div className="max-w-2xl animate-pulse">
                {/* Title */}
                <div className="h-16 md:h-24 bg-[#2A2323] rounded-xl w-3/4 mb-4"></div>
                {/* Meta details */}
                <div className="flex gap-4 mb-6">
                    <div className="h-4 bg-[#2A2323] rounded w-16"></div>
                    <div className="h-4 bg-[#2A2323] rounded w-24"></div>
                    <div className="h-4 bg-[#2A2323] rounded w-12"></div>
                </div>
                {/* Synopsis */}
                <div className="h-4 bg-[#2A2323] rounded w-full mb-2"></div>
                <div className="h-4 bg-[#2A2323] rounded w-5/6 mb-8"></div>
                {/* Buttons */}
                <div className="flex gap-4">
                    <div className="h-12 bg-[#2A2323] rounded-full w-32"></div>
                    <div className="h-12 bg-[#2A2323] rounded-full w-40"></div>
                </div>
            </div>
        </div>
    </div>
);

// Skeleton for horizontal scrolling MovieCard (Home, MovieDetails)
// aspect-2/3, min-w-[220px] -> matches MovieCard.jsx
export const MovieCardSkeleton = () => (
    <div className="flex flex-col gap-3 w-[160px] min-w-[160px] sm:w-[200px] sm:min-w-[200px] md:w-[260px] md:min-w-[260px] animate-pulse">
        {/* Poster */}
        <div className="relative aspect-2/3 w-full rounded-2xl bg-[#1A1515] border border-white/5"></div>
        {/* Details */}
        <div className="flex flex-col gap-2 px-1">
            <div className="h-5 bg-[#1A1515] rounded w-3/4"></div>
            <div className="flex justify-between items-center">
                <div className="h-4 bg-[#1A1515] rounded w-12"></div>
                <div className="h-4 bg-[#1A1515] rounded w-10"></div>
            </div>
        </div>
    </div>
);

// Loader for horizontal trending/popular lists
export const HorizontalLoader = () => (
    <div className="flex gap-6 animate-pulse px-2">
        <div className="w-[160px] sm:w-[200px] md:w-[260px] aspect-2/3 bg-[#1A1515] rounded-2xl shrink-0"></div>
        <div className="w-[160px] sm:w-[200px] md:w-[260px] aspect-2/3 bg-[#1A1515] rounded-2xl shrink-0"></div>
    </div>
);

// Skeleton for Grid Layouts (MoviePage, TvShowPage, Search, Favorites)
// aspect-3/4, w-full
export const GridCardSkeleton = () => (
    <div className="flex flex-col gap-2 w-full animate-pulse">
        {/* Poster */}
        <div className="relative aspect-3/4 w-full rounded-[16px] bg-[#1A1515]"></div>
        {/* Details */}
        <div className="flex flex-col gap-1.5 px-0.5 mt-1">
            <div className="h-4 bg-[#1A1515] rounded w-4/5"></div>
            <div className="h-3 bg-[#1A1515] rounded w-1/2"></div>
        </div>
    </div>
);

export default Loader;