'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import * as travelService from '@/services/travel.client'
import { CreateTravelInfoInput, TravelInfo } from '@/types/travelInfo.type'

type TravelContextType = {
    travels: TravelInfo[]
    loading: boolean        // fetch initial
    creating: boolean       // création d’un travel
    createTravel: (data: CreateTravelInfoInput) => Promise<void>
}

const TravelContext = createContext<TravelContextType | null>(null)

export function TravelProvider({ children }: { children: ReactNode }) {
    const [travels, setTravels] = useState<TravelInfo[]>([])
    const [loading, setLoading] = useState(true)   // fetch initial
    const [creating, setCreating] = useState(false) // ajout d’un travel

    const createTravel = async (data: CreateTravelInfoInput) => {
        setCreating(true)
        try {
            const newTravel = await travelService.createTravel(data)
            setTravels(prev => [newTravel, ...prev])
        } finally {
            setCreating(false)
        }
    }

    useEffect(() => {
        let isMounted = true

        const fetchTravels = async () => {
            setLoading(true)
            try {
                const data = await travelService.getTravels()
                if (isMounted) setTravels(data)
            } catch (error) {
                console.error("Failed to fetch travels:", error)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchTravels()
        return () => { isMounted = false }
    }, [])

    return (
        <TravelContext.Provider
            value={{ travels, loading, creating, createTravel }}
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