"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trip } from "./SwitchForms";
import { IMAGE_BASE } from "@/lib/constants";
import { SquarePen, PlaneTakeoff, PlaneLanding, Calendar, Luggage, X } from 'lucide-react'
import UpcomingList from "./UpcomingList";
import { useAuth } from "@/contexts/AuthContext";
import { searchLocation, getGeoData, LocationSuggestion } from "@/lib/api/location";
import debounce from "lodash/debounce";
import { useMemo } from "react";
import { showToast } from '@/lib/toast/toast';
import { useTravel } from "@/contexts/TravelContext";
import { AppError } from "@/lib/errors/AppError";
import { TravelInfo } from '@/types/travelInfo.type';

type Props = {
    onSwitch: (view: "password" | "upcoming") => void;
    onAdd?: (trip: Trip) => void;
};

export default function UpcomingForm({ onSwitch, onAdd }: Props) {

    const { user } = useAuth()
    const { travels, createTravel, updateTravel } = useTravel()

    const [selectedTravel, setSelectedTravel] = useState<TravelInfo | null>(null)
    const isEditing = Boolean(selectedTravel)

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [weight, setWeight] = useState("");

    // Autocompletion states for 'from'
    const [suggestionsFrom, setSuggestionsFrom] = useState<LocationSuggestion[]>([]);
    const [isSearchingFrom, setIsSearchingFrom] = useState(false);

    // Autocompletion states for 'to'
    const [suggestionsTo, setSuggestionsTo] = useState<LocationSuggestion[]>([]);
    const [isSearchingTo, setIsSearchingTo] = useState(false);

    // Geo data states
    const [cityFrom, setCityFrom] = useState("");
    const [stateFrom, setStateFrom] = useState("");
    const [countryFrom, setCountryFrom] = useState("");
    const [cityTo, setCityTo] = useState("");
    const [stateTo, setStateTo] = useState("");
    const [countryTo, setCountryTo] = useState("");

    const [localError, setLocalError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleEditTravel = (travel: TravelInfo) => {
        setSelectedTravel(travel)
        setFrom(travel.fromWhere)
        setCityFrom(travel.fromWhere)
        setStateFrom(travel.from_state_name)
        setCountryFrom(travel.from_country_name)
        setTo(travel.toWhere)
        setCityTo(travel.toWhere)
        setStateTo(travel.to_state_name)
        setCountryTo(travel.to_country_name)
        setDate(new Date(travel.travel_date).toISOString().split('T')[0])
        setWeight(travel.maxWeight.toString())
        setLocalError(null)
    }

    const debouncedSearchFrom = useMemo(
        () =>
            debounce(async (value: string) => {
                try {
                    setIsSearchingFrom(true);
                    const results = await searchLocation(value);
                    setSuggestionsFrom(results);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsSearchingFrom(false);
                }
            }, 300),
        []
    );

    const debouncedSearchTo = useMemo(
        () =>
            debounce(async (value: string) => {
                try {
                    setIsSearchingTo(true);
                    const results = await searchLocation(value);
                    setSuggestionsTo(results);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsSearchingTo(false);
                }
            }, 300),
        []
    );

    useEffect(() => {
        return () => {
            debouncedSearchFrom.cancel();
            debouncedSearchTo.cancel();
        };
    }, [debouncedSearchFrom, debouncedSearchTo]);

    const handleReset = () => {
        setLocalError(null);
        setCityFrom("");
        setStateFrom("");
        setCountryFrom("");
        setCityTo("");
        setStateTo("");
        setCountryTo("");
        setFrom("");
        setTo("");
        setDate("");
        setWeight("");
        setSelectedTravel(null);
    };

    // Handle Address Search for 'from'
    const handleAddressSearchFrom = (value: string) => {
        setFrom(value);

        if (!value.trim()) {
            setSuggestionsFrom([]);
            return;
        }

        debouncedSearchFrom(value);
    };

    // Handle Select Address for 'from'
    const handleSelectAddressFrom = async (item: LocationSuggestion) => {
        setFrom(item.address);
        setSuggestionsFrom([]);

        try {
            const geo = await getGeoData(item.latitude, item.longitude);

            setCityFrom(geo.city?.name || "");
            setStateFrom(geo.state?.name || "");
            setCountryFrom(geo.country?.name || "");

            setIsSearchingFrom(false);
        } catch (err) {
            console.error(err);
        }
    };

    const clearAddressFrom = () => {
        setFrom("");
        setSuggestionsFrom([]);
        setCityFrom("");
        setStateFrom("");
        setCountryFrom("");
    };

    // Handle Address Search for 'to'
    const handleAddressSearchTo = (value: string) => {
        setTo(value);

        if (!value.trim()) {
            setSuggestionsTo([]);
            return;
        }

        debouncedSearchTo(value);
    };

    // Handle Select Address for 'to'
    const handleSelectAddressTo = async (item: LocationSuggestion) => {
        setTo(item.address);
        setSuggestionsTo([]);

        try {
            const geo = await getGeoData(item.latitude, item.longitude);

            setCityTo(geo.city?.name || "");
            setStateTo(geo.state?.name || "");
            setCountryTo(geo.country?.name || "");

            setIsSearchingTo(false);
        } catch (err) {
            console.error(err);
        }
    };

    const clearAddressTo = () => {
        setTo("");
        setSuggestionsTo([]);
        setCityTo("");
        setStateTo("");
        setCountryTo("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        // Validation
        if (!user?.id) {
            setLocalError('User not authenticated');
            return;
        }
        if (!cityFrom) {
            setLocalError('From location is required');
            return;
        }
        if (!cityTo) {
            setLocalError('To location is required');
            return;
        }
        if (!date) {
            setLocalError('Travel date is required');
            return;
        }
        if (!weight) {
            setLocalError('Max weight is required');
            return;
        }

        setLoading(true);

        const payload = {
            fromWhere: cityFrom,
            toWhere: cityTo,
            maxWeight: Number(weight),
            travel_date: date,
            from_country_name: countryFrom,
            from_state_name: stateFrom,
            to_country_name: countryTo,
            to_state_name: stateTo,
        };

        try {
            if (selectedTravel) {
                await updateTravel(selectedTravel._id, payload);
                showToast.success('Trip updated successfully!');
            } else {
                await createTravel({ travelerId: user.id, ...payload, maxWeight: weight });
                showToast.success('Trip added successfully!');
            }
            handleReset();
        } catch (err: unknown) {
            let errorMsg = 'Failed to save trip. Please try again.';
            if (err instanceof Error) {
                errorMsg = err.message;
            }
            setLocalError(errorMsg);
            showToast.error(errorMsg);
        } finally {
            setLoading(false);
        }
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

                        <h2 className="text-lg font-semibold">{user?.first_name}</h2>
                    </div>

                    <div className="w-full flex flex-col items-center gap-3 px-5 py-10 bg-white">
                        <button
                            onClick={() => onSwitch("password")}
                            className="w-full text-left bg-[var(--color-gray)] p-3 rounded text-black cursor-pointer"
                        >
                            Upcoming list
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
                            {isEditing ? 'Update Upcoming Trip' : 'From Where, To Where And When Do You Go'}
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {localError && (
                                <div className="p-3 rounded-md bg-red-50 border border-red-200">
                                    <p className="text-sm text-red-700">{localError}</p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label className="flex items-center gap-2 w-full sm:w-50 text-sm font-semibold text-[var(--color-lightblue)]">
                                    <PlaneTakeoff className="w-6 h-6 text-red-500" />
                                    From where
                                </label>
                                <div className='relative flex-1 w-full'>
                                    <input
                                        value={from}
                                        onChange={(e) => handleAddressSearchFrom(e.target.value)}
                                        disabled={loading}
                                        className="w-full pl-4 pr-10 py-3 border border-gray-400 rounded-md text-sm
                                        focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Select Location*"
                                    />
                                    {isSearchingFrom && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <span className="block w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                                        </div>
                                    )}
                                    {!isSearchingFrom && from && (
                                        <button
                                            type="button"
                                            onClick={clearAddressFrom}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            <X className='h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer' />
                                        </button>
                                    )}
                                    {suggestionsFrom.length > 0 && (
                                        <ul className="absolute z-50 mt-1 w-full bg-white border border-slate-300 rounded-xs shadow-lg max-h-36 overflow-auto">
                                            {suggestionsFrom.map((item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelectAddressFrom(item)}
                                                    className="px-4 py-2 text-sm cursor-pointer hover:bg-slate-100"
                                                >
                                                    {item.address}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label className="flex items-center gap-2 w-full sm:w-50 text-sm font-semibold text-[var(--color-lightblue)]">
                                    <PlaneLanding className="w-6 h-6 text-red-500" />
                                    To where
                                </label>
                                <div className='relative flex-1 w-full'>
                                    <input
                                        value={to}
                                        onChange={(e) => handleAddressSearchTo(e.target.value)} disabled={loading} className="w-full pl-4 pr-10 py-3 border border-gray-400 rounded-md text-sm
                                        focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition"
                                        placeholder="Select Location*"
                                    />
                                    {isSearchingTo && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <span className="block w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                                        </div>
                                    )}
                                    {!isSearchingTo && to && (
                                        <button
                                            type="button"
                                            onClick={clearAddressTo}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            <X className='h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer' />
                                        </button>
                                    )}
                                    {suggestionsTo.length > 0 && (
                                        <ul className="absolute z-50 mt-1 w-full bg-white border border-slate-300 rounded-xs shadow-lg max-h-36 overflow-auto">
                                            {suggestionsTo.map((item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelectAddressTo(item)}
                                                    className="px-4 py-2 text-sm cursor-pointer hover:bg-slate-100"
                                                >
                                                    {item.address}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
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
                                    disabled={loading}
                                    className="flex-1 w-full border border-gray-400 rounded-md p-3 text-sm
                                    focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                                        disabled={loading}
                                        className="flex-1 min-w-0 border border-gray-400 rounded-md p-3 text-sm
                 focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition disabled:opacity-50 disabled:cursor-not-allowed"
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

                            <div className="flex flex-col items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[var(--color-lightblue)] text-white text-base w-full max-w-50 mx-auto py-2 px-4 rounded-md
                                            font-medium flex items-center justify-center gap-2 transition hover:opacity-90
                                            focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading && (
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    )}
                                    <span>{isEditing ? (loading ? 'Updating' : 'Update Trip') : (loading ? 'Saving' : 'Add Trip')}</span>
                                </button>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        disabled={loading}
                                        className="text-sm text-slate-600 underline hover:text-slate-800 disabled:opacity-50 cursor-pointer"
                                    >
                                        Cancel edit
                                    </button>
                                )}
                            </div>
                        </form>

                    </div>

                    <div className="w-full mt-10">
                        <h1 className="text-xl md:text-2xl font-bold text-center mb-10">
                            Upcoming Traveling List
                        </h1>
                        <UpcomingList onEdit={handleEditTravel} />
                    </div>
                </main>
            </div>
        </div>
    );
}