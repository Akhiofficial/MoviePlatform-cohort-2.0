import React from 'react';
import { Clapperboard, LayoutDashboard, Film, Users, Plus, Settings, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const location = useLocation();
    const { user } = useAuth();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-full md:w-[280px] bg-[#221616]/40 border-b md:border-b-0 md:border-r border-[#302020] flex flex-col justify-between sticky top-0 md:h-screen shrink-0 z-50 overflow-y-auto">
            <div className="flex flex-col md:block">
                {/* Logo block */}
                <div className="p-4 md:p-8 md:mb-6 flex items-center justify-between md:justify-start gap-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-brand-red p-2 rounded-xl shrink-0 shadow-[0_4px_16px_rgba(229,9,20,0.4)]">
                            <Clapperboard className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] md:text-[17px] font-black tracking-tight leading-none text-white shadow-sm mt-0.5">MovieAdmin</span>
                            <span className="text-[9px] md:text-[10px] text-gray-400 font-medium tracking-wide mt-1 leading-none">Management Portal</span>
                        </div>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="px-4 md:px-5 pb-4 md:pb-0 flex flex-row overflow-x-auto no-scrollbar md:flex-col gap-2 md:gap-0 md:space-y-2">
                    <Link to="/" className="flex items-center gap-2 md:gap-3.5 px-3 md:px-4 py-2.5 md:py-3.5 rounded-[10px] md:rounded-[14px] transition-all font-medium text-[13px] md:text-[14px] whitespace-nowrap text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 md:mb-4 group cursor-pointer shrink-0">
                        <Home className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] shrink-0 text-gray-500 group-hover:text-white transition-colors" />
                        <span className="hidden sm:inline md:inline">Return to Public View</span>
                        <span className="sm:hidden">Public</span>
                    </Link>

                    <Link to="/admin" className={`flex items-center gap-2 md:gap-3.5 px-3 md:px-4 py-2.5 md:py-3.5 rounded-[10px] md:rounded-[14px] transition-all font-medium text-[13px] md:text-[14px] whitespace-nowrap shrink-0 ${isActive('/admin') ? 'bg-brand-red text-white shadow-[0_4px_16px_0_rgba(229,9,20,0.3)] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <LayoutDashboard className={`w-[16px] h-[16px] md:w-[18px] md:h-[18px] shrink-0 ${isActive('/admin') ? 'fill-current opacity-20' : ''}`} />
                        Dashboard
                    </Link>
                    <Link to="/admin/movies" className={`flex items-center gap-2 md:gap-3.5 px-3 md:px-4 py-2.5 md:py-3.5 rounded-[10px] md:rounded-[14px] transition-all font-medium text-[13px] md:text-[14px] whitespace-nowrap shrink-0 ${isActive('/admin/movies') ? 'bg-brand-red text-white shadow-[0_4px_16px_0_rgba(229,9,20,0.3)] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Film className={`w-[16px] h-[16px] md:w-[18px] md:h-[18px] shrink-0 ${isActive('/admin/movies') ? 'fill-current opacity-20' : ''}`} />
                        Movies
                    </Link>
                    <Link to="/admin/users" className={`flex items-center gap-2 md:gap-3.5 px-3 md:px-4 py-2.5 md:py-3.5 rounded-[10px] md:rounded-[14px] transition-all font-medium text-[13px] md:text-[14px] whitespace-nowrap shrink-0 ${isActive('/admin/users') ? 'bg-brand-red text-white shadow-[0_4px_16px_0_rgba(229,9,20,0.3)] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Users className={`w-[16px] h-[16px] md:w-[18px] md:h-[18px] shrink-0 ${isActive('/admin/users') ? 'fill-current opacity-20' : ''}`} />
                        Users
                    </Link>
                    <Link to="/admin/add-movie" className={`flex items-center gap-2 md:gap-3.5 px-3 md:px-4 py-2.5 md:py-3.5 rounded-[10px] md:rounded-[14px] transition-all font-medium text-[13px] md:text-[14px] whitespace-nowrap shrink-0 ${isActive('/admin/add-movie') ? 'bg-brand-red text-white shadow-[0_4px_16px_0_rgba(229,9,20,0.3)] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Plus className={`w-[16px] h-[16px] md:w-[18px] md:h-[18px] shrink-0 ${isActive('/admin/add-movie') ? 'fill-current opacity-20' : ''}`} />
                        Add Movie
                    </Link>
                </nav>
            </div>

            {/* Profile Widget */}
            <div className="hidden md:block p-6 border-t border-[#302020]">
                <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-2xl transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-[42px] h-[42px] bg-[#E8C8B8] rounded-full overflow-hidden border-2 border-[#302020]">
                            {/* Dummy user silhouette if no image */}
                            <img src="https://i.pravatar.cc/150?img=33" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-white leading-tight truncate w-[120px]">{user?.fullname || user?.name || 'Admin User'}</span>
                            <span className="text-[11px] text-gray-500 font-medium mt-0.5">Admin Role</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
