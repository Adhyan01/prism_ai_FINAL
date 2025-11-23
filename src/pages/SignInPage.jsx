import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import GlassCard from '../components/GlassCard';
import logo from '../assets/logo.png';

const SignInPage = () => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("User signed in:", user);
            navigate('/studio');
        } catch (error) {
            console.error("Error signing in:", error);
            alert("Failed to sign in. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative selection:bg-purple-500/30 flex items-center justify-center">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                <GlassCard className="text-center py-12">
                    <div className="mb-8 flex justify-center">
                        <div className="flex items-center justify-center">
                            <img src={logo} alt="Prism Logo" className="w-20 h-20 object-contain" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
                    <p className="text-white/60 mb-8">Sign in to continue to Prism AI</p>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-3.5 rounded-xl bg-white text-black font-semibold hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign in with Google
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 text-sm text-white/40 hover:text-white transition-colors"
                    >
                        Back to Home
                    </button>
                </GlassCard>
            </div>
        </div>
    );
};

export default SignInPage;
