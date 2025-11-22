import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Users, Activity, Eye, Play } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import logo from '../assets/logo.png';


const LandingPage = () => {
    const navigate = useNavigate();

    const handleLaunch = () => {
        navigate('/studio');
    };



    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2 font-semibold text-lg tracking-tight text-white/90">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                        <img src={logo} alt="Prism Logo" className="w-8 h-8 object-contain" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Prism AI</span>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/pricing')}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                        Pricing
                    </button>
                    <button onClick={() => navigate('/signin')} className="text-sm text-white/60 hover:text-white transition-colors">Sign In</button>
                    <button
                        onClick={handleLaunch}
                        className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition-transform"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 container mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10 py-20">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles size={16} className="text-purple-400" />
                    <span className="text-sm text-white/80 font-medium">AI-Powered Audience Simulation</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 max-w-5xl mx-auto leading-[1.1] text-glow animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    Predict Viral Success <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Before You Publish</span>
                </h1>

                <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Stop guessing. Prism AI simulates your target audience using advanced AI agents to give you actionable feedback on scripts, thumbnails, and retention.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                    <button
                        onClick={handleLaunch}
                        className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        Launch Studio <ArrowRight size={20} />
                    </button>

                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-32 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                    <GlassCard className="text-left hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Users size={24} className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">AI Personas</h3>
                        <p className="text-white/50 leading-relaxed">
                            Simulate diverse viewer archetypes like "The Skimmer", "The Superfan", and "The Critic" to get well-rounded feedback.
                        </p>
                    </GlassCard>

                    <GlassCard className="text-left hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Activity size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Retention Forecasting</h3>
                        <p className="text-white/50 leading-relaxed">
                            Visualize second-by-second retention curves to identify exactly where viewers will drop off in your video.
                        </p>
                    </GlassCard>

                    <GlassCard className="text-left hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Eye size={24} className="text-pink-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Thumbnail Analysis</h3>
                        <p className="text-white/50 leading-relaxed">
                            Upload thumbnails to get predicted CTR scores and specific design feedback to maximize clicks.
                        </p>
                    </GlassCard>
                </div>

            </main>

            <footer className="container mx-auto px-6 py-8 text-center text-white/20 text-sm relative z-10">
                &copy; 2025 Prism AI. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
