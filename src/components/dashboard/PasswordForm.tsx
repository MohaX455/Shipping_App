'use client'

import { IMAGE_BASE } from "@/lib/constants";
import Image from "next/image";
import { SquarePen } from 'lucide-react'
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { showToast } from '@/lib/toast/toast';

type Props = {
    onSwitch: (view: "password" | "upcoming") => void;
};

export default function PasswordForm({ onSwitch }: Props) {

    const { user, changePassword } = useAuth()

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [localError, setLocalError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLocalError(null)

        if (!newPassword.trim()) {
            setLocalError('New password is required')
            return
        }

        if (!confirmPassword.trim()) {
            setLocalError('Confirm password is required')
            return
        }

        setLoading(true)

        try {
            await changePassword({ password: newPassword, confirmPassword })
            showToast.success('Password changed successfully!')
            setNewPassword("")
            setConfirmPassword("")
        } catch (err: unknown) {
            let errorMsg = 'Failed to change password. Please try again.'
            if (err instanceof Error) {
                errorMsg = err.message
            }
            setLocalError(errorMsg)
            showToast.error(errorMsg)
        } finally {
            setLoading(false)
        }
    }

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

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {localError && (
                                <div className="p-3 rounded-md bg-red-50 border border-red-200">
                                    <p className="text-sm text-red-700">{localError}</p>
                                </div>
                            )}
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
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="flex-1 w-full border border-gray-400 rounded-md p-3 text-sm
                                    focus:outline-none focus:border focus:border-[var(--color-lightblue)] transition"
                                />
                            </div>

                            <div className="flex justify-center pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[var(--color-lightblue)] text-white text-base w-full max-w-50 mx-auto py-2 rounded-md
                 font-medium transition hover:opacity-90 focus:outline-none
                 focus:ring-offset-2 cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}