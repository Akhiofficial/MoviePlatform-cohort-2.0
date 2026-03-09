import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Filter, Download, Edit2, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import { api } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AdminManageMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        genre: '',
        poster: '',
        trailer: '',
        releaseDate: '',
        description: '',
        duration: '',
        director: '',
        budget: '',
        revenue: ''
    });

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/movies');
            setMovies(res.data.movies);
        } catch (error) {
            console.error('Error fetching admin movies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDeleteMovie = async (id) => {
        if (!window.confirm('Are you sure you want to delete this movie?')) return;
        try {
            await api.delete(`/admin/movies/${id}`);
            setMovies(movies.filter((m) => m._id !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
            alert('Error deleting movie');
        }
    };

    const handleEditClick = (movie) => {
        setEditingMovie(movie._id);
        setEditFormData({
            title: movie.title || '',
            genre: movie.genre || '',
            poster: movie.poster || '',
            trailer: movie.trailer || '',
            releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
            description: movie.description || '',
            duration: movie.duration || '',
            director: movie.director || '',
            budget: movie.budget || '',
            revenue: movie.revenue || ''
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const submitEdit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/admin/movies/${editingMovie}`, editFormData);
            setEditingMovie(null);
            fetchMovies();
            alert('Movie updated successfully');
        } catch (error) {
            console.error('Error updating movie:', error);
            alert(error.response?.data?.message || 'Error updating movie');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row bg-[#110C0C] min-h-screen text-white font-sans selection:bg-brand-red selection:text-white"
        >

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full bg-[#110C0C]">

                {/* Topbar */}
                <AdminTopbar />

                {/* Dashboard Scrollable Body */}
                <div className="p-4 md:p-8 pb-20 max-w-[1200px] w-full mx-auto space-y-10">

                    {/* Manage Movies Table Area */}
                    <section className="bg-[#1A1414] border border-[#2A1E1E] rounded-[24px] p-8 md:p-10 shadow-xl overflow-x-auto">
                        <div className="flex justify-between items-end mb-8 min-w-[700px]">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Manage Movies</h2>
                                <p className="text-gray-400 text-[13px] font-medium">Showing {movies.length} movies in the library</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="w-[38px] h-[38px] rounded-full border border-[#2A1E1E] flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer shadow-sm">
                                    <Filter className="w-[18px] h-[18px] text-gray-400 group-hover:text-white" />
                                </button>
                                <button className="w-[38px] h-[38px] rounded-full border border-[#2A1E1E] flex items-center justify-center hover:bg-white/5 transition-colors group cursor-pointer shadow-sm">
                                    <Download className="w-[18px] h-[18px] text-gray-400 group-hover:text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="w-full">
                            <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                                <thead>
                                    <tr className="text-[10px] uppercase tracking-widest text-gray-500 font-black border-b border-[#2A1E1E]">
                                        <th className="pb-4 pl-4 w-16">Poster</th>
                                        <th className="pb-4">Movie Title</th>
                                        <th className="pb-4">Genre</th>
                                        <th className="pb-4">Release Date</th>
                                        <th className="pb-4">Status</th>
                                        <th className="pb-4 pr-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="py-10 text-center text-gray-500">Loading movies...</td>
                                        </tr>
                                    ) : movies.length > 0 ? (
                                        movies.map((movie) => (
                                            <tr key={movie._id} className="group border-b border-[#2A1E1E]/50 hover:bg-[#201818] transition-colors cursor-pointer">
                                                <td className="py-5 pl-4">
                                                    <div className="w-[42px] h-[60px] rounded-lg overflow-hidden border border-white/10 shadow-lg group-hover:shadow-brand-red/10 group-hover:border-brand-red/20 transition-all bg-[#222]">
                                                        {movie.poster ? (
                                                            <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="text-[10px] text-center mt-3 text-gray-500">No Img</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-5 text-[14px] font-bold text-white transition-colors">{movie.title}</td>
                                                <td className="py-5 text-[12px] text-gray-400 font-bold tracking-wider uppercase">{movie.genre || 'MOVIE'}</td>
                                                <td className="py-5 text-[13px] text-gray-400 font-medium">
                                                    {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="py-5">
                                                    <span className="inline-flex items-center gap-1.5 bg-[#142A1E]/80 border border-[#34D399]/20 text-[#34D399] px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide">
                                                        <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]"></span> Active
                                                    </span>
                                                </td>
                                                <td className="py-5 pr-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-sm"
                                                            title="Edit function"
                                                            onClick={(e) => { e.stopPropagation(); handleEditClick(movie); }}
                                                        >
                                                            <Edit2 className="w-[15px] h-[15px]" />
                                                        </button>
                                                        <button
                                                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-colors shadow-sm"
                                                            title="Delete movie"
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteMovie(movie._id); }}
                                                        >
                                                            <Trash2 className="w-[15px] h-[15px]" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-10 text-center text-gray-500">No movies found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </section>
                </div>

            </main>

            {/* Edit Modal */}
            {editingMovie && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-[#1A1414] border border-[#2A1E1E] rounded-[24px] w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                        <div className="p-6 md:p-8 border-b border-[#2A1E1E] flex justify-between items-start relative z-10 bg-[#1A1414]">
                            <div>
                                <h3 className="text-2xl font-bold text-white drop-shadow-sm tracking-tight mb-1">Edit Movie</h3>
                                <p className="text-gray-400 text-[13px] font-medium">Update the details for this title.</p>
                            </div>
                            <button onClick={() => setEditingMovie(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-red/20 text-gray-400 hover:text-brand-red border border-transparent hover:border-brand-red/30 transition-all cursor-pointer">
                                ✕
                            </button>
                        </div>

                        <div className="p-6 md:p-8 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#3A2A2A] [&::-webkit-scrollbar-thumb]:rounded-full flex-1 relative z-10">
                            <form id="edit-form" onSubmit={submitEdit} className="space-y-7">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2.5">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Movie Title</label>
                                        <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} required className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white focus:outline-hidden transition-colors text-[13px] font-medium" />
                                    </div>
                                    <div className="space-y-2.5 relative">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Genre</label>
                                        <div className="relative">
                                            <select name="genre" value={editFormData.genre} onChange={handleEditChange} required className="appearance-none w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl pl-4 pr-10 py-3.5 text-gray-400 focus:text-white focus:outline-hidden transition-colors text-[13px] font-medium cursor-pointer">
                                                <option value="">Select Genre</option>
                                                <option value="Action">Action</option>
                                                <option value="Sci-Fi">Sci-Fi</option>
                                                <option value="Drama">Drama</option>
                                                <option value="Comedy">Comedy</option>
                                                <option value="Horror">Horror</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Poster URL</label>
                                        <input type="text" name="poster" value={editFormData.poster} onChange={handleEditChange} required className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white focus:outline-hidden transition-colors text-[13px] font-medium" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Trailer URL</label>
                                        <input type="text" name="trailer" value={editFormData.trailer} onChange={handleEditChange} required className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white focus:outline-hidden transition-colors text-[13px] font-medium" />
                                    </div>
                                    <div className="space-y-2.5 relative">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Release Date</label>
                                        <div className="relative group">
                                            <input type="text" name="releaseDate" value={editFormData.releaseDate} onChange={handleEditChange} placeholder="YYYY-MM-DD" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white focus:outline-hidden transition-colors text-[13px] font-medium" />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Duration (Min)</label>
                                        <input type="number" name="duration" value={editFormData.duration} onChange={handleEditChange} className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white focus:outline-hidden transition-colors text-[13px] font-medium [&::-webkit-inner-spin-button]:appearance-none" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Director</label>
                                        <input type="text" name="director" value={editFormData.director} onChange={handleEditChange} className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white focus:outline-hidden transition-colors text-[13px] font-medium" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Budget ($)</label>
                                        <input type="text" name="budget" value={editFormData.budget} onChange={handleEditChange} className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white focus:outline-hidden transition-colors text-[13px] font-medium" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[12px] font-bold text-gray-200 ml-1">Revenue ($)</label>
                                        <input type="text" name="revenue" value={editFormData.revenue} onChange={handleEditChange} className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white focus:outline-hidden transition-colors text-[13px] font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2.5 pt-2">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Description</label>
                                    <textarea name="description" value={editFormData.description} onChange={handleEditChange} rows="4" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-4 text-white focus:outline-hidden transition-colors text-[13px] font-medium resize-y [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#3A2A2A] [&::-webkit-scrollbar-thumb]:rounded-full"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 md:p-8 border-t border-[#2A1E1E] bg-[#1A1414] relative z-10 flex justify-end gap-4">
                            <button onClick={() => setEditingMovie(null)} className="px-8 py-3 rounded-full text-[13px] font-bold text-white border border-[#3A2A2A] hover:bg-[#2A1E1E] transition-colors cursor-pointer">Discard</button>
                            <button form="edit-form" type="submit" className="px-8 py-3 rounded-full text-[13px] font-bold text-white bg-brand-red hover:bg-[#F40612] shadow-[0_4px_14px_rgba(229,9,20,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default AdminManageMovies;
