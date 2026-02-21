import { IMAGE_BASE } from "@/lib/constants";
import Image from "next/image";

import GetStartedCTA from './GetStartedCTA';
import { HeroSearchBar } from './HeroSearchBar';

export function HeroSection() {
    return (
        <section className="relative w-full min-h-fit md:min-h-[82vh] flex items-end md:items-center justify-center overflow-visible">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={`${IMAGE_BASE}/home-banner.webp`}
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-440 mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-0">
                <div className="w-full flex flex-col justify-end md:justify-center min-h-fit md:min-h-[750px]">
                    <div className="space-y-2 md:space-y-4">
                        {/* Main Heading */}
                        <h1 className="uppercase text-3xl md:text-6xl lg:text-6xl font-semibold tracking-tight leading-tight font-heading text-white">
                            Save Money Shipping. Make<br className="hidden md:block" /> Money Traveling
                        </h1>

                        {/* Description - Hidden on mobile */}
                        <p className="hidden md:block text-lg font-medium max-w-3xl leading-relaxed font-body text-white/90">
                            Social Shipping connects senders who want to save on shipping with travelers happy to earn by carrying verified parcels along their route — simple, secure, and rewarding for everyone.
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4 md:pt-6">
                            <GetStartedCTA />
                        </div>
                    </div>
                </div>
            </div>

            {/* HeroSearchBar floating at the bottom, half in/half out */}
            <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 z-20 w-full max-w-440 px-4 sm:px-6 lg:px-8 ">
                <HeroSearchBar />
            </div>
        </section>
    );
}
