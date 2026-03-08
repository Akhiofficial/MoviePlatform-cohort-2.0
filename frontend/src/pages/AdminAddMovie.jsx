import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';
import { api } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminAddMovie = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        poster: '',
        trailer: '',
        releaseDate: '',
        description: '',
        category: 'Movie',
        duration: '',
        director: '',
        budget: '',
        revenue: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddMovie = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/movies', formData);
            alert('Movie added successfully!');
            navigate('/admin/movies');
        } catch (error) {
            console.error('Error adding movie:', error);
            alert(error.response?.data?.message || 'Error adding movie');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex bg-[#110C0C] min-h-screen text-white font-sans selection:bg-brand-red selection:text-white"
        >
            <AdminSidebar />
            <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full bg-[#110C0C]">
                <AdminTopbar />
                <div className="p-8 pb-20 max-w-[1200px] w-full mx-auto space-y-10">
                    <section className="bg-[#1A1414] border border-[#2A1E1E] rounded-[24px] p-8 md:p-10 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                        <div className="mb-8 relative z-10">
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm tracking-tight mb-1">Add New Movie</h2>
                            <p className="text-gray-400 text-[13px] font-medium">Enter the movie details to update the theater catalog.</p>
                        </div>

                        <form className="relative z-10 space-y-7" onSubmit={handleAddMovie}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Movie Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Oppenheimer" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>
                                <div className="space-y-2.5 relative">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Genre</label>
                                    <div className="relative">
                                        <select name="genre" value={formData.genre} onChange={handleInputChange} required className="appearance-none w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl pl-4 pr-10 py-3.5 text-gray-400 focus:text-white focus:outline-hidden transition-colors text-[13px] font-medium cursor-pointer">
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
                                    <input type="text" name="poster" value={formData.poster} onChange={handleInputChange} required placeholder="https://image-url.com/poster.jpg" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Trailer URL</label>
                                    <input type="text" name="trailer" value={formData.trailer} onChange={handleInputChange} required placeholder="https://youtube.com/watch?v=..." className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>

                                <div className="space-y-2.5 relative">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Release Date</label>
                                    <div className="relative group">
                                        <input type="text" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} required placeholder="YYYY-MM-DD" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Duration (Min)</label>
                                    <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="120" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium [&::-webkit-inner-spin-button]:appearance-none" />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Director</label>
                                    <input type="text" name="director" value={formData.director} onChange={handleInputChange} placeholder="e.g. Christopher Nolan" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Budget ($)</label>
                                    <input type="text" name="budget" value={formData.budget} onChange={handleInputChange} placeholder="e.g. 100 Million" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Revenue ($)</label>
                                    <input type="text" name="revenue" value={formData.revenue} onChange={handleInputChange} placeholder="e.g. 950 Million" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2.5 pt-2">
                                <label className="text-[12px] font-bold text-gray-200 ml-1">Movie Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required placeholder="Write a brief summary of the movie..." rows="5" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium resize-y custom-scrollbar"></textarea>
                            </div>

                            <div className="flex justify-end items-center gap-4 pt-10">
                                <button type="button" onClick={() => navigate(-1)} className="px-8 py-3 rounded-full text-[13px] font-bold text-white border border-[#3A2A2A] hover:bg-[#2A1E1E] transition-colors cursor-pointer">Discard</button>
                                <button type="submit" className="px-8 py-3 rounded-full text-[13px] font-bold text-white bg-brand-red hover:bg-[#F40612] shadow-[0_4px_14px_rgba(229,9,20,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer">Save Movie</button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
        </motion.div>
    );
};

export default AdminAddMovie;
