"use client";

import Modal from '@/components/ui/Modal';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { showToast } from '@/lib/toast/toast';

type Props = {
    open: boolean;
    onClose: () => void;
    openSignup: () => void;
    openForgot: () => void;
};

export default function LoginModal({ open, onClose, openSignup, openForgot }: Props) {
    const { login, isLoading, error, clearError } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => {
            const el = document.querySelector<HTMLInputElement>('input[name="email"]');
            el?.focus();
        }, 100);
        return () => clearTimeout(timer);
    }, [open]);

    useEffect(() => {
        if (!open) {
            setLocalError(null);
            clearError();
            setFormData({ email: '', password: '' });
        }
    }, [open, clearError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (!formData.email || !formData.password) {
            setLocalError('Email and password are required');
            return;
        }

        try {
            await login(formData.email, formData.password);
            showToast.success('Welcome back! Login successful');
            setTimeout(() => onClose(), 500);
        } catch (err: any) {
            const errorMsg =
                (err && (err.message || err.code)) ||
                (err && err.response && (err.response.data?.message || JSON.stringify(err.response.data))) ||
                String(err) ||
                'Login failed. Please try again.';
            setLocalError(errorMsg);
            showToast.error(errorMsg);
        }
    };

    const displayError = localError || error?.message;
    const isDisabled = isLoading;

    return (
        <Modal open={open} onClose={onClose} title="Login to Social Shipping" size="sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {displayError && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-700">{displayError}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">E-Mail ID</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isDisabled}
                        className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-950 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="you@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={isDisabled}
                        className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-950 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Your password"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        disabled={isDisabled}
                        className="text-sm text-slate-600 hover:text-slate-700 hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() => {
                            onClose();
                            openForgot();
                        }}
                    >
                        Forgot password?
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
                            Signing in...
                        </>
                    ) : (
                        'Login'
                    )}
                </button>

                <div className="pt-4 border-t border-slate-100 text-sm text-slate-600">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        disabled={isDisabled}
                        className="text-slate-600 font-semibold hover:underline disabled:opacity-50 cursor-pointer"
                        onClick={() => {
                            onClose();
                            openSignup();
                        }}
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </Modal>
    );
}
