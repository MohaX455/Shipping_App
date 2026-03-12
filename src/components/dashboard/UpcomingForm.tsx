"use client";

import { useState } from "react";
import Image from "next/image";
import { Trip } from "./SwitchForms";
import { IMAGE_BASE } from "@/lib/constants";
import { SquarePen, PlaneTakeoff, PlaneLanding, Calendar, Luggage } from 'lucide-react'
import UpcomingList from "./UpcomingList";

type Props = {
    onSwitch: (view: "password" | "upcoming") => void;
    onAdd?: (trip: Trip) => void;
};

export default function UpcomingForm({ onSwitch, onAdd }: Props) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");
    const [trips, setTrips] = useState<Trip[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onAdd) {
            onAdd({ from, to, date, weight });
        }
        setFrom("");
        setTo("");
        setDate("");
        setWeight("");
    };

    return (
        <div className="py-10 md:py-20 w-full flex justify-center items-center">
            <div className="max-w-330 w-full flex flex-col lg:flex-row gap-8">

                {/* Sidebar */}
                <aside className="w-full lg:w-1/3 text-white flex flex-col items-center">

                    <div className="w-full bg-[var(--color-lightblue)] flex flex-col justify-center items-center gap-3 py-5">
                        <div className="w-24 h-24 relative">
                            <Image
                                src={`${IMAGE_BASE}/male-user.png`}
                                alt="User Avatar"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <button className="text-sm cursor-pointer flex items-center justify-center gap-1.5">
                            <SquarePen className="w-4 h-4" />
                            Edit Avatar
                        </button>

                        <h2 className="text-lg font-semibold">example1</h2>
                    </div>

                    <div className="w-full flex flex-col items-center gap-3 px-5 py-10 bg-white">
                        <button
                            onClick={() => onSwitch("password")}
                            className="w-full text-left bg-[var(--color-gray)] p-3 rounded text-black cursor-pointer"
                        >
                            upcoming list
                        </button>

                        <button
                            onClick={() => onSwitch("upcoming")}
                            className="w-full text-left bg-[var(--color-lightblue)] text-white p-3 rounded cursor-pointer"
                        >
                            Change Password
                        </button>

                    </div>

                </aside>




                {/* Main */}
                <main className="flex-1">
                    <div className="w-full bg-white shadow-md rounded-xs p-6 md:p-8">

                        <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
                            From Where, To Where And When Do You Go
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label className="flex items-center gap-2 w-full sm:w-50 text-sm font-semibold text-[var(--color-lightblue)]">
                                    <PlaneTakeoff className="w-6 h-6 text-red-500" />
                                    From where
                                </label>
                                <input
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="flex-1 w-full border border-gray-400 rounded-md p-3 text-sm
                                    focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition"
                                    placeholder="Select Location*"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label className="flex items-center gap-2 w-full sm:w-50 text-sm font-semibold text-[var(--color-lightblue)]">
                                    <PlaneLanding className="w-6 h-6 text-red-500" />
                                    To where
                                </label>
                                <input
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="flex-1 w-full border border-gray-400 rounded-md p-3 text-sm
                                    focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition"
                                    placeholder="Select Location*"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label className="flex items-center gap-2 w-full sm:w-50 text-sm font-semibold text-[var(--color-lightblue)]">
                                    <Calendar className="w-6 h-6 text-red-500" />
                                    When do you go
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="flex-1 w-full border border-gray-400 rounded-md p-3 text-sm
                                    focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label className="flex items-center gap-2 w-full sm:w-50 text-sm font-semibold text-[var(--color-lightblue)]">
                                    <Luggage className="w-6 h-6 text-red-500" />
                                    Max Weight, Kg*
                                </label>
                                <div className="flex items-center flex-1 gap-2 w-full">
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="flex-1 min-w-0 border border-gray-400 rounded-md p-3 text-sm
                 focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition"
                                        placeholder="Enter weight here"
                                    />
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="Kg"
                                        readOnly
                                        className="w-16 flex-shrink-0 border border-gray-400 rounded-md p-3 text-sm
                 focus:outline-none transition text-center"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center pt-2">
                                <button
                                    type="submit"
                                    className="bg-[var(--color-lightblue)] text-white text-base w-50 mx-auto py-2 rounded-md
                                    font-medium transition hover:opacity-90 focus:outline-none cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        </form>

                    </div>

                    <div className="w-full mt-10">
                        <h1 className="text-xl md:text-2xl font-bold text-center">
                            Upcoming Traveling List
                        </h1>
                        <UpcomingList trips={trips} />
                    </div>
                </main>
            </div>
        </div>
    );
}