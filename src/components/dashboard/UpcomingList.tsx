"use client";

import { useState } from 'react';
import { useTravel } from '@/contexts/TravelContext';
import TravelCard from '@/components/dashboard/TravelCard';

export default function UpcomingList() {
    const { travels, loading } = useTravel();
    const [itemsToShow, setItemsToShow] = useState(4);

    const handleLoadMore = () => {
        setItemsToShow(prev => prev + 3);
    };

    // Spinner pour le chargement initial
    if (loading) {
        return (
            <div className="flex items-center justify-center py-6 px-4">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Aucun voyage disponible
    if (!travels || travels.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-slate-600 text-lg">No upcoming travelers available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {travels.slice(0, itemsToShow).map(travel => (
                    <TravelCard key={travel._id} travel={travel} />
                ))}
            </div>

            {itemsToShow < travels.length && (
                <div className="flex items-center justify-center mt-10">
                    <button
                        onClick={handleLoadMore}
                        className="text-[var(--color-lightblue)] text-base font-medium underline-offset-2 hover:underline transition cursor-pointer"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}