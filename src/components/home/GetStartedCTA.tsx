"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { ArrowRight } from 'lucide-react'

export default function GetStartedCTA() {
    const authModal = useAuthModal();

    return (
        <button
            onClick={() => authModal.openGetStarted()}
            className="
        inline-flex items-center gap-2
        px-6 sm:px-8
        py-3 sm:py-4
        bg-cyan-400
        hover:bg-white
        hover:text-blue-950
        text-blue-950
        font-bold
        text-base sm:text-lg
        rounded-md
        shadow-lg
        hover:shadow-xl
        transition-all duration-300
        active:scale-95
        cursor-pointer
      "
        >
            <span>Get Started</span>
            <ArrowRight
                className="w-4 h-4 sm:w-5 sm:h-5"
                strokeWidth={3}
            />
        </button>
    );
}
