import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {
    Upload, Users, Activity, MessageSquare, AlertCircle, Terminal, Cpu, Eye, ThumbsUp, ThumbsDown, Sparkles, ArrowRight, RefreshCw, History, TrendingDown, Lightbulb, AlertTriangle, CheckCircle
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

// --- API CONFIGURATION ---
const apiKey = "AIzaSyCOb5wBgXXX9FJDt_AARLTxAnDdHK05EHs";

const AGENTS = [
    { id: 'skimmer', name: 'The Skimmer', role: 'Impatient Gen Z', color: '#f472b6', avatar: '⚡️' },
    { id: 'fan', name: 'The Superfan', role: 'Loyal Subscriber', color: '#4ade80', avatar: '😍' },
    { id: 'hater', name: 'The Critic', role: 'Skeptical Expert', color: '#f87171', avatar: '🧐' }
];

const TARGET_AUDIENCES = [
    "Gen Z Gamers",
    "Tech Professionals",
    "Beauty Enthusiasts",
    "Finance Bros",
    "Casual Vlog Watchers",
    "Education"
];

const InputSection = ({ script, setScript, audience, setAudience, thumbnail, handleThumbnailUpload, thumbnailPreview, error, runAnalysis }) => (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        <div className="text-center space-y-4 mb-12">
            <h1 className="text-6xl font-semibold tracking-tighter text-white drop-shadow-xl text-glow">
                Prism AI
            </h1>
            <p className="text-white/60 text-xl font-light max-w-2xl mx-auto">
                Predict your video's success with <span className="text-white font-medium">Agentic AI</span> before you hit publish.
            </p>
        </div>

        <GlassCard className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10">

                {/* Script Input */}
                <div className="space-y-4">
                    <label className="flex items-center gap-2 text-purple-300 font-medium tracking-wide text-sm uppercase">
                        <Terminal size={16} />
                        Video Script
                    </label>
                    <textarea
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        placeholder="Paste your video script here..."
                        className="glass-input w-full h-80 rounded-2xl p-5 text-white/90 outline-none resize-none font-mono text-sm placeholder:text-white/20"
                    />
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">

                    {/* Audience Selector */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-blue-300 font-medium tracking-wide text-sm uppercase">
                            <Users size={16} />
                            Target Audience
                        </label>
                        <div className="relative">
                            <select
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                className="glass-input w-full rounded-2xl p-4 text-white appearance-none outline-none cursor-pointer"
                            >
                                {TARGET_AUDIENCES.map(aud => <option key={aud} value={aud} className="bg-slate-900">{aud}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                                <ArrowRight size={16} className="rotate-90" />
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="flex-1 flex flex-col space-y-4">
                        <label className="flex items-center gap-2 text-pink-300 font-medium tracking-wide text-sm uppercase">
                            <Eye size={16} />
                            Thumbnail
                        </label>
                        <div className="relative group flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className={`glass-input h-full w-full rounded-2xl border-dashed border-2 ${thumbnailPreview ? 'border-transparent' : 'border-white/20'} flex flex-col items-center justify-center text-white/40 group-hover:bg-white/5 transition-all overflow-hidden`}>
                                {thumbnailPreview ? (
                                    <div className="relative w-full h-full">
                                        <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium backdrop-blur-sm">
                                            Change Image
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={32} className="mb-3 opacity-50" />
                                        <span className="text-sm font-medium">Drop image or click to browse</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {error && (
                <div className="mt-6 bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <button
                onClick={runAnalysis}
                className="mt-8 w-full bg-white text-black font-semibold py-5 rounded-2xl text-lg hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
            >
                <Sparkles size={20} className="text-purple-600" />
                Simulate Audience
            </button>
        </GlassCard>
    </div>
);

const LoadingScreen = ({ loadingStatus, loadingProgress }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-10 animate-in fade-in duration-700">
        <div className="relative">
            {/* Animated Rings */}
            <div className="absolute inset-0 rounded-full border border-white/10 w-40 h-40 animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full border border-purple-500/30 w-40 h-40 animate-pulse"></div>

            <GlassCard className="w-40 h-40 rounded-full flex items-center justify-center !p-0 backdrop-blur-3xl relative z-10">
                <Cpu className="text-white/80 animate-pulse" size={48} />
            </GlassCard>
        </div>

        <div className="text-center space-y-4 z-10">
            <h2 className="text-3xl font-light text-white tracking-tight">{loadingStatus}</h2>
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                <div
                    className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                />
            </div>
        </div>

        <div className="flex gap-6 mt-8">
            {AGENTS.map((agent, idx) => (
                <div key={agent.id} className={`glass-panel px-4 py-2 rounded-2xl flex items-center gap-3 transition-all duration-700 ${loadingProgress > (idx + 1) * 25 ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-8'}`}>
                    <span className="text-2xl">{agent.avatar}</span>
                    <span className="text-sm font-medium text-white/80">{agent.name}</span>
                </div>
            ))}
        </div>
    </div>
);

const Dashboard = ({ analysis, setStep, thumbnailPreview }) => {
    if (!analysis) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-700 pb-20">

            {/* Header */}
            <GlassCard className="flex flex-col md:flex-row justify-between items-center gap-6 !py-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-black font-bold text-xl shadow-[0_0_20px_rgba(52,211,153,0.4)] ${analysis.viral_score >= 70 ? 'bg-gradient-to-br from-green-400 to-emerald-600' :
                        analysis.viral_score >= 40 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                            'bg-gradient-to-br from-red-400 to-red-600'
                        }`}>
                        {analysis.viral_score}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">Viral Score</h2>
                        <p className="text-white/50 text-sm">Based on 1,000 simulations</p>
                    </div>
                </div>
                <button
                    onClick={() => setStep(0)}
                    className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-sm font-medium transition-colors flex items-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                >
                    <RefreshCw size={14} /> New Test
                </button>
            </GlassCard>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Main Chart */}
                <GlassCard className="lg:col-span-2 min-h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-medium text-white/90 flex items-center gap-2">
                            <Activity size={18} className="text-purple-400" /> Retention Forecast
                        </h3>
                    </div>

                    <div className="flex-1 w-full h-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analysis.retention_curve}>
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

                                        // Show dot if change is significant (> 5% drop or > 2% spike)
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
                </GlassCard>

                {/* Verdict Panel */}
                <div className="flex flex-col gap-6">
                    {thumbnailPreview && (
                        <GlassCard className="flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/10 text-3xl shadow-inner">
                                    {analysis.thumbnail_score >= 8 ? '🔥' : analysis.thumbnail_score >= 5 ? '😐' : '📉'}
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">{analysis.thumbnail_score}/10</h3>
                                <p className="text-white/40 text-sm uppercase tracking-wider font-medium">Thumbnail CTR</p>
                                <p className="text-white/80 text-sm mt-4 px-4 leading-relaxed">"{analysis.thumbnail_feedback}"</p>
                            </div>
                        </GlassCard>
                    )}

                    <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-900/40 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                            <Sparkles size={48} />
                        </div>
                        <h3 className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-2">Final Verdict</h3>
                        <p className="text-white font-medium text-lg leading-relaxed">
                            {analysis.overall_verdict}
                        </p>
                    </div>
                </div>
            </div>

            {/* Retention Drop Analysis */}
            {analysis.retention_drops && analysis.retention_drops.length > 0 && (
                <GlassCard>
                    <h3 className="text-lg font-medium text-white/90 flex items-center gap-2 mb-6">
                        <TrendingDown size={18} className="text-red-400" /> Retention Drop Analysis
                    </h3>
                    <div className="space-y-4">
                        {analysis.retention_drops.map((drop, i) => (
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
                </GlassCard>
            )}

            {/* Script Optimization */}
            {analysis.script_optimizations && analysis.script_optimizations.length > 0 && (
                <GlassCard>
                    <h3 className="text-lg font-medium text-white/90 flex items-center gap-2 mb-6">
                        <Lightbulb size={18} className="text-yellow-400" /> Script Optimization
                    </h3>
                    <div className="space-y-4">
                        {analysis.script_optimizations.map((opt, i) => (
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
                </GlassCard>
            )}

            {/* Comments Section */}
            <GlassCard>
                <h3 className="text-lg font-medium text-white/90 flex items-center gap-2 mb-6">
                    <MessageSquare size={18} className="text-blue-400" /> Simulated Engagement
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analysis.comments.map((comment, i) => {
                        const agent = AGENTS.find(a => a.name === comment.agent) || AGENTS[0];
                        return (
                            <div key={i} className="bg-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors border border-white/5">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg border border-white/10">
                                            {agent.avatar}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">{comment.agent}</div>
                                            <div className="text-[10px] text-white/40 uppercase font-medium tracking-wide">{agent.role}</div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-white/30 font-mono">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed mb-3">
                                    "{comment.text}"
                                </p>
                                <div className="flex items-center gap-2">
                                    {comment.sentiment === 'positive' ? <ThumbsUp size={12} className="text-green-400" /> :
                                        comment.sentiment === 'negative' ? <ThumbsDown size={12} className="text-red-400" /> : null}
                                    <span className={`text-xs font-medium ${comment.sentiment === 'positive' ? 'text-green-400' : comment.sentiment === 'negative' ? 'text-red-400' : 'text-white/30'}`}>
                                        {comment.sentiment}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>

        </div>
    );
};

const StudioPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(0); // 0: Input, 1: Loading, 2: Dashboard
    const [script, setScript] = useState('');
    const [audience, setAudience] = useState(TARGET_AUDIENCES[1]);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingStatus, setLoadingStatus] = useState('Initializing Agents...');
    const [error, setError] = useState('');


    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => setThumbnailPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const runAnalysis = async () => {
        if (!script) {
            setError('Please paste your video script to begin.');
            return;
        }
        setError('');
        setStep(1);

        const steps = [
            "Spinning up AI Personas...",
            "Reading Script...",
            "The Skimmer is getting bored...",
            "The Superfan is taking notes...",
            "Calculating Viral Potential...",
            "Generating Dashboard..."
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                setLoadingStatus(steps[currentStep]);
                setLoadingProgress((prev) => Math.min(prev + 15, 90));
                currentStep++;
            }
        }, 800);

        try {
            const systemPrompt = `
        You are "Prism AI", an AI engine that simulates a YouTube audience.
        Analyze the following Video Script for the target audience: "${audience}".
        
        Simulate 3 agents:
        1. The Skimmer (Short attention span)
        2. The Superfan (Loyal, looks for value)
        3. The Critic (Skeptical, looks for flaws)

        Return a VALID JSON object (NO MARKDOWN) with this structure:
        {
          "retention_curve": [
            {"time": "0:00", "score": 100, "segment": "Opening line..."},
            ... (10-15 points, score 0-100, "segment": "The specific line/topic at this moment")
          ],
          "comments": [
            {"agent": "The Skimmer", "text": "...", "timestamp": "0:45", "sentiment": "negative"},
            ... (5-8 realistic comments)
          ],
          "retention_drops": [
            {
              "timestamp": "0:40",
              "description": "Explanation of why the audience is dropping off...",
              "fix": "Specific suggestion to fix the script..."
            }
          ],
          "script_optimizations": [
            {
              "original": "The original weak line from the script...",
              "improvement": "The rewritten, better version...",
              "explanation": "Why this change works better..."
            }
          ],
          "thumbnail_score": 8, (0-10 integer),
          "thumbnail_feedback": "Short feedback...",
          "overall_verdict": "One sentence summary...",
          "viral_score": 85
        }
      `;

            const userPrompt = `SCRIPT:\n${script}`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userPrompt }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    generationConfig: { responseMimeType: "application/json" }
                })
            });

            const data = await response.json();

            if (!data.candidates || !data.candidates[0].content) {
                throw new Error("AI failed to generate analysis.");
            }

            const resultText = data.candidates[0].content.parts[0].text;
            const jsonResult = JSON.parse(resultText);

            // Save to Firestore if user is logged in
            if (user) {
                try {
                    await addDoc(collection(db, 'users', user.uid, 'analyses'), {
                        script,
                        audience,
                        thumbnail: thumbnailPreview || null,
                        analysis: jsonResult,
                        timestamp: Date.now()
                    });
                    console.log('Analysis saved to Firestore');
                } catch (firestoreError) {
                    console.error('Error saving to Firestore:', firestoreError);
                    // Continue even if Firestore save fails
                }
            } else {
                // Save to localStorage for non-logged in users
                try {
                    const historyItem = {
                        id: Date.now().toString(),
                        script,
                        audience,
                        thumbnail: thumbnailPreview || null,
                        analysis: jsonResult,
                        timestamp: Date.now()
                    };
                    const existingHistory = JSON.parse(localStorage.getItem('prism_analysis_history') || '[]');
                    const newHistory = [historyItem, ...existingHistory].slice(0, 20); // Limit to 20 items
                    localStorage.setItem('prism_analysis_history', JSON.stringify(newHistory));
                    console.log('Analysis saved to localStorage');
                } catch (storageError) {
                    console.error('Error saving to localStorage:', storageError);
                }
            }

            clearInterval(interval);
            setLoadingProgress(100);
            setAnalysis(jsonResult);
            setTimeout(() => setStep(2), 500);

        } catch (err) {
            clearInterval(interval);
            console.error(err);
            setError("Simulation failed. Please try again.");
            setStep(0);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
            {step !== 1 && (
                <nav className="flex justify-between items-center mb-10">
                    <div onClick={() => navigate('/')} className="flex items-center gap-3 font-semibold text-lg tracking-tight text-white/90 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="flex items-center justify-center">
                            <img src={logo} alt="Prism Logo" className="w-12 h-12 object-contain" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">Prism AI</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 flex items-center gap-2 backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                            Agents Online
                        </div>
                        <button
                            onClick={() => navigate('/history')}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium text-white transition-colors flex items-center gap-2"
                        >
                            <History size={16} />
                            <span>History</span>
                        </button>
                        {user ? (
                            <UserProfile />
                        ) : (
                            <button onClick={() => navigate('/signin')} className="text-sm text-white/60 hover:text-white transition-colors">Sign In</button>
                        )}
                    </div>
                </nav>
            )}

            {step === 0 && (
                <InputSection
                    script={script}
                    setScript={setScript}
                    audience={audience}
                    setAudience={setAudience}
                    thumbnail={thumbnail}
                    handleThumbnailUpload={handleThumbnailUpload}
                    thumbnailPreview={thumbnailPreview}
                    error={error}
                    runAnalysis={runAnalysis}
                />
            )}
            {step === 1 && (
                <LoadingScreen
                    loadingStatus={loadingStatus}
                    loadingProgress={loadingProgress}
                />
            )}
            {step === 2 && (
                <Dashboard
                    analysis={analysis}
                    setStep={setStep}
                    thumbnailPreview={thumbnailPreview}
                />
            )}

        </div>
    );
};

export default StudioPage;
