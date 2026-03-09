"use client";

import React, { createContext, useContext, useState } from 'react';
import LoginModal from '@/components/auth/LoginModal';
import SignupModal from '@/components/auth/SignupModal';
import ForgotPasswordModal from '@/components/auth/ForgotPasswordModal';
import WarningModal from '@/components/auth/WarningModal';
import GetStartedModal from '@/components/ui/GetStartedModal';

type AuthModalContextValue = {
    openLogin: () => void;
    openSignup: () => void;
    openForgot: () => void;
    closeAll: () => void;
    openGetStarted: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function useAuthModal() {
    const ctx = useContext(AuthModalContext);
    if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider');
    return ctx;
}

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [forgotOpen, setForgotOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);
    const [getStartedOpen, setGetStartedOpen] = useState(false);

    const closeAll = () => {
        setLoginOpen(false);
        setSignupOpen(false);
        setForgotOpen(false);
    };

    const openLogin = () => {
        setSignupOpen(false);
        setForgotOpen(false);
        setLoginOpen(true);
    };

    const openSignup = () => {
        setLoginOpen(false);
        setForgotOpen(false);
        setSignupOpen(true);
    };

    const openForgot = () => {
        setLoginOpen(false);
        setSignupOpen(false);
        setForgotOpen(true);
    };

    const openGetStarted = () => {
        setLoginOpen(false);
        setSignupOpen(false);
        setForgotOpen(false);
        setGetStartedOpen(true);
    };

    // listen for login events to show intermediary warning
    React.useEffect(() => {
        const handler = () => {
            // show warning 1s after login
            setTimeout(() => setWarningOpen(true), 1000);
        };
        window.addEventListener('app:logged_in', handler as EventListener);
        return () => window.removeEventListener('app:logged_in', handler as EventListener);
    }, []);

    return (
        <AuthModalContext.Provider value={{ openLogin, openSignup, openForgot, closeAll, openGetStarted }}>
            {children}

            {/* Modals mounted centrally */}
            <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} openSignup={openSignup} openForgot={openForgot} />
            <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} openLogin={openLogin} />
            <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} openLogin={openLogin} />
            <WarningModal open={warningOpen} onClose={() => setWarningOpen(false)} />
            <GetStartedModal open={getStartedOpen} onClose={() => setGetStartedOpen(false)} />
        </AuthModalContext.Provider>
    );
}

export default useAuthModal;
