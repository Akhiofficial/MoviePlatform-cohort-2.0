import { useState, useEffect } from 'react';
import { Users, Film, Eye, TrendingUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../context/AuthContext';

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        moviesLibrary: 0,
        totalViews: '50.2k',
        users: [],
        movies: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [usersRes, moviesRes] = await Promise.all([
                    api.get('/admin/users'),
                    api.get('/admin/movies')
                ]);
                setStats({
                    totalUsers: usersRes.data.count,
                    moviesLibrary: moviesRes.data.count,
                    totalViews: '50.2k',
                    users: usersRes.data.users.slice(0, 4),
                    movies: moviesRes.data.movies.slice(0, 6)
                });
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center h-full min-h-[400px]">
                <div className="w-10 h-10 border-4 border-brand-red/30 border-t-brand-red rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="px-10 pb-12 w-full mx-auto space-y-6">

            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* KPI 1 */}
                <div className="bg-[#241717] border border-[#302020]/50 rounded-[20px] p-6 shadow-sm hover:border-[#402A2A] transition-colors relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-gray-400 text-[13px] font-semibold mb-1">Total Users</h3>
                            <p className="text-[28px] font-bold text-white leading-tight tracking-tight">{stats.totalUsers}</p>
                        </div>
                        <div className="w-[42px] h-[42px] bg-brand-red/10 rounded-[14px] flex items-center justify-center text-brand-red">
                            <Users className="w-5 h-5 fill-current opacity-20" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#10B981] text-[13px] font-bold mt-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12% this month</span>
                    </div>
                </div>

                {/* KPI 2 */}
                <div className="bg-[#241717] border border-[#302020]/50 rounded-[20px] p-6 shadow-sm hover:border-[#402A2A] transition-colors relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-gray-400 text-[13px] font-semibold mb-1">Movies Library</h3>
                            <p className="text-[28px] font-bold text-white leading-tight tracking-tight">{stats.moviesLibrary}</p>
                        </div>
                        <div className="w-[42px] h-[42px] bg-brand-red/10 rounded-[14px] flex items-center justify-center text-brand-red">
                            <Film className="w-5 h-5 fill-current opacity-20" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#10B981] text-[13px] font-bold mt-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>+5% since last week</span>
                    </div>
                </div>

                {/* KPI 3 */}
                <div className="bg-[#241717] border border-[#302020]/50 rounded-[20px] p-6 shadow-sm hover:border-[#402A2A] transition-colors relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-gray-400 text-[13px] font-semibold mb-1">Total Views</h3>
                            <p className="text-[28px] font-bold text-white leading-tight tracking-tight">{stats.totalViews}</p>
                        </div>
                        <div className="w-[42px] h-[42px] bg-brand-red/10 rounded-[14px] flex items-center justify-center text-brand-red">
                            <Eye className="w-5 h-5 fill-current opacity-20" />
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#10B981] text-[13px] font-bold mt-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>+18% performance</span>
                    </div>
                </div>

            </div>

            {/* Middle Section: Chart & Signups */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* User Growth Chart Area */}
                <div className="lg:col-span-2 bg-[#241717] border border-[#302020]/50 rounded-[24px] p-7 shadow-sm hover:border-[#402A2A] transition-colors flex flex-col justify-between min-h-[380px]">

                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-[17px] font-bold text-white tracking-tight mb-1">User Growth</h2>
                            <p className="text-gray-400 text-[13px] font-medium">Signup activity for the last 7 days</p>
                        </div>
                        <button className="flex items-center gap-2 bg-[#1A1111] hover:bg-[#140C0C] border border-[#302020] px-4 py-2 rounded-full text-[12px] font-semibold text-gray-300 transition-colors">
                            Weekly
                            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                    </div>

                    {/* Blank Chart Area Placeholder */}
                    <div className="flex-1 flex flex-col justify-end mt-8 relative">
                        {/* Subtle horizon lines placeholder */}
                        <div className="absolute inset-0 border-y border-[#302020]/30 pointer-events-none flex flex-col justify-between">
                            <div></div><div></div><div></div><div></div>
                        </div>

                        {/* X-axis Labels */}
                        <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest px-4 mt-6">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </div>
                </div>

                {/* Recent Signups Area */}
                <div className="bg-[#241717] border border-[#302020]/50 rounded-[24px] p-7 shadow-sm hover:border-[#402A2A] transition-colors flex flex-col">

                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-[17px] font-bold text-white tracking-tight">Recent Signups</h2>
                        <button className="text-[11px] font-black tracking-widest text-brand-red hover:text-[#F40612] transition-colors uppercase">
                            View All
                        </button>
                    </div>

                    <div className="space-y-6">
                        {stats.users.map((user) => (
                            <div key={user._id} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-full border border-white/5 bg-[#302020] flex items-center justify-center text-white font-bold text-[15px]">
                                        {user.fullname ? user.fullname.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-bold text-white group-hover:text-brand-red transition-colors">{user.fullname}</span>
                                        <span className="text-[11px] text-gray-500 font-medium">{user.email}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 tracking-wider">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                        {stats.users.length === 0 && (
                            <div className="text-sm text-gray-500 text-center py-4">No recent signups.</div>
                        )}
                    </div>
                </div>

            </div>

            {/* Bottom Section: Movies Carousel */}
            <div className="bg-[#241717] border border-[#302020]/50 rounded-[24px] p-7 shadow-sm hover:border-[#402A2A] transition-colors">

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-[17px] font-bold text-white tracking-tight">Latest Movies Added</h2>
                    <div className="flex items-center gap-2">
                        <button className="w-[30px] h-[30px] rounded-[10px] bg-[#1A1111] border border-[#302020] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#302020] transition-colors cursor-pointer">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-[30px] h-[30px] rounded-[10px] bg-[#1A1111] border border-[#302020] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#302020] transition-colors cursor-pointer">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Cards Grid / Flex */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                    {stats.movies.length > 0 ? stats.movies.map((movie) => (
                        <div key={movie._id} className="group cursor-pointer">
                            <div className="aspect-2/3 rounded-xl overflow-hidden border border-white/5 mb-3 shadow-lg group-hover:shadow-brand-red/10 transition-shadow bg-[#222]">
                                {movie.poster ? (
                                    <img src={movie.poster} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={movie.title} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center p-4">
                                        <span className="text-white text-center text-sm font-medium">{movie.title}</span>
                                    </div>
                                )}
                            </div>
                            <h4 className="text-[13px] font-bold text-white text-ellipsis overflow-hidden whitespace-nowrap mb-0.5 group-hover:text-brand-red transition-colors">{movie.title}</h4>
                            <p className="text-[11px] font-medium text-gray-500">{movie.genre || 'Movie'} • {new Date(movie.releaseDate).getFullYear() || 'N/A'}</p>
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
