import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    History, Trash2, Eye, Clock, TrendingUp, Calendar, Activity, TrendingDown, Lightbulb, AlertTriangle, CheckCircle, AlertCircle, Sparkles, ArrowRight
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import GlassCard from '../components/GlassCard';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import { db } from '../firebase';
import { collection, query, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';

const HistoryPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);

    useEffect(() => {
        loadHistory();
    }, [user]);

    const loadHistory = async () => {
        if (user) {
            try {
                const q = query(
                    collection(db, 'users', user.uid, 'analyses'),
                    orderBy('timestamp', 'desc')
                );
                const querySnapshot = await getDocs(q);
                const analyses = [];
                querySnapshot.forEach((doc) => {
                    analyses.push({ id: doc.id, ...doc.data() });
                });
                setHistory(analyses);
                console.log('Loaded history from Firestore:', analyses.length, 'items');
            } catch (error) {
                console.error('Error loading from Firestore:', error);
                // Fall back to localStorage if Firestore fails
                const savedHistory = localStorage.getItem('prism_analysis_history');
                if (savedHistory) {
                    setHistory(JSON.parse(savedHistory));
                }
            }
        } else {
            // Load from localStorage if not logged in
            const savedHistory = localStorage.getItem('prism_analysis_history');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        }
    };

    const deleteItem = async (id) => {
        if (user) {
            try {
                await deleteDoc(doc(db, 'users', user.uid, 'analyses', id));
                console.log('Deleted from Firestore');
            } catch (error) {
                console.error('Error deleting from Firestore:', error);
            }
        }

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
            <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex justify-between items-center relative z-10">
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Prism" className="w-12 h-12 object-contain" />
                    </div>
                    <span className="text-3xl font-bold tracking-tight">Prism AI</span>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/pricing')}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                        Pricing
                    </button>
                    {user ? (
                        <UserProfile />
                    ) : (
                        <button onClick={() => navigate('/signin')} className="text-sm text-white/60 hover:text-white transition-colors">Sign In</button>
                    )}
                    <button
                        onClick={() => navigate('/studio')}
                        className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition-transform"
                    >
                        Go to Studio
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12 relative z-10">
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

                                    {/* Retention Chart */}
                                    {selectedAnalysis.analysis.retention_curve && (
                                        <div className="mb-8 h-[300px] w-full">
                                            <h3 className="text-lg font-medium text-white/90 flex items-center gap-2 mb-4">
                                                <Activity size={18} className="text-purple-400" /> Retention Forecast
                                            </h3>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={selectedAnalysis.analysis.retention_curve}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                                    <XAxis
                                                        dataKey="time"
                                                        stroke="rgba(255,255,255,0.3)"
                                                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                                                        axisLine={false}
                                                        tickLine={false}
                                                        dy={10}
                                                        hide={true}
                                                    />
                                                    <YAxis
                                                        stroke="rgba(255,255,255,0.3)"
                                                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                                                        axisLine={false}
                                                        tickLine={false}
                                                        domain={[0, 100]}
                                                        dx={-10}
                                                    />
                                                    <Tooltip
                                                        content={({ active, payload }) => {
                                                            if (active && payload && payload.length) {
                                                                const data = payload[0].payload;
                                                                return (
                                                                    <div className="bg-[#1a1a1a] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[200px] max-w-[300px]">
                                                                        <p className="text-white font-medium text-sm mb-3 leading-relaxed">
                                                                            "{data.segment || data.event || '...'}"
                                                                        </p>
                                                                        <div className="flex items-center gap-2">
                                                                            <div className={`w-2 h-2 rounded-full ${data.score >= 80 ? 'bg-green-500' : data.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                                                            <span className="text-white font-bold text-lg">
                                                                                Score: {data.score}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        }}
                                                    />
                                                    <ReferenceLine y={50} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
                                                    <defs>
                                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                                            <stop offset="0%" stopColor="#c084fc" />
                                                            <stop offset="100%" stopColor="#60a5fa" />
                                                        </linearGradient>
                                                    </defs>
                                                    <Line
                                                        type="monotone"
                                                        dataKey="score"
                                                        stroke="url(#lineGradient)"
                                                        strokeWidth={4}
                                                        dot={({ cx, cy, payload, index, data }) => {
                                                            if (index === 0 || !data || !data[index - 1]) return null;
                                                            const prev = data[index - 1].score;
                                                            const curr = payload.score;
                                                            const diff = curr - prev;

                                                            if (diff < -5 || diff > 2) {
                                                                return (
                                                                    <g>
                                                                        <circle cx={cx} cy={cy} r={6} fill={diff < 0 ? "#ef4444" : "#22c55e"} stroke="#fff" strokeWidth={2} />
                                                                        <text x={cx} y={cy - 15} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">
                                                                            {diff > 0 ? '+' : ''}{diff.toFixed(0)}%
                                                                        </text>
                                                                    </g>
                                                                );
                                                            }
                                                            return null;
                                                        }}
                                                        activeDot={{ r: 8, fill: '#fff', stroke: 'rgba(139,92,246,0.5)', strokeWidth: 4 }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-purple-500/30">
                                            <h3 className="text-sm font-bold text-purple-200 mb-2">Final Verdict</h3>
                                            <p className="text-white">{selectedAnalysis.analysis.overall_verdict}</p>
                                        </div>

                                        {/* Retention Drop Analysis */}
                                        {selectedAnalysis.analysis.retention_drops && selectedAnalysis.analysis.retention_drops.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium text-white/90 flex items-center gap-2 mb-4">
                                                    <TrendingDown size={18} className="text-red-400" /> Retention Drop Analysis
                                                </h3>
                                                <div className="space-y-4">
                                                    {selectedAnalysis.analysis.retention_drops.map((drop, i) => (
                                                        <div key={i} className="bg-[#1a1a1a] border border-red-500/20 rounded-2xl p-6 relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
                                                            <div className="flex flex-col md:flex-row gap-6">
                                                                <div className="flex-shrink-0 text-center md:text-left">
                                                                    <div className="text-3xl font-bold text-red-400">{drop.timestamp}</div>
                                                                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mt-1">TIMESTAMP</div>
                                                                </div>
                                                                <div className="flex-1 space-y-4">
                                                                    <div>
                                                                        <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                                                                            <AlertTriangle size={14} /> Drop Detected
                                                                        </div>
                                                                        <p className="text-white/80 leading-relaxed text-sm">
                                                                            {drop.description}
                                                                        </p>
                                                                    </div>
                                                                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                                                                        <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider mb-2">
                                                                            <Lightbulb size={12} /> Fix
                                                                        </div>
                                                                        <p className="text-teal-100 text-sm leading-relaxed font-medium">
                                                                            {drop.fix}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Script Optimization */}
                                        {selectedAnalysis.analysis.script_optimizations && selectedAnalysis.analysis.script_optimizations.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium text-white/90 flex items-center gap-2 mb-4">
                                                    <Lightbulb size={18} className="text-yellow-400" /> Script Optimization
                                                </h3>
                                                <div className="space-y-4">
                                                    {selectedAnalysis.analysis.script_optimizations.map((opt, i) => (
                                                        <div key={i} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
                                                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                                                <div className="space-y-2">
                                                                    <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                                                                        <AlertCircle size={12} /> Original Weakness
                                                                    </div>
                                                                    <p className="text-white/60 line-through decoration-red-500/50 decoration-2 text-lg font-serif italic leading-relaxed">
                                                                        "{opt.original}"
                                                                    </p>
                                                                </div>

                                                                <div className="relative">
                                                                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block text-white/20">
                                                                        <ArrowRight size={20} />
                                                                    </div>
                                                                    <div className="space-y-3">
                                                                        <div className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-2">
                                                                            <Sparkles size={12} /> AI Improvement
                                                                        </div>
                                                                        <p className="text-white font-medium text-lg leading-relaxed">
                                                                            "{opt.improvement}"
                                                                        </p>
                                                                        <p className="text-white/40 text-xs italic">
                                                                            "{opt.explanation}"
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {selectedAnalysis.thumbnail && (
                                            <div>
                                                <h3 className="text-white font-semibold mb-3">Thumbnail Score: {selectedAnalysis.analysis.thumbnail_score}/10</h3>
                                                <p className="text-white/70 text-sm">{selectedAnalysis.analysis.thumbnail_feedback}</p>
                                            </div>
                                        )}

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
            <footer className="max-w-7xl mx-auto px-4 lg:px-8 py-8 text-center text-white/20 text-sm relative z-10">
                &copy; 2025 Prism AI. All rights reserved.
            </footer>
        </div>
    );
};

export default HistoryPage;
