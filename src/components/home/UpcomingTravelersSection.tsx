'use client';

import { useState, useEffect } from 'react';

interface TravelCard {
    id: string;
    travelerName: string;
    travelDate: string;
    fromLocation: string;
    toLocation: string;
    maxWeight: number;
    imageUrl?: string;
}

export function UpcomingTravelersSection() {
    const [displayCount, setDisplayCount] = useState(3);
    const [travelers, setTravelers] = useState<TravelCard[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 3);
    };

    return (
        <section id='upcoming_list' className="scroll-mt-[50vh] md:mt-18 py-14 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-600 mb-4 font-heading">
                        Upcoming Travelers Trips
                    </h2>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}

                {/* Travelers Grid */}
                {!isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
                        {travelers.length > 0 ? travelers.slice(0, displayCount).map((traveler) => (
                            <div
                                key={traveler.id}>
                                {/* Card */}
                            </div>
                        )) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-slate-600 text-lg">No upcoming travelers available at the moment.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Load More */}
                {!isLoading && displayCount < travelers.length && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center gap-2 text-sm hover:border-purple-600 hover:text-purple-600"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                            Load More Trips
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
