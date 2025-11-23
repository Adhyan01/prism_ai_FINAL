import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import StudioPage from './pages/StudioPage';
import PricingPage from './pages/PricingPage';
import HistoryPage from './pages/HistoryPage';
import SignInPage from './pages/SignInPage';

export default function Prism() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
          {/* Dynamic Animated Background */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[150px] animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/studio" element={<StudioPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/signin" element={<SignInPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}