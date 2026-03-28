'use client'

import { PlaneTakeoff, PlaneLanding, Calendar, Package, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { TravelInfo } from '@/types/travelInfo.type'

type Props = {
    travel: TravelInfo
    onSendParcel: (id: string) => void
}

export default function UpcomingTravelerCard({ travel, onSendParcel }: Props) {
    return (
        <motion.div
            className="relative isolate bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <div className="space-y-5">
                <div className="relative grid grid-cols-2 gap-4">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -translate-y-1/2 z-0"></div>

                    <div className="relative z-10 bg-gray-100 p-4 rounded-lg border border-transparent hover:border-gray-200 transition">
                        <div className="flex items-center mb-2 text-gray-800 font-medium">
                            <PlaneTakeoff className="w-6 h-6 mr-2 text-red-500" />
                            From
                        </div>
                        <p className="font-semibold text-[var(--color-lightblue)]">{travel.fromWhere}</p>
                        <p className="text-sm text-gray-500">{travel.from_state_name}</p>
                    </div>

                    <div className="relative z-10 bg-gray-100 p-4 rounded-lg border border-transparent hover:border-gray-200 transition">
                        <div className="flex items-center mb-2 text-gray-800 font-medium">
                            <PlaneLanding className="w-6 h-6 mr-2 text-red-500" />
                            To
                        </div>
                        <p className="font-semibold text-[var(--color-lightblue)]">{travel.toWhere}</p>
                        <p className="text-sm text-gray-500">{travel.to_state_name}</p>
                    </div>
                </div>

                <div className="h-[1px] bg-gray-200"></div>

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

                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-700">
                        <Package className="w-6 h-6 text-red-500" />
                        <span className="font-medium">Max Parcel</span>
                    </div>
                    <span className="text-red-500 font-semibold">{travel.maxWeight} Kg</span>
                </div>

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => onSendParcel(travel._id)}
                        className="bg-[var(--color-lightblue)] text-white text-sm font-medium h-10 px-10 rounded-md transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-lightblue)] focus:ring-offset-2 cursor-pointer"
                    >
                        Send Parcel
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
