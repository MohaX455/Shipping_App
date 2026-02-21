'use client';

import Image from 'next/image';
import Link from 'next/link';

interface TravelerPageData {
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

interface TravelerStepsProps {
    travelerData?: TravelerPageData;
}

export function TravelerSteps({ travelerData }: TravelerStepsProps) {
    return (
        <section className="w-full bg-slate-50 py-12">
            <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-md mb-8 font-body">
                    <Link href="/" className="text-slate-600 hover:text-blue-900">
                        Welcome
                    </Link>
                    <span className="text-[#4053a1]">{" / "}</span>
                    <span className="text-[#4053a1] font-medium">For Travelers</span>
                </nav>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-4">
                    I am a <span className="text-[#4053a1]">TRAVELER</span>
                </h2>
                <p className="text-center text-slate-700 text-base sm:text-lg mb-12">
                    Simply follow these four easy steps
                </p>

                <div className="space-y-16">

                    {/* STEP 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 items-stretch">
                        <div className="bg-white p-6 lg:p-8 flex flex-col justify-center min-h-[280px] h-full">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#4053a1] text-white flex items-center justify-center font-bold">
                                    1
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold text-[#4053a1]">
                                    {travelerData?.first_title || 'Upload your Trip And You Can Deliver'}
                                </h4>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {travelerData?.first_descriptions || 'Once you upload a trip, you can search for items that match with your location and dates and start making delivery offers.'}
                            </p>
                        </div>

                        <div className="relative w-full min-h-[280px] h-full bg-slate-200">
                            <Image
                                src={travelerData?.first_image || '/Images/traveler-img01.webp'}
                                alt="Step 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 items-stretch">
                        <div className="relative w-full min-h-[280px] h-full bg-slate-200 md:order-1">
                            <Image
                                src={travelerData?.second_image || '/Images/traveler-img02.webp'}
                                alt="Step 2"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="bg-white p-6 lg:p-8 flex flex-col justify-center min-h-[280px] h-full md:order-2">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#4053a1] text-white flex items-center justify-center font-bold">
                                    2
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold text-[#4053a1]">
                                    {travelerData?.second_title || 'Confirm order Details'}
                                </h4>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {travelerData?.second_descriptions || 'You can use the chat feature in the Website to discuss the order details with the sender such as the exact item description and delivery time and place.'}
                            </p>
                        </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 items-stretch">
                        <div className="bg-white p-6 lg:p-8 flex flex-col justify-center min-h-[280px] h-full">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#4053a1] text-white flex items-center justify-center font-bold">
                                    3
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold text-[#4053a1]">
                                    {travelerData?.third_title || 'Payment received THE ITEM'}
                                </h4>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {travelerData?.third_descriptions || 'Once the sender has confirmed the deal and paid the agreed amount, you can go ahead the item and start packing it for delivery.'}
                            </p>
                        </div>

                        <div className="relative w-full min-h-[280px] h-full bg-slate-200">
                            <Image
                                src={travelerData?.third_image || '/Images/traveler-img03.webp'}
                                alt="Step 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* STEP 4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 items-stretch">
                        <div className="relative w-full min-h-[280px] h-full bg-slate-200 md:order-1">
                            <Image
                                src={travelerData?.fourth_image || '/Images/traveler-img04.webp'}
                                alt="Step 4"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="bg-white p-6 lg:p-8 flex flex-col justify-center min-h-[280px] h-full md:order-2">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-[#4053a1] text-white flex items-center justify-center font-bold">
                                    4
                                </div>
                                <h4 className="text-xl sm:text-2xl font-semibold text-[#4053a1]">
                                    {travelerData?.fourth_title || 'DELIVER YOUR shipping ITEM'}
                                </h4>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {travelerData?.fourth_descriptions || 'Be sure to get a confirmation from the recipient or sender when you deliver the package.'}
                            </p>
                        </div>
                    </div>

                </div>

                {/* CTA */}
                <div className="flex items-center justify-center mt-12">
                    <Link
                        href="/dashboard"
                        className="inline-block bg-[#00fcff] text-[#252b50] font-semibold text-lg px-8 py-3 rounded-md hover:bg-[#00e5e5] transition-colors"
                    >
                        My Recent List
                    </Link>
                </div>
            </div>
        </section>
    );
}