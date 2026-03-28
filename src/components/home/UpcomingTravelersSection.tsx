'use client';

import { useState, useEffect } from 'react';
import { TravelInfo } from '@/types/travelInfo.type';
import { showToast } from '@/lib/toast/toast';
import * as travelService from '@/services/travel.client';
import UpcomingTravelerCard from '@/components/home/UpcomingTravelerCard';

export function UpcomingTravelersSection() {
    const [displayCount, setDisplayCount] = useState(9);
    const [travelers, setTravelers] = useState<TravelInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleLoadMore = () => {
        setDisplayCount((prev) => prev + 3);
    };

    const handleSendParcel = (id: string) => {
        showToast.success('Send Parcel request initiated');
    };

    useEffect(() => {
        const fetchTravelers = async () => {
            setLocalError(null);
            setIsLoading(true);

            try {
                const travelInfos = await travelService.getAllTravels();
                setTravelers(travelInfos);
            } catch (error: unknown) {
                let message = 'Unable to load upcoming travelers. Please try again.';
                if (error instanceof Error) {
                    message = error.message;
                }
                setLocalError(message);
                showToast.error(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTravelers();
    }, []);

    return (
        <section id="upcoming_list" className="scroll-mt-[50vh] md:mt-18 py-14 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold text-slate-600 mb-4 font-heading">
                        Upcoming Travelers Trips
                    </h2>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-6 px-4">
                        <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
                            {travelers.length > 0 ? travelers.slice(0, displayCount).map((traveler) => (
                                <UpcomingTravelerCard key={traveler._id} travel={traveler} onSendParcel={handleSendParcel} />
                            )) : (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-slate-600 text-lg">No data available.</p>
                                </div>
                            )}
                        </div>

                        {displayCount < travelers.length && travelers.length > 0 && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="text-[var(--color-lightblue)] text-base font-medium underline-offset-2 hover:underline transition cursor-pointer"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
