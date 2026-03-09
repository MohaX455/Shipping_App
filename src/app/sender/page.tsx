'use client';

import { useState, useEffect } from 'react';
import { SenderBanner, SenderSteps, SenderBenefits } from '@/components/sender';

interface SenderPageData {
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
    senderPage?: SenderPageData;
    benefit?: Benefit[];
}

export default function SenderPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [senderPageData, setSenderPageData] = useState<SenderPageData>({});
    const [benefits, setBenefits] = useState<Benefit[]>([]);

    // useEffect(() => {
    //     const fetchSenderData = async () => {
    //         try {
    //             setIsLoading(true);
    //             const response = await fetch('https://api.jetcamer.com/social-shipping/api/sender-page-data');

    //             if (response.ok) {
    //                 const data: ApiResponse = await response.json();

    //                 if (data.senderPage) {
    //                     setSenderPageData(data.senderPage);
    //                 }

    //                 if (data.benefit) {
    //                     setBenefits(data.benefit);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error fetching sender data:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchSenderData();
    // }, []);

    return (
        <main className="w-full">
            <SenderBanner bannerData={senderPageData} />
            <SenderSteps senderData={senderPageData} />
            <SenderBenefits benefits={benefits} />
        </main>
    );
}
