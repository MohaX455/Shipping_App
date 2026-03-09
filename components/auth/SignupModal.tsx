"use client";

import Modal from '@/components/ui/Modal';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { showToast } from '@/lib/toast/toast';

type Props = {
    open: boolean;
    onClose: () => void;
    openLogin: () => void;
};

export default function SignupModal({ open, onClose, openLogin }: Props) {
    const { signup, isLoading, clearError } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        address: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [localError, setLocalError] = useState<string | null>(null);

    const handleReset = () => {
        setLocalError(null);
        clearError();
        setFormData({
            name: '',
            gender: '',
            address: '',
            email: '',
            mobile: '',
            password: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        // Validation
        if (!formData.name) {
            setLocalError('Full name is required');
            return;
        }
        if (!formData.gender) {
            setLocalError('Please select your gender');
            return;
        }
        if (!formData.address) {
            setLocalError('Address is required');
            return;
        }
        if (!formData.email) {
            setLocalError('Email is required');
            return;
        }
        if (!formData.mobile) {
            setLocalError('Phone number is required');
            return;
        }
        if (!formData.password) {
            setLocalError('Password is required');
            return;
        }
        if (formData.password.length < 6) {
            setLocalError('Password must be at least 6 characters');
            return;
        }

        try {
            await signup({
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                gender: formData.gender,
                address: formData.address,
                password: formData.password,
            });
            showToast.success('Account created successfully! Welcome aboard');
            handleReset();
            setTimeout(() => onClose(), 500);
        } catch (err: any) {
            const errorMsg =
                (err && (err.message || err.code)) ||
                (err && err.response && (err.response.data?.message || JSON.stringify(err.response.data))) ||
                String(err) ||
                'Signup failed. Please try again.';
            setLocalError(errorMsg);
            showToast.error(errorMsg);
        }
    };

    const isDisabled = isLoading;

    return (
        <Modal open={open} onClose={() => { handleReset(); onClose(); }} title="Create your account" size="sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {localError && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-700">{localError}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={isDisabled}
                                className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="John Doe"
                        />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            disabled={isDisabled}
                            className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                        <input
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            disabled={isDisabled}
                                className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Your address"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">E-Mail ID</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isDisabled}
                            className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="you@email.com"
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone No.</label>
                    <input
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        disabled={isDisabled}
                            className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="+1 (555) 000-0000"
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={isDisabled}
                            className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Create a password (min. 6 characters)"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        disabled={isDisabled}
                        className="text-sm text-slate-600 hover:text-slate-700 hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() => {
                            handleReset();
                            onClose();
                            openLogin();
                        }}
                    >
                        Already have an account?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full px-5 py-3.5 rounded-md bg-blue-950 text-white text-base font-semibold shadow hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                    {isLoading ? (
                        <>
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Creating account...
                        </>
                    ) : (
                        'Sign up'
                    )}
                </button>
            </form>
        </Modal>
    );
}
