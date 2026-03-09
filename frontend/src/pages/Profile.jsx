import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldCheck, Lock, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    // State for name update
    const [name, setName] = useState(user?.fullname || '');
    const [isUpdatingName, setIsUpdatingName] = useState(false);
    const [nameSuccess, setNameSuccess] = useState('');
    const [nameError, setNameError] = useState('');

    // State for password update
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Redirect if not logged in
    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    // Get initials for avatar
    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2) || 'U';
    };

    const handleUpdateName = async (e) => {
        e.preventDefault();
        setNameSuccess('');
        setNameError('');

        if (!name.trim()) {
            setNameError('Name cannot be empty');
            return;
        }

        if (name === user.fullname) {
            return; // No change
        }

        setIsUpdatingName(true);
        try {
            await updateProfile({ fullname: name });
            setNameSuccess('Profile name updated successfully');
            setTimeout(() => setNameSuccess(''), 3000);
        } catch (error) {
            setNameError(error.response?.data?.message || 'Failed to update name');
        } finally {
            setIsUpdatingName(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setPasswordSuccess('');
        setPasswordError('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError('Please fill in all password fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters long');
            return;
        }

        setIsUpdatingPassword(true);
        try {
            await updateProfile({
                currentPassword,
                newPassword
            });
            setPasswordSuccess('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setPasswordSuccess(''), 3000);
        } catch (error) {
            setPasswordError(error.response?.data?.message || 'Failed to update password');
        } finally {
            setIsUpdatingPassword(false);
        }
    };

    return (
        <div className="pt-24 pb-12 min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <User className="w-8 h-8 text-brand-red" />
                    Account Settings
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-white/10 sticky top-28">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-linear-to-br from-brand-red to-red-900 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg border-4 border-white dark:border-gray-800">
                                    {getInitials(user.fullname)}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user.fullname}</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{user.email}</p>

                                <div className="w-full pt-4 border-t border-gray-100 dark:border-white/10 flex flex-col gap-3 text-sm">
                                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-brand-red" />
                                            <span>Account Role</span>
                                        </div>
                                        <span className="capitalize font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-xs">
                                            {user.role}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-brand-red" />
                                            <span>Email Status</span>
                                        </div>
                                        <span className="text-green-600 dark:text-green-400 flex items-center gap-1 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full text-xs">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Verified
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Forms */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Edit Profile Info Form */}
                        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-white/10">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/10 pb-4">
                                Personal Information
                            </h3>

                            <form onSubmit={handleUpdateName} className="space-y-4">
                                {nameSuccess && (
                                    <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm flex items-center gap-2 border border-green-200 dark:border-green-800">
                                        <CheckCircle2 className="w-5 h-5" />
                                        {nameSuccess}
                                    </div>
                                )}
                                {nameError && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-200 dark:border-red-800">
                                        <AlertCircle className="w-5 h-5" />
                                        {nameError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address <span className="text-gray-400 dark:text-gray-500 text-xs font-normal ml-2">(Cannot be changed)</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                        className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-3 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                    />
                                </div>

                                <div className="pt-4 text-right">
                                    <button
                                        type="submit"
                                        disabled={isUpdatingName || name === user.fullname}
                                        className="bg-brand-red hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isUpdatingName ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Change Password Form */}
                        <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-white/10">
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-white/10 pb-4">
                                <Lock className="w-5 h-5 text-gray-900 dark:text-white" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Change Password
                                </h3>
                            </div>

                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                {passwordSuccess && (
                                    <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm flex items-center gap-2 border border-green-200 dark:border-green-800">
                                        <CheckCircle2 className="w-5 h-5" />
                                        {passwordSuccess}
                                    </div>
                                )}
                                {passwordError && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-200 dark:border-red-800">
                                        <AlertCircle className="w-5 h-5" />
                                        {passwordError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 pr-10 text-gray-900 dark:text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
                                            placeholder="New password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-colors"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 text-right">
                                    <button
                                        type="submit"
                                        disabled={isUpdatingPassword || !currentPassword || !newPassword || !confirmPassword}
                                        className="bg-brand-red hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
