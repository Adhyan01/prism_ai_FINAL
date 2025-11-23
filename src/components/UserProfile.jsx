import React, { useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const UserProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        console.log('Logout button clicked');
        try {
            console.log('Attempting to sign out...');
            await signOut(auth);
            console.log('Sign out successful');
            setIsOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Failed to sign out: ' + error.message);
        }
    };

    if (!user) return null;

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                        <User size={20} className="text-white" />
                    </div>
                )}
                <span className="text-sm font-medium text-white hidden md:block">
                    {user.displayName || 'User'}
                </span>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl z-[100]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{user.displayName}</p>
                        <p className="text-xs text-white/60 mt-1">{user.email}</p>
                    </div>
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Sign Out clicked via div');
                            handleLogout();
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleLogout();
                            }
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-white hover:bg-red-500/20 transition-colors rounded-b-xl cursor-pointer active:bg-red-500/30"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
