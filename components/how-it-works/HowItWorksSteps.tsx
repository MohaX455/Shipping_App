"use client";
import React, { useState } from "react";

export function HowItWorksSteps() {
    const [active, setActive] = useState<"sender" | "traveler">("sender");

    return (
        <div className="flex items-start justify-center py-10">
            <div className="bg-white w-full max-w-330 mx-auto p-10 border border-gray-200">
                {/* Buttons */}
                <div className="flex justify-center">
                    <div className="relative w-90">
                        {/* sliding background (half width) */}
                        <div
                            className={`absolute top-0 left-0 h-10 w-1/2 rounded-md bg-[#314a96] transform transition-transform duration-300 ease-in-out ${active === "traveler" ? "translate-x-full" : "translate-x-0"
                                }`}
                        />
                        {/* Buttons container */}
                        <div className="relative z-10 flex h-10 rounded-md overflow-hidden border border-transparent">
                            <button
                                onClick={() => setActive("sender")}
                                aria-pressed={active === "sender"}
                                className={`cursor-pointer w-1/2 h-10 flex items-center justify-center text-sm font-semibold uppercase transition-colors duration-200 ${active === "sender" ? "text-white" : "text-black"
                                    }`}
                            >
                                SENDER
                            </button>
                            <button
                                onClick={() => setActive("traveler")}
                                aria-pressed={active === "traveler"}
                                className={`cursor-pointer w-1/2 h-10 flex items-center justify-center text-sm font-semibold uppercase transition-colors duration-200 ${active === "traveler" ? "text-white" : "text-black"
                                    }`}
                            >
                                TRAVELER
                            </button>
                        </div>
                    </div>
                </div>

                {/* thin horizontal blue line */}
                <div className="mt-6 border-t-2 border-[#314a96]" />

                {/* Content */}
                <div className="mt-8 text-center px-6">
                    {/* Steps list (same texts used for both tabs as demandé) */}
                    <div
                        className="space-y-10 mx-auto"
                        key={active} /* key to trigger reflow so transition feels clear on tab change */
                    >
                        <div className="transition-opacity duration-300 ease-in-out">
                            <h3 className="text-2xl font-extrabold mb-4">
                                Share Package Details
                            </h3>
                            <p className="text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
                                Add details of the package including contents, weight etc. and post your request
                            </p>
                        </div>
                        <div className="transition-opacity duration-300 ease-in-out">
                            <h3 className="text-2xl font-extrabold">Receive Offers</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Once posted all travelers along your route receive a notification of your request and can choose to get in touch with you. Details of all travelers interested in carrying your package are shown to you for your approval
                            </p>
                        </div>

                        <div className="transition-opacity duration-300 ease-in-out">
                            <h3 className="text-2xl font-extrabold">Approve &amp; Pay</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Estimates the charges according to the provided details. To approve any traveler you can complete the payment
                            </p>
                        </div>

                        <div className="transition-opacity duration-300 ease-in-out">
                            <h3 className="text-2xl font-extrabold">Chat With Traveler</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                You can chat with the traveler at any time on our website regarding the delivery
                            </p>
                        </div>

                        <div className="transition-opacity duration-300 ease-in-out">
                            <h3 className="text-2xl font-extrabold">Receive Your Item</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                The product is then delivered to You can either choose to pick up the package yourself from a place mutually decided with the traveler
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}