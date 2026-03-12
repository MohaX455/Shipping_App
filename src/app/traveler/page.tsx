'use client';

import { useState, useEffect } from 'react';
import { TravelerBanner, TravelerSteps, TravelerBenefits } from '@/components/traveler';

interface TravelerPageData {
    banner?: string;
    banner_title?: string;
    banner_descriptions?: string;
    meta_title?: string;
    meta_descriptions?: string;
    first_title?: string;
    first_descriptions?: string;
    first_image?: string;
    second_title?: string;
    second_descriptions?: string;
    second_image?: string;
    third_title?: string;
    third_descriptions?: string;
    third_image?: string;
    fourth_title?: string;
    fourth_descriptions?: string;
    fourth_image?: string;
}

interface Benefit {
    image?: string;
    title?: string;
    descriptions?: string;
}

interface ApiResponse {
    travelerPage?: TravelerPageData;
    benefit?: Benefit[];
}

export default function TravelerPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [travelerPageData, setTravelerPageData] = useState<TravelerPageData>({});
    const [benefits, setBenefits] = useState<Benefit[]>([]);

    // useEffect(() => {
    //     const fetchTravelerData = async () => {
    //         try {
    //             setIsLoading(true);
    //             const response = await fetch('https://api.jetcamer.com/social-shipping/api/traveler-page-data');

    //             if (response.ok) {
    //                 const data: ApiResponse = await response.json();

    //                 if (data.travelerPage) {
    //                     setTravelerPageData(data.travelerPage);
    //                 }

    //                 if (data.benefit) {
    //                     setBenefits(data.benefit);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error fetching traveler data:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchTravelerData();
    // }, []);

    return (
        <main className="w-full">
            <TravelerBanner bannerData={travelerPageData} />
            <TravelerSteps travelerData={travelerPageData} />
            <TravelerBenefits benefits={benefits} />
        </main>
    );
}
