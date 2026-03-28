import { CreateTravelInfoInput, UpdateTravelInfoInput, TravelInfo } from "@/types/travelInfo.type"

// helper for parsing JSON response and throwing on HTTP error
async function parseResponse<T>(res: Response): Promise<T> {
    const text = await res.text()

    let data = null

    try {
        data = text ? JSON.parse(text) : null
    } catch {
        throw new Error("Invalid JSON response from server")
    }

    if (!res.ok) {
        const message = data?.message || res.statusText || "Request failed"
        throw new Error(message)
    }

    return data
}

// POST create a travel
export async function createTravel(data: CreateTravelInfoInput): Promise<TravelInfo> {
    const res = await fetch("/api/travels/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const dataJson = await parseResponse<{ travelerInfo: TravelInfo }>(res)
    return dataJson.travelerInfo
}

// GET all travels
export async function getTravels(): Promise<TravelInfo[]> {
    const res = await fetch("/api/travels/info", {
        method: "GET",
        credentials: "include"
    })
    const dataJson = await parseResponse<{ travelerInfos: TravelInfo[] }>(res)
    return dataJson.travelerInfos
}

export async function getAllTravels(): Promise<TravelInfo[]> {
    const res = await fetch("/api/travels/public", {
        method: "GET"
    })
    const dataJson = await parseResponse<{ travelInfos: TravelInfo[] }>(res)
    return dataJson.travelInfos
}

export async function updateTravel(id: string, data: UpdateTravelInfoInput): Promise<TravelInfo> {
    const res = await fetch(`/api/travels/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const dataJson = await parseResponse<{ updatedTravel: TravelInfo }>(res)
    return dataJson.updatedTravel
}