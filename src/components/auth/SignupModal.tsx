"use client";

import Modal from '@/components/ui/Modal';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { showToast } from '@/lib/toast/toast';
import { RegisterUserInput } from '@/types/auth.type';
import { searchLocation, getGeoData, LocationSuggestion } from "@/lib/api/location";
import debounce from "lodash/debounce";
import { useMemo } from "react";
import { X } from 'lucide-react'

interface Props {
    open: boolean
    onClose: () => void
    openLogin: () => void
}

type SignupForm = {
    name: string
    gender: string
    address: string
    email: string
    mobile: string
    password: string
}

export default function SignupModal({ open, onClose, openLogin }: Props) {
    // some of the older components used clearError; keep a no‑op here so
    // tooling doesnt complain even though its not used any more.
    const clearError = () => { };
    const { signup, loading } = useAuth();
    const [formData, setFormData] = useState<SignupForm>({
        name: '',
        gender: '',
        address: '',
        email: '',
        mobile: '',
        password: ''
    });
    const [localError, setLocalError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [country, setCountry] = useState("");

    const debouncedSearch = useMemo(
        () =>
            debounce(async (value: string) => {
                try {
                    setIsSearching(true);
                    const results = await searchLocation(value);
                    setSuggestions(results);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsSearching(false);
                }
            }, 300),
        []
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleReset = () => {
        setLocalError(null);
        setCity("");
        setStateName("");
        setCountry("");
        setFormData({
            // empty out each field so the form is pristine
            name: '',
            gender: '',
            address: '',
            email: '',
            mobile: '',
            password: ''
        });
    };

    // Handle Address Search
    const handleAddressSearch = (value: string) => {
        setFormData(prev => ({ ...prev, address: value }));

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        debouncedSearch(value);
    };

    // Handle Select Adress
    const handleSelectAddress = async (item: LocationSuggestion) => {
        setFormData(prev => ({ ...prev, address: item.address }));
        setSuggestions([]);

        try {
            const geo = await getGeoData(item.latitude, item.longitude);

            setCity(geo.city?.name || "");
            setStateName(geo.state?.name || "");
            setCountry(geo.country?.name || "");

            setIsSearching(false);
        } catch (err) {
            console.error(err);
        }
    };

    const clearAddress = () => {
        setFormData(prev => ({ ...prev, address: "" }));
        setSuggestions([]);
        setCity("");
        setStateName("");
        setCountry("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        // Validation
        if (!formData.name) {
            setLocalError('Full name is required');
            return;
        }
        if (!formData.gender) {
            setLocalError('Please select your gender');
            return;
        }
        if (!formData.address) {
            setLocalError('Address is required');
            return;
        }
        if (!formData.email) {
            setLocalError('Email is required');
            return;
        }
        if (!formData.mobile) {
            setLocalError('Phone number is required');
            return;
        }
        if (!formData.password) {
            setLocalError('Password is required');
            return;
        }
        if (formData.password.length < 6) {
            setLocalError('Password must be at least 6 characters');
            return;
        }

        try {
            // convert UI form into API payload
            const payload: RegisterUserInput = {
                first_name: formData.name,
                email: formData.email,
                password: formData.password,
                mobile: formData.mobile,
                country_name: country,
                state_name: stateName,
                city_name: city,
                gender: formData.gender,
            };

            await signup(payload);
            showToast.success('Account created successfully! Welcome aboard');
            handleReset();
            setTimeout(() => onClose(), 500);
        } catch (err: unknown) {
            let errorMsg = 'Signup failed. Please try again.';
            if (err instanceof Error) {
                errorMsg = err.message;
            }
            setLocalError(errorMsg);
            showToast.error(errorMsg);
        }
    };

    const isDisabled = loading;

    return (
        <Modal open={open} onClose={() => { handleReset(); onClose(); }} title="Create your account" size="sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
                {localError && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-700">{localError}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isDisabled}
                        className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="John Doe"
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">E-Mail ID</label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isDisabled}
                        className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="you@email.com"
                    />
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                    <div className='relative'>
                        <input
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleAddressSearch(e.target.value)}
                            disabled={isDisabled}
                            className="w-full pl-4 pr-10 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Your address"
                        />
                        {isSearching && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <span className="block w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                            </div>
                        )}
                        {!isSearching && formData.address && (
                            <button
                                type="button"
                                onClick={clearAddress}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <X className='h-5 w-5 text-slate-400 hover:text-slate-600 cursor-pointer' />
                            </button>
                        )}
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="absolute z-50 mt-1 w-full bg-white border border-slate-300 rounded-xs shadow-lg max-h-36 overflow-auto">
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelectAddress(item)}
                                    className="px-4 py-2 text-sm cursor-pointer hover:bg-slate-100"
                                >
                                    {item.address}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            disabled={isDisabled}
                            className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone No.</label>
                        <input
                            name="mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            disabled={isDisabled}
                            className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={isDisabled}
                        className="w-full px-4 py-3 rounded-md bg-slate-50 border border-slate-400 focus:outline-none focus:border focus:border-blue-900 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Create a password (min. 6 characters)"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        disabled={isDisabled}
                        className="text-sm text-slate-600 hover:text-slate-700 hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() => {
                            handleReset();
                            onClose();
                            openLogin();
                        }}
                    >
                        Already have an account?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full px-5 py-3.5 rounded-md bg-blue-950 text-white text-base font-semibold shadow hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                    {loading ? (
                        <>
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Creating account...
                        </>
                    ) : (
                        'Sign up'
                    )}
                </button>
            </form>
        </Modal>
    );
}
