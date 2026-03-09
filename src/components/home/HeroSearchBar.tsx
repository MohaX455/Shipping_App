"use client";

import { useState } from "react";
import { PlaneTakeoff, PlaneLanding, Calendar, Search, X } from "lucide-react";

export function HeroSearchBar() {
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [date, setDate] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        setHasSearched(true);
    };

    const handleClear = () => {
        setDeparture("");
        setArrival("");
        setDate("");
        setHasSearched(false);
    };

    return (
        <div className="w-full flex justify-center px-4">
            <div
                className="
                w-full max-w-330
                bg-blue-950
                border-2 border-white
                rounded-md
                px-6 py-6
                md:px-8 md:py-9
                flex flex-col md:flex-row
                gap-5
                md:items-end
        "
            >
                {/* Departure */}
                <div className="flex flex-col flex-1">
                    <label className="text-white font-semibold mb-3 flex items-center gap-2 text-lg">
                        <PlaneTakeoff className="w-6 h-6"/>
                        Departure City
                    </label>
                    <input
                        type="text"
                        placeholder="Select Location*"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        className="
              bg-transparent
              border-2 border-white/60
              text-white
              placeholder-white
              px-4 py-2.5
              rounded-sm
              outline-none
              focus:border-white
              w-full
            "
                    />
                </div>

                {/* Arrival */}
                <div className="flex flex-col flex-1">
                    <label className="text-white font-semibold mb-3 flex items-center gap-2 text-lg">
                        <PlaneLanding className="w-6 h-6"/>
                        Arrival City
                    </label>
                    <input
                        type="text"
                        placeholder="Select Location*"
                        value={arrival}
                        onChange={(e) => setArrival(e.target.value)}
                        className="
              bg-transparent
              border-2 border-white/60
              text-white
              placeholder-white
              px-4 py-2.5
              rounded-sm
              outline-none
              focus:border-white
              w-full
            "
                    />
                </div>

                {/* Date */}
                <div className="flex flex-col flex-1">
                    <label className="text-white font-semibold mb-3 flex items-center gap-2 text-lg">
                        <Calendar size={20} />
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="
              bg-transparent
              border-2 border-white/60
              text-white
              px-4 py-2.5
              rounded-sm
              outline-none
              focus:border-white
              w-full
            "
                    />
                </div>

                {/* Button */}
                <div className="flex md:self-end mt-2 md:mt-0">
                    {!hasSearched ? (
                        <button
                            onClick={handleSearch}
                            className="
                flex items-center justify-center gap-2
                bg-cyan-400
                text-blue-950
                font-semibold
                px-8 py-2.5
                rounded-sm
                hover:opacity-95
                transition
              "
                        >
                            <Search size={18} />
                            SEARCH
                        </button>
                    ) : (
                        <button
                            onClick={handleClear}
                            className="
                flex items-center justify-center gap-2
                bg-white
                text-blue-950
                font-semibold
                px-8 py-2.5
                rounded-sm
                hover:opacity-95
                transition
              "
                        >
                            <X size={18} />
                            CLEAR
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
