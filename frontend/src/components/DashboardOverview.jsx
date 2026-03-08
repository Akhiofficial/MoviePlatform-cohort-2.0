import { useState, useEffect } from 'react';
import { Users, Film, Eye, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// ─── Custom SVG Bar Chart ────────────────────────────────────────────────────
const UserGrowthChart = ({ data }) => {
    const [tooltip, setTooltip] = useState(null);
    const maxCount = Math.max(...data.map((d) => d.count), 1);
    const chartH = 180;
    const barW = 28;
    const gap = 16;
    const paddingX = 24;
    const totalW = data.length * (barW + gap) - gap + paddingX * 2;

    return (
        <div className="flex-1 flex flex-col justify-end mt-6 relative select-none">
            <svg
                viewBox={`0 0 ${totalW} ${chartH + 32}`}
                className="w-full overflow-visible"
                style={{ maxHeight: chartH + 40 }}
            >
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
                    <line
                        key={frac}
                        x1={paddingX}
                        x2={totalW - paddingX}
                        y1={chartH - frac * chartH}
                        y2={chartH - frac * chartH}
                        stroke="#302020"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.6"
                    />
                ))}

                {data.map((d, i) => {
                    const x = paddingX + i * (barW + gap);
                    const barH = maxCount === 0 ? 2 : Math.max((d.count / maxCount) * chartH, d.count > 0 ? 4 : 2);
                    const y = chartH - barH;
                    const isHovered = tooltip?.i === i;

                    return (
                        <g key={d.date}>
                            {/* Background bar track */}
                            <rect
                                x={x}
                                y={0}
                                width={barW}
                                height={chartH}
                                rx={6}
                                fill="#241717"
                                opacity="0.4"
                            />
                            {/* Actual bar */}
                            <rect
                                x={x}
                                y={y}
                                width={barW}
                                height={barH}
                                rx={6}
                                fill={isHovered ? '#F40612' : '#C11119'}
                                style={{ transition: 'fill 0.15s, height 0.4s, y 0.4s' }}
                                onMouseEnter={() => setTooltip({ i, count: d.count, day: d.day, x: x + barW / 2, y })}
                                onMouseLeave={() => setTooltip(null)}
                                className="cursor-pointer"
                            />
                            {/* Day label */}
                            <text
                                x={x + barW / 2}
                                y={chartH + 20}
                                textAnchor="middle"
                                fontSize="10"
                                fontWeight="700"
                                letterSpacing="1"
                                fill={isHovered ? '#F40612' : '#6B7280'}
                                style={{ textTransform: 'uppercase', transition: 'fill 0.15s' }}
                            >
                                {d.day}
                            </text>
                        </g>
                    );
                })}

                {/* Tooltip */}
                {tooltip && (
                    <g>
                        <rect
                            x={tooltip.x - 28}
                            y={tooltip.y - 32}
                            width={56}
                            height={24}
                            rx={6}
                            fill="#3A1515"
                            stroke="#C11119"
                            strokeWidth="1"
                        />
                        <text
                            x={tooltip.x}
                            y={tooltip.y - 15}
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight="700"
                            fill="white"
                        >
                            {tooltip.count} {tooltip.count === 1 ? 'signup' : 'signups'}
                        </text>
                    </g>
                )}
            </svg>
        </div>
    );
};

// ─── Growth Badge ────────────────────────────────────────────────────────────
const GrowthBadge = ({ percent, label }) => {
    const isPositive = percent >= 0;
    return (
        <div className={`flex items-center gap-1.5 text-[13px] font-bold mt-2 ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>
                {isPositive ? '+' : ''}
                {percent}% {label}
            </span>
        </div>
    );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const DashboardOverview = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [moviePage, setMoviePage] = useState(0);
    const moviesPerPage = 6;

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [statsRes, usersRes, moviesRes] = await Promise.all([
                    api.get('/admin/users/stats'),
                    api.get('/admin/users'),
                    api.get('/admin/movies'),
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data.users.slice(0, 4));
                setMovies(moviesRes.data.movies);
            } catch (err) {
                console.error('Dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center h-full min-h-[400px]">
                <div className="w-10 h-10 border-4 border-brand-red/30 border-t-brand-red rounded-full animate-spin" />
            </div>
        );
    }

    // Paginated movies
    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const visibleMovies = movies.slice(moviePage * moviesPerPage, (moviePage + 1) * moviesPerPage);

    const totalViewsFormatted = (() => {
        const v = stats?.totalViews ?? 0;
        if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M';
        if (v >= 1000) return (v / 1000).toFixed(1) + 'k';
        return String(v);
    })();

    return (
        <div className="px-10 pb-12 w-full mx-auto space-y-6">

            {/* ── KPI Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Users */}
                <div className="bg-[#241717] border border-[#302020]/50 rounded-[20px] p-6 shadow-sm hover:border-[#402A2A] transition-colors relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-gray-400 text-[13px] font-semibold mb-1">Total Users</h3>
                            <p className="text-[28px] font-bold text-white leading-tight tracking-tight">
                                {stats?.totalUsers ?? '—'}
                            </p>
                        </div>
                        <div className="w-[42px] h-[42px] bg-brand-red/10 rounded-[14px] flex items-center justify-center text-brand-red">
                            <Users className="w-5 h-5 fill-current opacity-20" />
                        </div>
                    </div>
                    <GrowthBadge percent={stats?.userGrowthPercent ?? 0} label="this month" />
                </div>

                {/* Movies Library */}
                <div className="bg-[#241717] border border-[#302020]/50 rounded-[20px] p-6 shadow-sm hover:border-[#402A2A] transition-colors relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-gray-400 text-[13px] font-semibold mb-1">Movies Library</h3>
                            <p className="text-[28px] font-bold text-white leading-tight tracking-tight">
                                {stats?.totalMovies ?? '—'}
                            </p>
                        </div>
                        <div className="w-[42px] h-[42px] bg-brand-red/10 rounded-[14px] flex items-center justify-center text-brand-red">
                            <Film className="w-5 h-5 fill-current opacity-20" />
                        </div>
                    </div>
                    <GrowthBadge percent={stats?.movieGrowthPercent ?? 0} label="since last week" />
                </div>

                {/* Total Views (derived) */}
                <div className="bg-[#241717] border border-[#302020]/50 rounded-[20px] p-6 shadow-sm hover:border-[#402A2A] transition-colors relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-gray-400 text-[13px] font-semibold mb-1">Total Views</h3>
                            <p className="text-[28px] font-bold text-white leading-tight tracking-tight">{totalViewsFormatted || '—'}</p>
                        </div>
                        <div className="w-[42px] h-[42px] bg-brand-red/10 rounded-[14px] flex items-center justify-center text-brand-red">
                            <Eye className="w-5 h-5 fill-current opacity-20" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#10B981] text-[13px] font-bold mt-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Unique movie views</span>
                    </div>
                </div>

            </div>

            {/* ── Chart & Recent Signups ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* User Growth Chart */}
                <div className="lg:col-span-2 bg-[#241717] border border-[#302020]/50 rounded-[24px] p-7 shadow-sm hover:border-[#402A2A] transition-colors flex flex-col justify-between min-h-[320px]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-[17px] font-bold text-white tracking-tight mb-1">User Growth</h2>
                            <p className="text-gray-400 text-[13px] font-medium">
                                Signups for the last 7 days
                                {stats?.userGrowth && (
                                    <span className="ml-2 text-brand-red font-bold">
                                        · {stats.userGrowth.reduce((s, d) => s + d.count, 0)} total
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-[#1A1111] border border-[#302020] px-4 py-2 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-brand-red inline-block" />
                            <span className="text-[12px] font-semibold text-gray-300">Weekly</span>
                        </div>
                    </div>

                    {stats?.userGrowth?.length > 0 ? (
                        <UserGrowthChart data={stats.userGrowth} />
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                            No data available
                        </div>
                    )}
                </div>

                {/* Recent Signups */}
                <div className="bg-[#241717] border border-[#302020]/50 rounded-[24px] p-7 shadow-sm hover:border-[#402A2A] transition-colors flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-[17px] font-bold text-white tracking-tight">Recent Signups</h2>
                        <button
                            onClick={() => navigate('/admin/users')}
                            className="text-[11px] font-black tracking-widest text-brand-red hover:text-[#F40612] transition-colors uppercase cursor-pointer"
                        >
                            View All
                        </button>
                    </div>

                    <div className="space-y-6">
                        {users.map((user) => (
                            <div key={user._id} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-full border border-white/5 bg-[#302020] flex items-center justify-center text-white font-bold text-[15px]">
                                        {user.fullname ? user.fullname.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-white group-hover:text-brand-red transition-colors">
                                            {user.fullname}
                                        </span>
                                        <span className="text-[11px] text-gray-500 font-medium">{user.email}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 tracking-wider">
                                    {new Date(user.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit', month: '2-digit', year: 'numeric'
                                    })}
                                </span>
                            </div>
                        ))}
                        {users.length === 0 && (
                            <div className="text-sm text-gray-500 text-center py-4">No recent signups.</div>
                        )}
                    </div>
                </div>

            </div>

            {/* ── Latest Movies Added ── */}
            <div className="bg-[#241717] border border-[#302020]/50 rounded-[24px] p-7 shadow-sm hover:border-[#402A2A] transition-colors">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-[17px] font-bold text-white tracking-tight">
                            Latest Movies Added
                        </h2>
                        <p className="text-gray-500 text-[12px] font-medium mt-0.5">
                            {movies.length} total · showing {moviePage * moviesPerPage + 1}–{Math.min((moviePage + 1) * moviesPerPage, movies.length)}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setMoviePage((p) => Math.max(p - 1, 0))}
                            disabled={moviePage === 0}
                            className="w-[30px] h-[30px] rounded-[10px] bg-[#1A1111] border border-[#302020] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#302020] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setMoviePage((p) => Math.min(p + 1, totalPages - 1))}
                            disabled={moviePage >= totalPages - 1}
                            className="w-[30px] h-[30px] rounded-[10px] bg-[#1A1111] border border-[#302020] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#302020] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                    {visibleMovies.length > 0 ? visibleMovies.map((movie) => (
                        <div
                            key={movie._id}
                            className="group cursor-pointer"
                            onClick={() => navigate('/admin/movies')}
                        >
                            <div className="aspect-2/3 rounded-xl overflow-hidden border border-white/5 mb-3 shadow-lg group-hover:shadow-brand-red/10 transition-shadow bg-[#222]">
                                {movie.poster ? (
                                    <img
                                        src={movie.poster}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        alt={movie.title}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-4">
                                        <span className="text-white text-center text-sm font-medium">{movie.title}</span>
                                    </div>
                                )}
                            </div>
                            <h4 className="text-[13px] font-bold text-white text-ellipsis overflow-hidden whitespace-nowrap mb-0.5 group-hover:text-brand-red transition-colors">
                                {movie.title}
                            </h4>
                            <p className="text-[11px] font-medium text-gray-500">
                                {movie.genre || 'Movie'} · {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
                            </p>
                        </div>
                    )) : (
                        <div className="col-span-full text-center text-gray-500 py-10">No movies added yet.</div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default DashboardOverview;
