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
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchTravelers = async () => {
    //         try {
    //             setIsLoading(true);
    //             const apiUrl = 'https://api.jetcamer.com/social-shipping/api/home-page-data';

    //             const response = await fetch(apiUrl, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                 },
    //             });

    //             if (!response.ok) {
    //                 console.error(`API Error: ${response.status} ${response.statusText}`);
    //                 throw new Error(`API returned ${response.status}`);
    //             }

    //             const data = await response.json();
    //             console.log('API Response data:', data);

    //             // Try different possible keys for traveler data
    //             const travelerData = data?.get_all_traveler || data?.travelers || data?.upcoming || [];

    //             if (!Array.isArray(travelerData) || travelerData.length === 0) {
    //                 console.warn('No traveler data found in API response');
    //                 setTravelers([]);
    //                 setIsLoading(false);
    //                 return;
    //             }

    //             // Transform API data to TravelCard format
    //             const transformedTravelers: TravelCard[] = travelerData.map(
    //                 (traveler: any, index: number) => ({
    //                     id: traveler?.id?.toString() || String(index),
    //                     travelerName: traveler?.first_name && traveler?.last_name
    //                         ? `${traveler.first_name} ${traveler.last_name.charAt(0)}.`
    //                         : traveler?.first_name || traveler?.name || `Traveler ${index + 1}`,
    //                     travelDate: traveler?.travel_date || traveler?.date || new Date().toLocaleDateString('en-US', {
    //                         year: 'numeric',
    //                         month: 'short',
    //                         day: 'numeric',
    //                     }),
    //                     fromLocation: traveler?.country_from || traveler?.from_location || traveler?.from || 'Unknown',
    //                     toLocation: traveler?.country_to || traveler?.to_location || traveler?.to || 'Unknown',
    //                     maxWeight: parseInt(traveler?.max_weight || traveler?.weight || '25', 10),
    //                     imageUrl: traveler?.profile_image || traveler?.image || undefined,
    //                 })
    //             );

    //             setTravelers(transformedTravelers);
    //         } catch (error) {
    //             console.error('Error fetching travelers:', error);
    //             // Don't show toast for now, just log
    //             setTravelers([]);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchTravelers();
    // }, []);

    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 3);
    };

    return (
        <section className="md:mt-18 py-14 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
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
                                key={traveler.id}
                                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                {/* Traveler Avatar - Larger */}
                                <div className="h-40 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                                    {/* Decorative background elements */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute top-2 right-4 w-24 h-24 bg-white/30 rounded-full blur-xl" />
                                        <div className="absolute bottom-2 left-2 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl" />
                                    </div>
                                    <div className="relative z-10 w-24 h-24 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                                        <svg
                                            className="w-12 h-12 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 font-heading">
                                        {traveler.travelerName}
                                    </h3>

                                    {/* Route Info */}
                                    <div className="space-y-3.5 mb-5 flex-1">
                                        {/* From */}
                                        <div className="flex items-start gap-3 group/item">
                                            <div className="flex-shrink-0 mt-0.5 p-2 bg-blue-50 rounded-lg">
                                                <svg
                                                    className="w-4 h-4 text-blue-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M6 2a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V5a3 3 0 00-3-3H6z" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest">From</p>
                                                <p className="text-sm font-semibold text-slate-900 truncate group-hover/item:text-blue-600 transition-colors">
                                                    {traveler.fromLocation}
                                                </p>
                                            </div>
                                        </div>

                                        {/* To */}
                                        <div className="flex items-start gap-3 group/item">
                                            <div className="flex-shrink-0 mt-0.5 p-2 bg-purple-50 rounded-lg">
                                                <svg
                                                    className="w-4 h-4 text-purple-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6.553-3.276A1 1 0 0117 16.382V5.618a1 1 0 00-.553-.894L11 7m0 13V7m0 13L5.447 10.276M11 7V5.618a1 1 0 00-.553-.894l-6-3A1 1 0 003 2v13.764a1 1 0 001.447.894l5.553 2.776" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest">To</p>
                                                <p className="text-sm font-semibold text-slate-900 truncate group-hover/item:text-purple-600 transition-colors">
                                                    {traveler.toLocation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2.5 mb-5 pb-5 border-b border-slate-200 text-xs">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <div className="flex-shrink-0 p-1.5 bg-slate-100 rounded-md">
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-slate-700">{traveler.travelDate}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <div className="flex-shrink-0 p-1.5 bg-slate-100 rounded-md">
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-slate-700">Max: {traveler.maxWeight} kg</span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                        Send Package
                                    </button>
                                </div>
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
