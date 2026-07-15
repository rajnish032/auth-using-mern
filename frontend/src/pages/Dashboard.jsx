import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ProfileDropdown from '../components/UI/ProfileDropdown';

const Dashboard = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="min-h-screen bg-void editorial-grid fade-in">
            <nav className="bg-surface border-b border-faint">
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
                        <div className="flex items-center space-x-6">
                            <button 
                                onClick={toggleTheme}
                                className="text-muted hover:text-bone transition-colors p-2 border border-faint bg-surface hover:bg-void"
                                aria-label="Toggle theme"
                            >
                                {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                            </button>
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-surface border border-faint p-10">
                    <div className="flex items-center gap-6 mb-10 pb-10 border-b border-faint">
                        <div className="border border-structure p-4 text-accent">
                            <FiUser className="w-8 h-8" />
                        </div>
                        <div>
                            <span className="block font-ui text-xs uppercase tracking-widest text-muted mb-2">
                                Dashboard
                            </span>
                            <h2 className="font-display text-4xl text-bone">
                                Welcome, {user?.name || 'User'}!
                            </h2>
                            <p className="mt-2 text-muted">
                                You are successfully logged into the system.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-void border border-faint p-8">
                        <h3 className="font-display text-2xl text-bone mb-6">Account Details</h3>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-1 pb-4 border-b border-faint">
                                <dt className="font-ui text-xs uppercase tracking-widest text-muted mb-2">Name</dt>
                                <dd className="font-body text-bone">{user?.name}</dd>
                            </div>
                            <div className="sm:col-span-1 pb-4 border-b border-faint">
                                <dt className="font-ui text-xs uppercase tracking-widest text-muted mb-2">Email Address</dt>
                                <dd className="font-body text-bone">{user?.email}</dd>
                            </div>
                            <div className="sm:col-span-2 pb-4 border-b border-faint sm:border-0 sm:pb-0">
                                <dt className="font-ui text-xs uppercase tracking-widest text-muted mb-2">Account ID</dt>
                                <dd className="font-body text-bone">{user?._id}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
