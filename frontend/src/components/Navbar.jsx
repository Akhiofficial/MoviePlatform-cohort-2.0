import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Clapperboard, Search, LogOut, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-bg-dark/95 backdrop-blur-md shadow-md' : 'bg-linear-to-b from-black/80 to-transparent'}`}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                {/* Logo and Links */}
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center gap-2 group">
                        <Clapperboard className="w-8 h-8 text-brand-red group-hover:scale-110 transition-transform" />
                        <span className="text-brand-red font-black text-2xl tracking-wider">FLIX</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                        <Link to="/" className="text-white hover:text-brand-red transition-colors">Home</Link>
                        <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
                        <Link to="/tv" className="hover:text-white transition-colors">TV Shows</Link>
                        {user && (
                            <>
                                <Link to="/favorites" className="hover:text-white transition-colors">My List</Link>
                                <Link to="/history" className="hover:text-white transition-colors">History</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Search and Auth Controls */}
                <div className="flex items-center gap-6">
                    <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/10 focus-within:border-white/30 transition-colors">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search movies, actors..."
                            className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-400 ml-3 w-48 xl:w-64"
                        />
                    </form>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-2 text-gray-300">
                                    <User className="w-4 h-4" />
                                    <span>{user.fullname || user.name || 'User'}</span>
                                </div>
                                {user.role === 'admin' && location.pathname === '/' && (
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-1.5 bg-brand-red/20 hover:bg-brand-red/30 text-brand-red px-4 py-2 rounded-full transition-colors border border-brand-red/30 font-bold shadow-[0_0_10px_rgba(229,9,20,0.1)]"
                                    >
                                        <ShieldCheck className="w-4 h-4" />
                                        <span className="hidden md:inline text-xs">Admin Panel</span>
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors border border-white/10"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-gray-300 transition-colors hidden sm:block">Login</Link>
                                <Link to="/signup" className="bg-brand-red hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors font-semibold">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;