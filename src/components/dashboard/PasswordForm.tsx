'use client'

import { IMAGE_BASE } from "@/lib/constants";
import Image from "next/image";
import { SquarePen } from 'lucide-react'
import { useAuth } from "@/contexts/AuthContext";

type Props = {
    onSwitch: (view: "password" | "upcoming") => void;
};

export default function PasswordForm({ onSwitch }: Props) {

    const { user } = useAuth()

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
                            className="w-full text-left bg-[var(--color-lightblue)] p-3 rounded text-white cursor-pointer"
                        >
                            Upcoming list
                        </button>

                        <button
                            onClick={() => onSwitch("upcoming")}
                            className="w-full text-left bg-[var(--color-gray)] text-black p-3 rounded cursor-pointer"
                        >
                            Change Password
                        </button>

                    </div>

                </aside>



                {/* Main */}
                <main className="flex-1">
                    <div className="w-full bg-white shadow-md rounded-xs p-6 md:p-8">

                        <h1 className="text-2xl font-bold mb-8 text-center">
                            Change Password
                        </h1>

                        <form className="space-y-5">
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label
                                    htmlFor="newPassword"
                                    className="w-full sm:w-50 text-sm font-semibold text-[var(--color-lightblue)]"
                                >
                                    New Password
                                </label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Enter New Password"
                                    className="flex-1 w-full border border-gray-400 rounded-md p-3 text-sm
                                    focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="w-full sm:w-50 text-sm font-semibold text-[var(--color-lightblue)]"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Enter Confirm Password"
                                    className="flex-1 w-full border border-gray-400 rounded-md p-3 text-sm
                                    focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition"
                                />
                            </div>

                            <div className="flex justify-center pt-2">
                                <button
                                    type="submit"
                                    className="bg-[var(--color-lightblue)] text-white text-base w-50 mx-auto py-2 rounded-md
                 font-medium transition hover:opacity-90 focus:outline-none
                 focus:ring-2 focus:ring-[var(--color-lightblue)] focus:ring-offset-2 cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        </form>

                    </div>
                </main>
            </div>
        </div>
    );
}