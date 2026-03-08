import React from 'react';
import { Clapperboard, LayoutDashboard, Film, Users, Plus, Settings, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const location = useLocation();
    const { user } = useAuth();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-[280px] bg-[#221616]/40 border-r border-[#302020] flex flex-col justify-between sticky top-0 h-screen shrink-0 z-50 overflow-y-auto">
            <div>
                {/* Logo block */}
                <div className="p-8 mb-6 flex items-center gap-3">
                    <div className="bg-brand-red p-2 rounded-xl shrink-0 shadow-[0_4px_16px_rgba(229,9,20,0.4)]">
                        <Clapperboard className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[17px] font-black tracking-tight leading-none text-white shadow-sm mt-0.5">MovieAdmin</span>
                        <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-1 leading-none">Management Portal</span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="px-5 space-y-2">
                    <Link to="/" className="flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] transition-all font-medium text-[14px] text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 mb-4 group cursor-pointer">
                        <Home className="w-[18px] h-[18px] shrink-0 text-gray-500 group-hover:text-white transition-colors" />
                        Return to Public View
                    </Link>

                    <Link to="/admin" className={`flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] transition-all font-medium text-[14px] ${isActive('/admin') ? 'bg-brand-red text-white shadow-[0_4px_16px_0_rgba(229,9,20,0.3)] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <LayoutDashboard className={`w-[18px] h-[18px] shrink-0 ${isActive('/admin') ? 'fill-current opacity-20' : ''}`} />
                        Dashboard
                    </Link>
                    <Link to="/admin/movies" className={`flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] transition-all font-medium text-[14px] ${isActive('/admin/movies') ? 'bg-brand-red text-white shadow-[0_4px_16px_0_rgba(229,9,20,0.3)] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Film className={`w-[18px] h-[18px] shrink-0 ${isActive('/admin/movies') ? 'fill-current opacity-20' : ''}`} />
                        Manage Movies
                    </Link>
                    <Link to="/admin/users" className={`flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] transition-all font-medium text-[14px] ${isActive('/admin/users') ? 'bg-brand-red text-white shadow-[0_4px_16px_0_rgba(229,9,20,0.3)] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Users className={`w-[18px] h-[18px] shrink-0 ${isActive('/admin/users') ? 'fill-current opacity-20' : ''}`} />
                        Users
                    </Link>
                    <Link to="/admin/add-movie" className={`flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] transition-all font-medium text-[14px] ${isActive('/admin/add-movie') ? 'bg-brand-red text-white shadow-[0_4px_16px_0_rgba(229,9,20,0.3)] font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                        <Plus className={`w-[18px] h-[18px] shrink-0 ${isActive('/admin/add-movie') ? 'fill-current opacity-20' : ''}`} />
                        Add Movie
                    </Link>
                </nav>
            </div>

            {/* Profile Widget */}
            <div className="p-6 border-t border-[#302020]">
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
