'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import * as travelService from '@/services/travel.client'
import { CreateTravelInfoInput, TravelInfo } from '@/types/travelInfo.type'

type TravelContextType = {
    travels: TravelInfo[]
    loading: boolean
    createTravel: (data: CreateTravelInfoInput) => Promise<void>
}

const TravelContext = createContext<TravelContextType | null>(null)

export function TravelProvider({ children }: { children: ReactNode }) {
    const [travels, setTravels] = useState<TravelInfo[]>([])
    const [loading, setLoading] = useState(true)

    const createTravel = async (data: CreateTravelInfoInput) => {
        setLoading(true)
        try {
            const newTravel = await travelService.createTravel(data)
            setTravels(prev => [newTravel, ...prev])
        } finally {
            setLoading(false)
        }
    }

    return (
        <TravelContext.Provider
            value={{ travels, loading, createTravel }}
        >
            {children}
        </TravelContext.Provider>
    )
}

export function useTravel() {
    const context = useContext(TravelContext)
    if (!context) throw new Error("useTravel must be used inside TravelProvider")
    return context
}