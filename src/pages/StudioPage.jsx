import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {
    Upload, Users, Activity, MessageSquare, AlertCircle, Terminal, Cpu, Eye, ThumbsUp, ThumbsDown, Sparkles, ArrowRight, RefreshCw, History
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
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

const Dashboard = ({ analysis, setStep }) => {
    if (!analysis) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-700 pb-20">

            {/* Header */}
            <GlassCard className="flex flex-col md:flex-row justify-between items-center gap-6 !py-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold text-xl shadow-[0_0_20px_rgba(52,211,153,0.4)]">
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
                                    contentStyle={{ backgroundColor: 'rgba(20,20,20,0.8)', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
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
                                    dot={{ fill: '#1e1e1e', strokeWidth: 2, stroke: '#c084fc', r: 4 }}
                                    activeDot={{ r: 8, fill: '#fff', stroke: 'none' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Verdict Panel */}
                <div className="flex flex-col gap-6">
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
            {"time": "0:00", "score": 100, "event": "Intro"},
            ... (10-15 points every 30-60s, score 0-100)
          ],
          "comments": [
            {"agent": "The Skimmer", "text": "...", "timestamp": "0:45", "sentiment": "negative"},
            ... (5-8 realistic comments)
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
        <div className="container mx-auto px-6 py-8">
            {step !== 1 && (
                <nav className="flex justify-between items-center mb-10">
                    <div onClick={() => navigate('/')} className="flex items-center gap-3 font-semibold text-lg tracking-tight text-white/90 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                            <img src={logo} alt="Prism Logo" className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Prism AI</span>
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
                />
            )}

        </div>
    );
};

export default StudioPage;
