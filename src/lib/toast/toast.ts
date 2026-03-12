/**
 * Toast Notifications - Client-side notifications
 * Inspired by Old_Frontend's react-toastify approach
 */

import { useCallback } from 'react';

// Toast types
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastNotification {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

// Global store for toast notifications
let toastListeners: Set<(toast: ToastNotification) => void> = new Set();
let toastId = 0;

export function subscribeToToasts(callback: (toast: ToastNotification) => void): () => void {
    toastListeners.add(callback);
    return () => toastListeners.delete(callback);
}

function emitToast(type: ToastType, message: string, duration = 5000) {
    const id = String(++toastId);
    const notification: ToastNotification = {
        id,
        type,
        message,
        duration,
    };

    toastListeners.forEach(listener => listener(notification));

    if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
    }

    return id;
}

export function removeToast(id: string) {
    // Handled by ToastContainer component
}

export const showToast = {
    success: (message: string, duration?: number) => emitToast('success', message, duration),
    error: (message: string, duration?: number) => emitToast('error', message, duration),
    info: (message: string, duration?: number) => emitToast('info', message, duration),
    warning: (message: string, duration?: number) => emitToast('warning', message, duration),
};

/**
 * Hook to use toast notifications in components
 */
export function useToast() {
    return useCallback((type: ToastType, message: string, duration?: number) => {
        return emitToast(type, message, duration);
    }, []);
}
