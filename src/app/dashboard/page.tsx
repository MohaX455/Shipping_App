// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { SwitchForms } from "@/components/dashboard";
import { TravelProvider } from "@/contexts/TravelContext";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/");
        }
    }, [loading, user, router]);

    if (loading || !user) {
        return (
            <main className="w-full bg-slate-50 flex items-center justify-center h-full">
                <div className="text-center text-gray-600">Loading dashboard…</div>
            </main>
        );
    }

    return (
        <main className="w-full bg-slate-50">
            <TravelProvider>
                <SwitchForms />
            </TravelProvider>
        </main>
    );
}