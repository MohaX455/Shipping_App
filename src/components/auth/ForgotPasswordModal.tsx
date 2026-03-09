"use client";

import Modal from '@/components/ui/Modal';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { showToast } from '@/lib/toast/toast';

type Props = {
    open: boolean;
    onClose: () => void;
    openLogin: () => void;
};

export default function ForgotPasswordModal({ open, onClose, openLogin }: Props) {
    const { requestPasswordReset, isLoading, clearError } = useAuth();
    const [email, setEmail] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setLocalError(null);
            clearError();
            setEmail('');
        }
    }, [open, clearError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (!email) {
            setLocalError('Email is required');
            return;
        }

        try {
            await requestPasswordReset(email);
            showToast.success('Reset link sent! Check your email');
            setEmail('');
            setTimeout(() => onClose(), 500);
        } catch (err: any) {
            const errorMsg =
                (err && (err.message || err.code)) ||
                (err && err.response && (err.response.data?.message || JSON.stringify(err.response.data))) ||
                String(err) ||
                'Failed to send reset link. Please try again.';
            setLocalError(errorMsg);
            showToast.error(errorMsg);
        }
    };

    const isDisabled = isLoading;

    return (
        <Modal
            open={open}
            onClose={() => {
                setLocalError(null);
                clearError();
                setEmail('');
                onClose();
            }}
            title="Reset your password"
            size="sm"
        >
            <form className="space-y-4" onSubmit={handleSubmit}>
                {localError && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-700">{localError}</p>
                    </div>
                )}

                <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">E-Mail ID</label>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isDisabled}
                        className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 placeholder:opacity-60 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="you@email.com"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        disabled={isDisabled}
                        className="text-sm text-slate-600 hover:text-slate-700 hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() => {
                            setLocalError(null);
                            clearError();
                            setEmail('');
                            onClose();
                            openLogin();
                        }}
                    >
                        Back to login
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
                            Sending...
                        </>
                    ) : (
                        'Send reset link'
                    )}
                </button>
            </form>
        </Modal>
    );
}
