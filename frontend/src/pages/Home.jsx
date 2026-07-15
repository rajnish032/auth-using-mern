import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiZap, FiLock, FiGlobe, FiCode, FiUserCheck, FiChevronRight, FiSun, FiMoon } from 'react-icons/fi';
import Button from '../components/UI/Button';
import { useSelector } from 'react-redux';
import ProfileDropdown from '../components/UI/ProfileDropdown';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="min-h-screen bg-void editorial-grid flex flex-col fade-in">
            {/* Navbar */}
            <nav className="bg-surface border-b border-faint sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                            <div className="w-8 h-8 border border-accent flex items-center justify-center bg-void">
                                <span className="font-display text-accent font-bold text-lg leading-none">V</span>
                            </div>
                            <h1 className="font-display text-xl text-bone tracking-tight">
                                VestAuth
                            </h1>
                        </Link>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="font-ui text-[10px] uppercase tracking-widest text-muted hover:text-bone transition-colors">Features</a>
                            <a href="#integration" className="font-ui text-[10px] uppercase tracking-widest text-muted hover:text-bone transition-colors">Integration</a>
                        </div>
                        <div className="flex items-center space-x-6">
                            <button 
                                onClick={toggleTheme}
                                className="text-muted hover:text-bone transition-colors p-2 border border-faint bg-surface hover:bg-void"
                                aria-label="Toggle theme"
                            >
                                {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                            </button>
                            {user ? (
                                <ProfileDropdown />
                            ) : (
                                <>
                                    <Link 
                                        to="/login" 
                                        className="font-ui text-[10px] uppercase tracking-widest text-muted hover:text-bone transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link to="/register">
                                        <Button className="!py-2 !px-4 !text-[10px]">
                                            Create Account
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col">
                <section className="relative flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <div className="w-[800px] h-[800px] border border-accent rounded-full"></div>
                        <div className="w-[600px] h-[600px] border border-accent rounded-full absolute"></div>
                        <div className="w-[400px] h-[400px] border border-accent rounded-full absolute"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 font-ui text-[10px] uppercase tracking-widest text-accent mb-8 border border-accent/30 px-3 py-1 bg-accent/5">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                            Production Ready
                        </span>
                        <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl text-bone leading-[1.1] mb-8">
                            Precision Auth <br />
                            <span className="text-muted italic font-light">for the Modern Web</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-muted mb-12 max-w-2xl mx-auto font-body font-light leading-relaxed">
                            An uncompromising, editorial-grade identity platform. 
                            Engineered with military-grade security, frictionless OAuth, and elegant OTP workflows.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {user ? (
                                <Link to="/dashboard" className="w-full sm:w-auto">
                                    <Button className="!py-4 !px-10 text-xs w-full sm:w-auto">
                                        Go to Dashboard <FiArrowRight className="ml-2 inline" />
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="w-full sm:w-auto">
                                        <Button className="!py-4 !px-10 text-xs w-full sm:w-auto">
                                            Start Building <FiArrowRight className="ml-2 inline" />
                                        </Button>
                                    </Link>
                                    <Link to="/login" className="flex items-center justify-center font-ui text-[10px] uppercase tracking-widest text-bone hover:text-accent transition-colors border border-faint py-4 px-10 w-full sm:w-auto bg-surface hover:bg-void">
                                        Sign In to Dashboard
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Integration Preview */}
                <section id="integration" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                    <div className="bg-surface border border-faint p-1 sm:p-2">
                        <div className="border border-faint bg-void p-6 sm:p-10">
                            <div className="flex items-center gap-4 border-b border-faint pb-6 mb-6">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full border border-faint"></div>
                                    <div className="w-3 h-3 rounded-full border border-faint"></div>
                                    <div className="w-3 h-3 rounded-full border border-faint"></div>
                                </div>
                                <div className="font-ui text-[10px] text-muted tracking-widest uppercase">integration.js</div>
                            </div>
                            <pre className="font-mono text-sm text-bone overflow-x-auto">
                                <code className="block text-muted">{'// 1. Initialize the client'}</code>
                                <code className="block mt-2">import {'{ VestAuth }'} from '@vestauth/client';</code>
                                <code className="block mt-2">const auth = new VestAuth({'{'}</code>
                                <code className="block text-accent">    clientId: 'YOUR_CLIENT_ID',</code>
                                <code className="block text-accent">    theme: 'dark-editorial'</code>
                                <code className="block">{'}'});</code>
                                <code className="block mt-6 text-muted">{'// 2. Protect your routes instantly'}</code>
                                <code className="block mt-2">await auth.requireSignIn();</code>
                                <code className="block mt-2 text-structure">console.log('User authenticated!', auth.user);</code>
                            </pre>
                        </div>
                    </div>
                </section>

                {/* Features / Decorative Grid */}
                <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                    <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-structure pb-8">
                        <div>
                            <h2 className="font-display text-4xl text-bone mb-2">Uncompromising Infrastructure</h2>
                            <p className="font-body text-muted">Everything you need, nothing you don't.</p>
                        </div>
                        <Link to="/register" className="font-ui text-[10px] uppercase tracking-widest text-accent hover:text-bone transition-colors flex items-center">
                            View Documentation <FiChevronRight className="ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-faint border border-faint">
                        <FeatureCard 
                            icon={<FiShield />} 
                            title="Military-Grade" 
                            desc="Advanced bcrypt encryption, stateless JWTs, and rigorous security protocols to protect sensitive user data natively."
                        />
                        <FeatureCard 
                            icon={<FiZap />} 
                            title="Lightning Fast" 
                            desc="Optimized state resolution and extremely lightweight client bundle ensures zero-layout-shift authentications."
                        />
                        <FeatureCard 
                            icon={<FiGlobe />} 
                            title="Google OAuth" 
                            desc="Seamless one-click third-party integrations with Google Workspace and personal accounts out of the box."
                        />
                        <FeatureCard 
                            icon={<FiLock />} 
                            title="OTP Workflows" 
                            desc="Beautiful, secure email verification via 6-digit one-time passwords built directly into the onboarding experience."
                        />
                        <FeatureCard 
                            icon={<FiCode />} 
                            title="Developer First" 
                            desc="Clean RESTful endpoints and predictable Redux-toolkit state management makes extension trivial."
                        />
                        <FeatureCard 
                            icon={<FiUserCheck />} 
                            title="Session Control" 
                            desc="Absolute authority over user sessions, automatic token expiration, and secure HttpOnly cookie management."
                        />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-faint bg-surface mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border border-accent flex items-center justify-center bg-void">
                                <span className="font-display text-accent font-bold text-[10px] leading-none">V</span>
                            </div>
                            <span className="font-display text-bone tracking-tight">VestAuth</span>
                        </div>
                        <div className="flex gap-8 font-ui text-[10px] uppercase tracking-widest text-muted">
                            <a href="#" className="hover:text-bone transition-colors">Privacy</a>
                            <a href="#" className="hover:text-bone transition-colors">Terms</a>
                            <a href="#" className="hover:text-bone transition-colors">Documentation</a>
                        </div>
                        <div className="font-body text-xs text-muted">
                            &copy; {new Date().getFullYear()} VestAuth. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-surface p-10 hover:bg-void transition-colors group">
        <div className="w-12 h-12 border border-structure flex items-center justify-center mb-8 group-hover:border-accent transition-colors bg-void">
            <div className="text-muted group-hover:text-accent transition-colors">
                {icon}
            </div>
        </div>
        <h3 className="font-display text-2xl text-bone mb-4">{title}</h3>
        <p className="text-sm text-muted font-body leading-relaxed">
            {desc}
        </p>
    </div>
);

export default Home;
