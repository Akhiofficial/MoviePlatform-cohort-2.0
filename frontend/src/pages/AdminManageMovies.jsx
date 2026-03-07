import React from 'react';
import { ChevronDown, Calendar, Filter, Download, Edit2, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';

const AdminManageMovies = () => {
    return (
        <div className="flex bg-[#110C0C] min-h-screen text-white font-sans selection:bg-brand-red selection:text-white">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full bg-[#110C0C]">

                {/* Topbar */}
                <AdminTopbar />

                {/* Dashboard Scrollable Body */}
                <div className="p-8 pb-20 max-w-[1200px] w-full mx-auto space-y-10">

                    {/* Add New Movie Form Section */}
                    <section className="bg-[#1A1414] border border-[#2A1E1E] rounded-[24px] p-8 md:p-10 shadow-xl overflow-hidden relative">
                        {/* Background subtle glow */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                        <div className="mb-8 relative z-10">
                            <h2 className="text-2xl font-bold text-white drop-shadow-sm tracking-tight mb-1">Add New Movie</h2>
                            <p className="text-gray-400 text-[13px] font-medium">Enter the movie details to update the theater catalog.</p>
                        </div>

                        <form className="relative z-10 space-y-7" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Title */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Movie Title</label>
                                    <input type="text" placeholder="e.g. Oppenheimer" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>
                                {/* Genre Dropdown */}
                                <div className="space-y-2.5 relative">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Genre</label>
                                    <div className="relative">
                                        <select className="appearance-none w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl pl-4 pr-10 py-3.5 text-gray-400 focus:text-white focus:outline-hidden transition-colors text-[13px] font-medium cursor-pointer">
                                            <option value="">Select Genre</option>
                                            <option value="action">Action</option>
                                            <option value="sci-fi">Sci-Fi</option>
                                            <option value="drama">Drama</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Poster URL */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Poster URL</label>
                                    <input type="text" placeholder="https://image-url.com/poster.jpg" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>
                                {/* Trailer URL */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Trailer URL</label>
                                    <input type="text" placeholder="https://youtube.com/watch?v=..." className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                </div>

                                {/* Date Area */}
                                <div className="space-y-2.5 relative">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Release Date</label>
                                    <div className="relative group">
                                        <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium" />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                                    </div>
                                </div>
                                {/* Duration */}
                                <div className="space-y-2.5">
                                    <label className="text-[12px] font-bold text-gray-200 ml-1">Duration (Min)</label>
                                    <input type="number" placeholder="120" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium [&::-webkit-inner-spin-button]:appearance-none" />
                                </div>
                            </div>

                            {/* Textarea */}
                            <div className="space-y-2.5 pt-2">
                                <label className="text-[12px] font-bold text-gray-200 ml-1">Movie Description</label>
                                <textarea placeholder="Write a brief summary of the movie..." rows="5" className="w-full bg-[#1C1414]/80 border border-[#2A1E1E] focus:border-brand-red/40 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-hidden transition-colors text-[13px] font-medium resize-y custom-scrollbar"></textarea>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end items-center gap-4 pt-10">
                                <button type="button" className="px-8 py-3 rounded-full text-[13px] font-bold text-white border border-[#3A2A2A] hover:bg-[#2A1E1E] transition-colors cursor-pointer">Discard</button>
                                <button type="submit" className="px-8 py-3 rounded-full text-[13px] font-bold text-white bg-brand-red hover:bg-[#F40612] shadow-[0_4px_14px_rgba(229,9,20,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer">Save Movie</button>
                            </div>
                        </form>
                    </section>

                    {/* Manage Movies Table Area */}
                    <section className="bg-[#1A1414] border border-[#2A1E1E] rounded-[24px] p-8 md:p-10 shadow-xl overflow-x-auto">
                        <div className="flex justify-between items-end mb-8 min-w-[700px]">
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Manage Movies</h2>
                                <p className="text-gray-400 text-[13px] font-medium">Showing 1240 movies in the library</p>
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
                                    <tr className="group border-b border-[#2A1E1E]/50 hover:bg-[#201818] transition-colors cursor-pointer">
                                        <td className="py-5 pl-4">
                                            <div className="w-[42px] h-[60px] rounded-lg overflow-hidden border border-white/10 shadow-lg group-hover:shadow-brand-red/10 group-hover:border-brand-red/20 transition-all">
                                                <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" alt="poster" className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="py-5 text-[14px] font-bold text-white transition-colors">Inception</td>
                                        <td className="py-5 text-[12px] text-gray-400 font-bold tracking-wider">SCI-FI</td>
                                        <td className="py-5 text-[13px] text-gray-400 font-medium">Jul 16, 2010</td>
                                        <td className="py-5">
                                            <span className="inline-flex items-center gap-1.5 bg-[#142A1E]/80 border border-[#34D399]/20 text-[#34D399] px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide">
                                                <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]"></span> Active
                                            </span>
                                        </td>
                                        <td className="py-5 pr-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-sm">
                                                    <Edit2 className="w-[15px] h-[15px]" />
                                                </button>
                                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-colors shadow-sm">
                                                    <Trash2 className="w-[15px] h-[15px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr className="group border-b border-[#2A1E1E]/50 hover:bg-[#201818] transition-colors cursor-pointer">
                                        <td className="py-5 pl-4">
                                            <div className="w-[42px] h-[60px] rounded-lg overflow-hidden border border-white/10 shadow-lg group-hover:shadow-brand-red/10 group-hover:border-brand-red/20 transition-all">
                                                <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop" alt="poster" className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="py-5 text-[14px] font-bold text-white transition-colors">Interstellar</td>
                                        <td className="py-5 text-[12px] text-gray-400 font-bold tracking-wider">DRAMA</td>
                                        <td className="py-5 text-[13px] text-gray-400 font-medium">Nov 07, 2014</td>
                                        <td className="py-5">
                                            <span className="inline-flex items-center gap-1.5 bg-[#142A1E]/80 border border-[#34D399]/20 text-[#34D399] px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide">
                                                <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]"></span> Active
                                            </span>
                                        </td>
                                        <td className="py-5 pr-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-sm">
                                                    <Edit2 className="w-[15px] h-[15px]" />
                                                </button>
                                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-colors shadow-sm">
                                                    <Trash2 className="w-[15px] h-[15px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="group border-b border-[#2A1E1E]/50 hover:bg-[#201818] transition-colors cursor-pointer">
                                        <td className="py-5 pl-4">
                                            <div className="w-[42px] h-[60px] rounded-lg overflow-hidden border border-white/10 shadow-lg group-hover:shadow-brand-red/10 group-hover:border-brand-red/20 transition-all">
                                                <img src="https://images.unsplash.com/photo-1485001564903-56e6a54d46ce?q=80&w=2070&auto=format&fit=crop" alt="poster" className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="py-5 text-[14px] font-bold text-white transition-colors">The Godfather</td>
                                        <td className="py-5 text-[12px] text-gray-400 font-bold tracking-wider">CRIME</td>
                                        <td className="py-5 text-[13px] text-gray-400 font-medium">Mar 24, 1972</td>
                                        <td className="py-5">
                                            <span className="inline-flex items-center gap-1.5 bg-[#2A1E14]/80 border border-[#FBBF24]/20 text-[#FBBF24] px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide">
                                                <span className="w-1.5 h-1.5 bg-[#FBBF24] rounded-full drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]"></span> Pending
                                            </span>
                                        </td>
                                        <td className="py-5 pr-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors shadow-sm">
                                                    <Edit2 className="w-[15px] h-[15px]" />
                                                </button>
                                                <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-brand-red hover:bg-brand-red/10 transition-colors shadow-sm">
                                                    <Trash2 className="w-[15px] h-[15px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </section>
                </div>

            </main>
        </div>
    );
};

export default AdminManageMovies;
