import React from 'react';
import { Clapperboard, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className="relative min-h-screen bg-bg-dark flex flex-col items-center justify-center overflow-hidden text-white font-sans selection:bg-brand-red selection:text-white">

            {/* Background Image - Cinema Exterior */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop"
                    alt="Cinema background"
                    className="w-full h-full object-cover opacity-30"
                />
                {/* Deep red-tinted dark overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-[#140505]/80 via-[#1A0A0A]/90 to-[#141010]"></div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-12 flex-1 justify-center">

                {/* Top Left Logo */}
                <div className="absolute top-6 left-6 md:top-8 md:left-12 flex items-center gap-2 group cursor-pointer z-50">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-brand-red p-1.5 rounded-lg">
                            <Clapperboard className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            FLIX
                        </span>
                    </Link>
                </div>

                {/* Signup Form Container */}
                <div className="w-full max-w-[480px] rounded-[24px] overflow-hidden shadow-2xl border border-white/5 relative z-20 flex flex-col">

                    {/* Top Red Section with Dot Pattern */}
                    <div className="bg-brand-red px-8 py-10 relative overflow-hidden">
                        {/* Dot Pattern Overlay */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>

                        <div className="relative z-10 text-center">
                            <h1 className="text-3xl font-bold mb-2">Join the Club</h1>
                            <p className="text-red-100 text-sm font-medium">Start your 30-day free trial today.</p>
                        </div>
                    </div>

                    {/* Bottom Dark Section (Form) */}
                    <div className="bg-[#1A1616] p-8">
                        <form className="flex flex-col gap-5 w-full" onSubmit={(e) => e.preventDefault()}>

                            {/* Full Name Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-300 ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-red transition-colors">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-[#241E1E] border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-600 focus:outline-[1.5px] focus:outline-brand-red transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-300 ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-red transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="w-full bg-[#241E1E] border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-600 focus:outline-[1.5px] focus:outline-brand-red transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-300 ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-red transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-[#241E1E] border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-600 focus:outline-[1.5px] focus:outline-brand-red transition-all tracking-widest text-lg h-[54px]"
                                    />
                                </div>
                                <p className="text-[11px] text-gray-500 ml-1 mt-1 font-medium">Must be at least 8 characters with one special symbol.</p>
                            </div>

                            {/* Terms Checkbox */}
                            <div className="mt-2 mb-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative shrink-0 flex items-center justify-center">
                                        <input type="checkbox" className="appearance-none w-5 h-5 border-[1.5px] border-gray-600 rounded-full bg-transparent checked:bg-brand-red checked:border-brand-red cursor-pointer transition-colors" />
                                        <span className="absolute w-2.5 h-2.5 bg-white rounded-full pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"></span>
                                    </div>
                                    <span className="text-[13px] text-gray-400 font-medium">
                                        I agree to the <a href="#" className="text-brand-red hover:underline">Terms of Service</a> and <a href="#" className="text-brand-red hover:underline">Privacy Policy</a>.
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button className="flex items-center justify-center gap-2 w-full bg-brand-red hover:bg-[#F40612] text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_20px_0_rgba(229,9,20,0.4)] hover:shadow-[0_4px_25px_0_rgba(229,9,20,0.6)] mt-2">
                                <span className="text-[17px]">Create Account</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center justify-center mt-6 mb-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative px-4 bg-[#1A1616] text-[11px] font-bold text-gray-500 tracking-wider">
                                    OR CONTINUE WITH
                                </div>
                            </div>

                            {/* Social Buttons */}
                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-[#2B2525] hover:bg-[#362E2E] border border-white/5 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
                                    {/* Simple Google SVG Icon */}
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-[#2B2525] hover:bg-[#362E2E] border border-white/5 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
                                    {/* Simple Apple SVG Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16">
                                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                                        <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                                    </svg>
                                    Apple
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

                {/* Bottom Login Link */}
                <div className="text-gray-400 mt-8 text-[15px] font-medium z-20">
                    Already have an account? <Link to="/login" className="text-brand-red hover:underline font-bold transition-all hover:brightness-110 drop-shadow-[0_0_8px_rgba(229,9,20,0.4)]">Sign in</Link>
                </div>

            </div>

            {/* Footer Details */}
            <div className="relative z-20 w-full mb-6 mt-4 flex justify-center text-[12px] text-gray-500 font-medium">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                        Servers Online
                    </span>
                    <span>© 2024 CinemaPro Inc.</span>
                    <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
                </div>
            </div>

        </div>
    );
};

export default Signup;
