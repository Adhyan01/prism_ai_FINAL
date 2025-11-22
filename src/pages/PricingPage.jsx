import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Zap, Infinity } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import logo from '../assets/logo.png';

const PricingPage = () => {
    const navigate = useNavigate();

    const plans = [
        {
            name: 'Basic',
            price: 'Free',
            period: 'forever',
            icon: Sparkles,
            color: 'from-blue-400 to-cyan-400',
            features: [
                '10 scripts per month',
                '10 thumbnails per month',
                'AI persona simulations',
                'Retention forecasting',
                'Basic analytics'
            ],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Intermediate',
            price: '₹199',
            period: 'per month',
            icon: Zap,
            color: 'from-purple-400 to-pink-400',
            features: [
                '35 scripts per month',
                '35 thumbnails per month',
                'Advanced AI personas',
                'Detailed retention analysis',
                'Priority support',
                'Export reports'
            ],
            cta: 'Start Free Trial',
            popular: true
        },
        {
            name: 'Pro',
            price: '₹499',
            period: 'per month',
            icon: Infinity,
            color: 'from-orange-400 to-red-400',
            features: [
                'Unlimited scripts',
                'Unlimited thumbnails',
                'All AI personas',
                'Advanced analytics',
                'White-label reports',
                'API access',
                'Dedicated support',
                'Custom integrations'
            ],
            cta: 'Go Pro',
            popular: false
        }
    ];

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
                        onClick={() => navigate('/')}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                        Home
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
            <main className="container mx-auto px-6 py-20 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                        <Sparkles size={16} className="text-purple-400" />
                        <span className="text-sm text-white/80 font-medium">Simple, Transparent Pricing</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6 max-w-4xl mx-auto leading-[1.1] text-glow">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Start free and scale as you grow. All plans include our core AI-powered features.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    {plans.map((plan, index) => {
                        const Icon = plan.icon;
                        return (
                            <GlassCard
                                key={plan.name}
                                className={`relative overflow-hidden hover:scale-105 transition-all duration-300 ${plan.popular ? 'border-2 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.4)] scale-110 -mt-4' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                                        POPULAR
                                    </div>
                                )}

                                <div className="flex flex-col h-full">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                                        <Icon size={28} className="text-white" />
                                    </div>

                                    {/* Plan Name */}
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold text-white">{plan.price}</span>
                                        </div>
                                        <span className="text-white/50 text-sm">{plan.period}</span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check size={14} className="text-green-400" />
                                                </div>
                                                <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => navigate('/studio')}
                                        className={`w-full py-4 rounded-xl font-semibold text-base transition-all ${plan.popular
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105'
                                            : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                                            }`}
                                    >
                                        {plan.cta}
                                    </button>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>

                {/* FAQ or Additional Info */}
                <div className="text-center mt-20 animate-in fade-in duration-1000 delay-500">
                    <p className="text-white/50 text-sm">
                        All plans include a 14-day free trial. No credit card required. Cancel anytime.
                    </p>
                </div>

                {/* Terms and Conditions */}
                <div className="mt-32 max-w-5xl mx-auto animate-in fade-in duration-1000 delay-700">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Terms & Conditions</h2>
                    <GlassCard className="text-left">
                        <div className="space-y-6 text-white/70 text-sm leading-relaxed">
                            <div>
                                <h3 className="text-white font-semibold mb-2">1. Billing & Payment</h3>
                                <p>All paid plans are billed monthly in advance. Payment is processed through secure payment gateways. Prices are in Indian Rupees (₹) unless otherwise stated.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">2. Free Trial</h3>
                                <p>New users receive a 14-day free trial of any paid plan. No credit card is required to start the trial. You can cancel anytime during the trial period without being charged.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">3. Usage Limits</h3>
                                <p>Each plan has specific monthly limits for scripts and thumbnails as outlined above. Unused limits do not roll over to the next month. Exceeding your plan's limits will require an upgrade to continue using the service.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">4. Cancellation Policy</h3>
                                <p>You may cancel your subscription at any time from your account settings. Cancellations take effect at the end of your current billing period. You will retain access to paid features until the end of the paid period.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">5. Refund Policy</h3>
                                <p>We offer a 7-day money-back guarantee for first-time subscribers. Refund requests must be made within 7 days of your initial purchase. Subsequent renewals are non-refundable.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">6. Price Changes</h3>
                                <p>We reserve the right to modify our pricing at any time. Existing subscribers will be notified 30 days in advance of any price changes and will be grandfathered into their current pricing until their next renewal after the notice period.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">7. Service Availability</h3>
                                <p>We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be announced in advance. AI model availability may vary based on third-party API providers.</p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">8. Data & Privacy</h3>
                                <p>Your scripts, thumbnails, and analysis data are stored securely and are never shared with third parties. You retain full ownership of all content you upload. We use AI models to analyze your content but do not use your data to train our models.</p>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="text-white/50 text-xs">
                                    By subscribing to any plan, you agree to our full Terms of Service and Privacy Policy. For questions, contact us at support@prism.ai
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-8 text-center text-white/20 text-sm relative z-10">
                &copy; 2025 Prism AI. All rights reserved.
            </footer>
        </div>
    );
};

export default PricingPage;
