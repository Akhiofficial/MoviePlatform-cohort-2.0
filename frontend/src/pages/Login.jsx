import React from 'react';
import { Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    // Background images for the mosaic
    const bgImages = [
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505506874110-6a7a6c9924c7?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1950&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1928&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1485001564903-56e6a54d46ce?q=80&w=2070&auto=format&fit=crop',
    ];

    return (
        <div className="relative min-h-screen bg-bg-dark flex flex-col justify-between overflow-hidden text-white font-sans selection:bg-brand-red selection:text-white">

            {/* Background Mosaic */}
            <div className="absolute inset-0 z-0">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 opacity-50 blur-[2px] scale-[1.05]">
                    {bgImages.map((src, idx) => (
                        <div key={idx} className="aspect-3/4 rounded-xl overflow-hidden relative">
                            <img src={src} alt="Movie poster background" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50"></div>
                        </div>
                    ))}
                </div>
                {/* Dark Overlay with vertical gradient towards dark bg */}
                <div className="absolute inset-0 bg-linear-to-b from-bg-dark/40 via-bg-dark/60 to-bg-dark"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center flex-1 justify-center px-4 w-full max-w-7xl mx-auto pt-10 pb-0 min-h-screen">

                {/* Logo - Centered at top */}
                <div className="absolute top-8 left-0 right-0 flex justify-center w-full">
                    <Link to="/" className="flex items-center gap-2 group cursor-pointer z-50">
                        <div className="bg-brand-red p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                            <Clapperboard className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <span className="text-3xl md:text-4xl font-black tracking-tighter text-brand-red group-hover:drop-shadow-[0_0_15px_rgba(229,9,20,0.8)] transition-all">
                            FLIX
                        </span>
                    </Link>
                </div>

                {/* Login Container */}
                <div className="w-full max-w-[480px] bg-[#1E1717]/95 md:bg-[#1E1717]/90 backdrop-blur-xl rounded-[24px] p-8 md:p-14 shadow-2xl border border-white/5 relative z-20 mt-16 md:mt-24">

                    <h1 className="text-3xl font-bold mb-8">Sign In</h1>

                    <form className="flex flex-col gap-6 w-full" onSubmit={(e) => e.preventDefault()}>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2 relative group">
                            <label className="text-[13px] font-bold text-gray-200 ml-1 group-focus-within:text-brand-red transition-colors">Email or mobile number</label>
                            <input
                                type="text"
                                placeholder="Email address"
                                className="w-full bg-[#2B2323] border border-transparent rounded-[12px] px-5 py-4 text-white placeholder-gray-500 focus:outline-[1.5px] focus:outline-brand-red transition-all shadow-inner"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-2 relative group mt-2">
                            <label className="text-[13px] font-bold text-gray-200 ml-1 group-focus-within:text-brand-red transition-colors">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-[#2B2323] border border-transparent rounded-[12px] px-5 py-4 text-white placeholder-gray-500 focus:outline-[1.5px] focus:outline-brand-red transition-all shadow-inner"
                            />
                        </div>

                        {/* Sign In Button */}
                        <button className="w-full bg-brand-red hover:bg-[#F40612] focus:bg-[#B8060E] focus:outline-hidden text-white font-bold py-4 rounded-[12px] transition-colors mt-4 text-[17px] shadow-[0_4px_14px_0_rgba(229,9,20,0.39)]">
                            Sign In
                        </button>

                        {/* Helpers */}
                        <div className="flex items-center justify-between text-[13px] text-gray-400 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" className="appearance-none w-5 h-5 border border-gray-500 rounded-md bg-[#2B2323] checked:bg-brand-red checked:border-brand-red cursor-pointer transition-colors" />
                                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="group-hover:text-gray-300 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="hover:underline hover:text-gray-300 transition-colors">Forgot password?</a>
                        </div>

                        {/* Register Link */}
                        <div className="text-gray-400 mt-8 text-base">
                            New to Flix? <Link to="/signup" className="text-white hover:underline font-medium">Sign up now.</Link>
                        </div>

                        {/* Recaptcha text */}
                        <p className="text-[11px] text-[#8C8C8C] mt-2 leading-tight">
                            This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-[#0071EB] hover:underline">Learn more.</a>
                        </p>

                    </form>
                </div>

                {/* Footer Links (Absolute positioning for the page bottom) */}
                <div className="relative z-20 w-full mb-8 mt-16 md:mt-24 px-4 flex justify-center border-t border-white/5 pt-8 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-3 text-[13px] text-gray-500">
                        <a href="#" className="hover:underline hover:text-gray-300 transition-colors">Questions? Contact us.</a>
                        <a href="#" className="hover:underline hover:text-gray-300 transition-colors">Help Center</a>
                        <a href="#" className="hover:underline hover:text-gray-300 transition-colors">Terms of Use</a>
                        <a href="#" className="hover:underline hover:text-gray-300 transition-colors">Privacy</a>
                        <a href="#" className="hover:underline hover:text-gray-300 transition-colors">Cookie Preferences</a>
                        <a href="#" className="hover:underline hover:text-gray-300 transition-colors">Corporate Information</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;