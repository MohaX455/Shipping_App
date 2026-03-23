"use client";

import { PlaneTakeoff, PlaneLanding, Calendar, Package, SquarePen, X } from 'lucide-react';
import { motion } from "framer-motion";

interface TravelCardProps {
    travel: {
        _id: string;
        fromWhere: string;
        toWhere: string;
        from_state_name: string;
        to_state_name: string;
        travel_date: string;
        maxWeight: number;
    };
}

export default function TravelCard({ travel }: TravelCardProps) {
    return (
        <motion.div
            className="relative isolate bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-6 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            {/* Top actions floating */}
            <div className="flex justify-end gap-3">
                <button className="text-gray-500 hover:text-[var(--color-lightblue)] cursor-pointer">
                    <SquarePen className="w-5 h-5" />
                </button>
                {/* <button className="text-gray-500 hover:text-red-600 cursor-pointer">
                    <X className="h-5 w-5 scale-115" />
                </button> */}
            </div>

            <div className="space-y-5">

                {/* From → To with visual connection */}
                <div className="relative grid grid-cols-2 gap-4">

                    {/* Connector line */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -translate-y-1/2 z-0"></div>

                    {/* FROM */}
                    <div className="relative z-10 bg-gray-100 p-4 rounded-lg border border-transparent hover:border-gray-200 transition">
                        <div className="flex items-center mb-2 text-gray-800 font-medium">
                            <PlaneTakeoff className="w-6 h-6 mr-2 text-red-500" />
                            From
                        </div>
                        <p className="font-semibold text-[var(--color-lightblue)]">
                            {travel.fromWhere}
                        </p>
                        <p className="text-sm text-gray-500">
                            {travel.from_state_name}
                        </p>
                    </div>

                    {/* TO */}
                    <div className="relative z-10 bg-gray-100 p-4 rounded-lg border border-transparent hover:border-gray-200 transition">
                        <div className="flex items-center mb-2 text-gray-800 font-medium">
                            <PlaneLanding className="w-6 h-6 mr-2 text-red-500" />
                            To
                        </div>
                        <p className="font-semibold text-[var(--color-lightblue)]">
                            {travel.toWhere}
                        </p>
                        <p className="text-sm text-gray-500">
                            {travel.to_state_name}
                        </p>
                    </div>
                </div>

                {/* Divider (soft modern separation) */}
                <div className="h-[1px] bg-gray-200"></div>

                {/* Travel Date */}
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg border border-transparent hover:border-gray-200 transition">
                    <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-6 h-6 text-[var(--color-lightblue)]" />
                        <span className="font-medium">Travel Date</span>
                    </div>
                    <span className="text-sm">
                        {new Date(travel.travel_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </div>

                {/* Max Weight */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700">
                        <Package className="w-6 h-6 text-red-500" />
                        <span className="font-medium">Max Parcel</span>
                    </div>
                    <span className="text-red-500 font-semibold">
                        {travel.maxWeight} Kg
                    </span>
                </div>

            </div>
        </motion.div>
    );
}