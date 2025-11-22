import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Trash2, Eye, Clock, TrendingUp, Calendar } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import logo from '../assets/logo.png';

const HistoryPage = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = () => {
        const savedHistory = localStorage.getItem('prism_analysis_history');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    };

    const deleteItem = (id) => {
        const updated = history.filter(item => item.id !== id);
        setHistory(updated);
        localStorage.setItem('prism_analysis_history', JSON.stringify(updated));
        if (selectedAnalysis?.id === id) {
            setSelectedAnalysis(null);
        }
    };

    const clearAll = () => {
        if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
            setHistory([]);
            setSelectedAnalysis(null);
            localStorage.removeItem('prism_analysis_history');
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative selection:bg-purple-500/30">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-50" />
            </div>

            {/* Navbar */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                        <img src={logo} alt="Prism" className="w-8 h-8 object-contain" />
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
                    <button
                        onClick={() => navigate('/studio')}
                        className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition-transform"
                    >
                        Go to Studio
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12 relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-bold tracking-tighter text-white mb-4 text-glow flex items-center gap-4">
                                <History size={48} className="text-purple-400" />
                                Analysis History
                            </h1>
                            <p className="text-white/60 text-lg">
                                Review your past script analyses and track your improvements
                            </p>
                        </div>
                        {history.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={16} />
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {history.length === 0 ? (
                    // Empty State
                    <GlassCard className="text-center py-20">
                        <History size={64} className="mx-auto mb-6 text-white/20" />
                        <h2 className="text-2xl font-bold text-white mb-3">No Analysis History Yet</h2>
                        <p className="text-white/50 mb-8 max-w-md mx-auto">
                            Start analyzing scripts in the Studio to build your history
                        </p>
                        <button
                            onClick={() => navigate('/studio')}
                            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
                        >
                            Go to Studio
                        </button>
                    </GlassCard>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* History List */}
                        <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                            {history.map((item) => (
                                <GlassCard
                                    key={item.id}
                                    className={`cursor-pointer hover:bg-white/10 transition-all ${selectedAnalysis?.id === item.id ? 'border-2 border-purple-500/50 bg-white/5' : ''
                                        }`}
                                    onClick={() => setSelectedAnalysis(item)}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-white/40" />
                                            <span className="text-xs text-white/40">{formatDate(item.timestamp)}</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteItem(item.id);
                                            }}
                                            className="p-1 hover:bg-red-500/20 rounded transition-colors"
                                        >
                                            <Trash2 size={14} className="text-red-400" />
                                        </button>
                                    </div>

                                    <p className="text-white/70 text-sm mb-3 line-clamp-2">
                                        {item.script.substring(0, 100)}...
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-white/40">{item.audience}</span>
                                        <div className="flex items-center gap-1.5">
                                            <TrendingUp size={14} className="text-green-400" />
                                            <span className="text-sm font-bold text-white">{item.analysis.viral_score}</span>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>

                        {/* Analysis Details */}
                        <div className="lg:col-span-2">
                            {selectedAnalysis ? (
                                <GlassCard>
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-2xl font-bold text-white">Analysis Details</h2>
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                                                <TrendingUp size={20} className="text-green-400" />
                                                <span className="text-2xl font-bold text-white">{selectedAnalysis.analysis.viral_score}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <span className="text-white/40 text-sm">Date:</span>
                                                <p className="text-white">{formatDate(selectedAnalysis.timestamp)}</p>
                                            </div>
                                            <div>
                                                <span className="text-white/40 text-sm">Target Audience:</span>
                                                <p className="text-white">{selectedAnalysis.audience}</p>
                                            </div>
                                            <div>
                                                <span className="text-white/40 text-sm">Script:</span>
                                                <p className="text-white/70 mt-2 p-4 bg-white/5 rounded-xl">{selectedAnalysis.script}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-purple-500/30">
                                            <h3 className="text-sm font-bold text-purple-200 mb-2">Final Verdict</h3>
                                            <p className="text-white">{selectedAnalysis.analysis.overall_verdict}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold mb-3">Thumbnail Score: {selectedAnalysis.analysis.thumbnail_score}/10</h3>
                                            <p className="text-white/70 text-sm">{selectedAnalysis.analysis.thumbnail_feedback}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold mb-3">AI Comments ({selectedAnalysis.analysis.comments.length})</h3>
                                            <div className="space-y-3">
                                                {selectedAnalysis.analysis.comments.map((comment, i) => (
                                                    <div key={i} className="p-4 bg-white/5 rounded-xl">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="font-semibold text-white text-sm">{comment.agent}</span>
                                                            <span className="text-xs text-white/40">{comment.timestamp}</span>
                                                        </div>
                                                        <p className="text-white/70 text-sm mb-2">"{comment.text}"</p>
                                                        <span className={`text-xs ${comment.sentiment === 'positive' ? 'text-green-400' :
                                                            comment.sentiment === 'negative' ? 'text-red-400' : 'text-white/40'
                                                            }`}>
                                                            {comment.sentiment}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            ) : (
                                <GlassCard className="text-center py-20">
                                    <Eye size={64} className="mx-auto mb-6 text-white/20" />
                                    <h2 className="text-2xl font-bold text-white mb-3">Select an Analysis</h2>
                                    <p className="text-white/50">
                                        Click on any item from the history to view details
                                    </p>
                                </GlassCard>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-8 text-center text-white/20 text-sm relative z-10">
                &copy; 2025 Prism AI. All rights reserved.
            </footer>
        </div>
    );
};

export default HistoryPage;
