import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';
import { FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    // Get initials for avatar
    const initials = user.name ? user.name.substring(0, 2).toUpperCase() : 'U';

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
            >
                <div className="w-9 h-9 border border-accent bg-surface flex items-center justify-center text-bone font-display font-bold text-sm">
                    {initials}
                </div>
                <FiChevronDown className={`text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-surface border border-faint shadow-2xl z-50 fade-in">
                    <div className="p-5 border-b border-faint">
                        <p className="font-display text-lg text-bone truncate">{user.name}</p>
                        <p className="font-ui text-[10px] uppercase tracking-widest text-muted truncate mt-1">{user.email}</p>
                    </div>
                    
                    <div className="p-2">
                        <Link 
                            to="/dashboard"
                            className="flex items-center gap-3 w-full p-3 text-sm text-bone hover:bg-void transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <FiUser className="text-accent" />
                            Dashboard
                        </Link>
                        
                        <button 
                            onClick={onLogout}
                            className="flex items-center gap-3 w-full p-3 text-sm text-accent hover:bg-void transition-colors text-left"
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
