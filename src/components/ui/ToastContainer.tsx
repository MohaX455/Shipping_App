'use client';

import { useState, useEffect } from 'react';
import { subscribeToToasts } from '@/lib/toast/toast';

interface Toast {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
}

export function ToastContainer() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        const unsubscribe = subscribeToToasts((notification) => {
            setToasts((prev) => [...prev, notification]);

            // Auto-remove after duration
            if (notification.duration && notification.duration > 0) {
                setTimeout(() => {
                    setToasts((prev) =>
                        prev.filter((t) => t.id !== notification.id)
                    );
                }, notification.duration);
            }
        });

        return unsubscribe;
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const getStyles = (type: string) => {
        const baseClasses = 'px-4 py-3 rounded-lg text-white font-medium flex items-center gap-3 shadow-lg';

        switch (type) {
            case 'success':
                return `${baseClasses} bg-green-500`;
            case 'error':
                return `${baseClasses} bg-red-500`;
            case 'warning':
                return `${baseClasses} bg-yellow-500`;
            case 'info':
            default:
                return `${baseClasses} bg-blue-500`;
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'info':
            default:
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] space-y-2 max-w-md">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`${getStyles(toast.type)} animate-in fade-in slide-in-from-right-4 duration-300`}
                >
                    {getIcon(toast.type)}
                    <span className="flex-1">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-white/80 hover:text-white transition"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}
