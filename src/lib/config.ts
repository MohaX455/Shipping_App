// Configuration and constants for the Social Shipping application

export const APP_CONFIG = {
    name: 'Social Shipping',
    description: 'Connect travelers and senders. Save money. Earn money.',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://jetcamer.com',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.jetcamer.com/social-shipping/api',
};

export const NAVIGATION_ITEMS = [
    { label: 'Welcome', href: '/' },
    { label: 'For Sender', href: '/sender' },
    { label: 'For Traveler', href: '/traveler' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Help', href: '/help' },
    { label: 'Contact', href: '/contact' },
];

export const SECTION_SPACING = {
    small: 'py-8 sm:py-12',
    medium: 'py-12 sm:py-16',
    large: 'py-16 sm:py-24',
};
