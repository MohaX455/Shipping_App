// Constantes du projet - prêtes pour l'intégration API

export const IMAGE_BASE = "/Images";

export const NAV_LINKS = [
    { href: "/", label: "Welcome" },
    { href: "/sender", label: "For Sender" },
    { href: "/traveler", label: "For Traveler" },
    { href: "/how-it-works", label: "How it Works" },
    { href: "/about-us", label: "About Us" },
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact Us" },
] as const;

// Placeholder pour les liens sociaux (sera remplacé par contactData API)
export const SOCIAL_LINKS = {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
    youtube: "#",
} as const;
