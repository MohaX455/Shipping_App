'use client'

import Image from 'next/image';

export function HowItWorksBanner() {
    return (
        <div className="relative w-full">
            <div className="relative w-full h-60 lg:h-110 bg-slate-200">
                <Image
                    src={'/Images/works-banner.webp'}
                    alt="Sender Banner"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 w-full max-w-4xl">
                        <h3 className="text-3xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white uppercase mb-4 font-heading">
                            {'How It Works'}
                        </h3>
                        <p className="text-base sm:text-lg lg:text-xl text-white font-medium font-body">
                            {'Connect your sender to your traveler in just a click'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
