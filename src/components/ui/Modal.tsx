"use client";

import { Fragment, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    size?: 'sm' | 'md' | 'lg';
};

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
    // keep element mounted during animations
    const [isRendered, setIsRendered] = useState<boolean>(open);
    // separate state to control animation timing - ensures animation plays on open
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            setIsRendered(true);
            // Give browser time to paint the DOM before triggering animation
            const t = setTimeout(() => setIsAnimating(true), 10);

            // prevent background scroll while modal is open
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            return () => {
                clearTimeout(t);
                document.body.style.overflow = originalOverflow;
            };
        } else {
            // play closing animation then unmount
            setIsAnimating(false);
            const t = setTimeout(() => setIsRendered(false), 300);
            return () => clearTimeout(t);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (typeof document === "undefined") return null;
    if (!isRendered) return null;

    // Slightly increase default modal width (md) per request
    // keep mobile size unchanged but bump desktop width one step (xl -> 2xl)
    const maxWidth =
        size === 'sm'
            ? // small modals: default md width but step up to xl on desktop
            'max-w-md md:max-w-xl'
            : size === 'lg'
                ? 'max-w-3xl'
                : // md
                'max-w-xl md:max-w-2xl';

    return createPortal(
        <div className={`fixed inset-0 z-50 flex items-start justify-center pt-10 transition-opacity duration-300 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
            <div className={`relative z-10 w-full ${maxWidth} mx-4 sm:mx-6 transition-all duration-300 ease-out transform ${isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}>
                <div className="bg-white rounded-sm shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-5 border-b border-slate-100">
                        <div className="text-xl font-semibold text-slate-900">{title}</div>
                        <button onClick={onClose} className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-5">{children}</div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;