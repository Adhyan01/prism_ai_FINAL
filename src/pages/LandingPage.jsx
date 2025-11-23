import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Users, Activity, Eye, Play, Zap, Shield, Target, BarChart3 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLaunch = () => {
        navigate('/studio');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative selection:bg-purple-500/30">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Purple Glow */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-purple-900/20 blur-[120px] pointer-events-none" />

            {/* Navbar */}
            <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex justify-between items-center relative z-20">
                <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group">
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Prism Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <span className="text-3xl font-bold tracking-tight">Prism AI</span>
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/pricing')} className="text-sm font-medium text-white/70 hover:text-white transition-colors">See Pricing</button>
                    {user ? (
                        <UserProfile />
                    ) : (
                        <>
                            <button onClick={() => navigate('/signin')} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Sign In</button>
                            <button
                                onClick={() => navigate('/signin')}
                                className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-100 transition-colors"
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-32 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Content */}
                    <div className="flex-1 text-left space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                            AI Audience Simulator V2.0
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                            Predict Viral <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Success Instantly.</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-lg text-white/60 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            Don't guess. Know. Test your scripts with <strong className="text-white">Our AI Agents</strong> to forecast retention, engagement, and thumbnail CTR before you hit publish.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row items-start gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <button
                                onClick={handleLaunch}
                                className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            >
                                <Zap size={20} className="fill-black" /> Start Analysis
                            </button>


                        </div>
                    </div>

                    {/* Right Content - Dashboard Mockup */}
                    <div className="flex-1 w-full max-w-xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                        <div className="relative rounded-2xl bg-[#0F0F11] border border-white/10 shadow-2xl overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
                            {/* Mockup Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">PREVIEW_MODE</div>
                            </div>

                            {/* Mockup Body */}
                            <div className="p-6 space-y-6">
                                {/* Graph Area */}
                                <div className="h-40 w-full rounded-xl bg-gradient-to-b from-purple-500/10 to-transparent border border-white/5 relative overflow-hidden flex items-end">
                                    <svg className="w-full h-full absolute bottom-0 left-0" preserveAspectRatio="none">
                                        <path d="M0,100 C50,80 100,90 150,85 C200,80 250,60 300,50 C350,40 400,20 450,10 L450,160 L0,160 Z" fill="url(#gradient)" opacity="0.2" />
                                        <path d="M0,100 C50,80 100,90 150,85 C200,80 250,60 300,50 C350,40 400,20 450,10" fill="none" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#a855f7" />
                                                <stop offset="100%" stopColor="transparent" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                            <Target size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-white/40 uppercase tracking-wider">Viral Score</div>
                                            <div className="text-xl font-bold text-white">94/100</div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Activity size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-white/40 uppercase tracking-wider">Retention</div>
                                            <div className="text-xl font-bold text-white">68%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mt-32 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                    {/* Card 1 */}
                    <div className="group p-8 rounded-3xl bg-[#0F0F11] border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:bg-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users size={120} />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Agentic Audience Simulation</h3>
                        <p className="text-white/50 leading-relaxed max-w-sm">
                            We simulate specific personas like "The Realist", "The Admirer", and "The Skimmer" to give you brutal, honest feedback.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group p-8 rounded-3xl bg-[#0F0F11] border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <BarChart3 size={120} />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                            <BarChart3 size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Retention Forecast</h3>
                        <p className="text-white/50 leading-relaxed max-w-sm">
                            Visualize drop-off points in your script instantly. See exactly where you lose your audience.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group p-8 rounded-3xl bg-[#0F0F11] border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:bg-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Shield size={120} />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Flop Protection</h3>
                        <p className="text-white/50 leading-relaxed max-w-sm">
                            Identify weak hooks and boring mid-rolls to save your ROI before you even film.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="group p-8 rounded-3xl bg-[#0F0F11] border border-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:bg-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target size={120} />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                            <Eye size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Thumbnail & Hook Analysis</h3>
                        <p className="text-white/50 leading-relaxed max-w-sm">
                            Upload your thumbnail alongside your script. Our multi-modal AI predicts Click-Through Rate (CTR) based on visual psychology.
                        </p>
                    </div>
                </div>

            </main>

            <footer className="container mx-auto px-6 py-8 text-center text-white/20 text-sm relative z-10 border-t border-white/5">
                &copy; 2025 Prism AI. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
