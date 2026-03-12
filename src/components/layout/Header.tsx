"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuthModal } from '@/contexts/AuthModalContext';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/lib/auth/authService';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, IMAGE_BASE } from '@/lib/constants';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [contactData, setContactData] = useState<any>(null);
    const pathname = usePathname();
    const authModal = useAuthModal();
    const { user, logout } = useAuth();
    const isAuthenticated = Boolean(user);

    useEffect(() => setIsMounted(true), []);

    useEffect(() => {
        if (user && (user as any).name) {
            setDisplayName((user as any).name);
            return;
        }
        const stored = authService.getUser();
        if (stored && stored.name) {
            setDisplayName(stored.name);
            return;
        }
        try {
            const raw = typeof window !== 'undefined' ? localStorage.getItem('authState') : null;
            if (raw) {
                const parsed = JSON.parse(raw);
                const fn = parsed?.user?.first_name || parsed?.user?.name || parsed?.user?.firstName;
                if (fn) setDisplayName(fn);
            }
        } catch (e) { }
    }, [user]);

    useEffect(() => {
        const handler = () => {
            const stored = authService.getUser();
            if (stored && stored.name) setDisplayName(stored.name);
        };
        if (typeof window !== 'undefined') window.addEventListener('app:logged_in', handler as EventListener);
        return () => { if (typeof window !== 'undefined') window.removeEventListener('app:logged_in', handler as EventListener); };
    }, []);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await fetch('https://api.jetcamer.com/social-shipping/api/contact-page');
                if (!res.ok) return;
                const data = await res.json();
                setContactData(data);
            } catch (e) { }
        };
        fetchContact();
    }, []);

    const isActive = (href: string) => {
        if (href === '/' && pathname === '/') return true;
        if (href !== '/' && pathname.startsWith(href)) return true;
        return false;
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout();
        setIsProfileMenuOpen(false);
        setIsMenuOpen(false);
    };

    const scrollToTop = () => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); };

    const handleClickClose = () => { setIsMenuOpen(false); };

    return (
        <header className="sticky top-0 z-50 bg-white">
            {/* Top header (left logo + right social + login) - structure mirrors Old_Frontend */}
            <div className="top-header bg-transparent hidden md:block">
                <div className="max-w-330 mx-auto">
                    <div className="flex items-center justify-between py-3">
                        <div className="flex-shrink-0">
                            <Link href="/" onClick={scrollToTop} className="block">
                                <Image src={`${IMAGE_BASE}/SS-Logo.webp`} alt="logo" width={160} height={48} className="h-20 w-auto kri-logo img-fluid pt-2" />
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center gap-5 text-blue-950">
                            <div className="flex items-center text-md font-medium">Follow Us:</div>
                            <a href={contactData?.fb_link || '#'} target="_blank" rel="noreferrer" aria-label="facebook" className="hover:text-blue-600">
                                <FaFacebookF className="h-5 w-5" />
                            </a>
                            <a href={contactData?.twitter_link || '#'} target="_blank" rel="noreferrer" aria-label="twitter" className="hover:text-sky-600">
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a href={contactData?.linkedin_link || '#'} target="_blank" rel="noreferrer" aria-label="linkedin" className="hover:text-blue-700">
                                <FaLinkedinIn className="h-5 w-5" />
                            </a>
                            <a href={contactData?.insta_link || '#'} target="_blank" rel="noreferrer" aria-label="instagram" className="hover:text-pink-600">
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a href={contactData?.youtube_link || '#'} target="_blank" rel="noreferrer" aria-label="youtube" className="hover:text-red-600">
                                <FaYoutube className="h-5 w-5 scale-110" />
                            </a>

                            {/* Login button - keep exactly as current project's login design/behavior (visual icon replaced) */}
                            {!isAuthenticated ? (
                                <div
                                    role="button"
                                    tabIndex={0}
                                    title="Login"
                                    onClick={() => authModal.openLogin()}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') authModal.openLogin(); }}
                                    className="ml-6 w-7.5 h-7.5 flex items-center justify-center hover:scale-105 focus:scale-105 focus:outline-none cursor-pointer"
                                >
                                    <Image
                                        src={`${IMAGE_BASE}/profile.png`}
                                        alt="Login"
                                        height={30}
                                        width={30}
                                        className="w-full h-full"
                                    />
                                </div>
                            ) : (
                                <button onClick={handleLogout} className="ml-3 px-3 py-1.5 bg-blue-950 border border-blue-950 rounded-sm text-sm text-white hover:bg-white hover:text-blue-950 transition-transform cursor-pointer">Logout</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation bar (replicates Old_Frontend nav structure) */}
            <div className="kri-nav bg-white px-3 md:bg-gray-200 shadow-md">
                <div className="max-w-330 mx-auto">
                    <div className="flex items-center justify-between py-4 px-0 sm:px-6 lg:px-8">
                        <div className="md:hidden">
                            <Link href="/" onClick={scrollToTop}>
                                <Image src={`${IMAGE_BASE}/SS-Logo.webp`} alt="logo" width={140} height={42} className="h-12 w-auto object-contain" />
                            </Link>
                        </div>

                        <div className="hidden md:flex md:items-center mx-auto md:space-x-5">
                            {NAV_LINKS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => { scrollToTop(); handleClickClose(); }}
                                    className={`relative text-base px-1.5 font-medium transition-colors duration-200 ${isActive(item.href)
                                        ? 'text-blue-900'
                                        : 'text-slate-700 hover:text-slate-900'}`}>
                                    {item.label}
                                    {isActive(item.href) && (
                                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-900 rounded-full" />
                                    )}
                                </Link>

                            ))}
                            {isAuthenticated && (
                                <Link
                                    href="/dashboard"
                                    onClick={() => { scrollToTop(); handleClickClose(); }}
                                    className={`relative text-base px-1.5 font-medium transition-colors duration-200 ${isActive('/dashboard')
                                        ? 'text-blue-900'
                                        : 'text-slate-700 hover:text-slate-900'}`}
                                >
                                    Dashboard
                                    {isActive('/dashboard') && (
                                        <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-900 rounded-full" />
                                    )}
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center md:hidden">
                            {/* Mobile auth and menu buttons */}
                            {!isAuthenticated ? (
                                <button onClick={() => authModal.openLogin()} className="w-6.5 h-6.5 flex items-center justify-center text-slate-600 mr-2.5">
                                    <Image
                                        src={`${IMAGE_BASE}/profile.png`}
                                        alt="Login"
                                        height={30}
                                        width={30}
                                        className="w-full h-full"
                                    />
                                </button>
                            ) : (
                                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="-6.5 h-6.5 flex items-center justify-center text-slate-600 mr-2.5">
                                    <Image
                                        src={`${IMAGE_BASE}/profile.png`}
                                        alt="Profile"
                                        height={5}
                                        width={5}
                                        className="w-full h-full"
                                    />
                                </button>
                            )}

                            <button onClick={toggleMenu} className="p-2 text-slate-600">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="border-t border-slate-100 bg-white md:hidden">
                            <nav className="flex flex-col py-3 space-y-0.5">
                                {NAV_LINKS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`px-4 py-3 text-sm font-medium transition-all duration-200 block ${isActive(item.href)
                                            ? 'text-blue-900 border-l-4 border-blue-900'
                                            : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                {isAuthenticated && (
                                    <Link
                                        href="/dashboard"
                                        className={`px-4 py-3 text-sm font-medium transition-all duration-200 block ${isActive('/dashboard')
                                            ? 'text-blue-900 border-l-4 border-blue-900'
                                            : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                {!isAuthenticated && (
                                    <button onClick={() => { authModal.openLogin(); setIsMenuOpen(false); }} className="px-4 py-3 text-left text-blue-900 hover:bg-blue-50 font-medium">Login</button>
                                )}
                            </nav>
                        </div>
                    )}

                    {/* Profile dropdown for mobile */}
                    {isProfileMenuOpen && isAuthenticated && (
                        <div className="border-t border-slate-100 bg-white md:hidden">
                            <div className="py-3 space-y-1">
                                <Link href="/dashboard" className="block px-4 py-3 text-slate-700 hover:bg-slate-50" onClick={() => setIsProfileMenuOpen(false)}>My Space / Profile</Link>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50">Logout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header >
    );
}
