import React from 'react';
import { Search, Bell, LayoutGrid } from 'lucide-react';

const AdminTopbar = () => {
    return (
        <header className="sticky top-0 z-40 bg-[#1A1111]/90 backdrop-blur-xl px-4 md:px-10 py-4 md:py-6 flex items-center justify-between border-b border-[#302020] md:border-none">
            <div>
                <h1 className="text-[18px] md:text-[22px] font-bold text-white tracking-tight">Dashboard Overview</h1>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <div className="relative w-[320px] group hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search analytics..."
                        className="w-full bg-[#241717] border border-transparent text-white text-[13px] rounded-full pl-11 pr-5 py-2.5 focus:outline-hidden focus:border-[#402A2A] transition-all placeholder-gray-500 font-medium"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative text-gray-400 hover:text-white transition-colors cursor-pointer p-1.5">
                        <Bell className="w-[19px] h-[19px]" />
                        <span className="absolute top-1 right-1.5 w-[7px] h-[7px] bg-brand-red rounded-full border-[1.5px] border-[#1A1111]"></span>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1.5">
                        <LayoutGrid className="w-[19px] h-[19px]" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
