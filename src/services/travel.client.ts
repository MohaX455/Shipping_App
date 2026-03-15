import { CreateTravelInfoInput, TravelInfo } from "@/types/travelInfo.type"

// helper for parsing JSON response and throwing on HTTP error
async function parseResponse<T>(res: Response): Promise<T> {
    const data = await res.json()
    if (!res.ok) {
        const message = (data && data.message) || res.statusText || "Request failed"
        throw new Error(message)
    }
    return data
}

// POST create a travel
export async function createTravel(data: CreateTravelInfoInput): Promise<TravelInfo> {
    const res = await fetch("/api/travels/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    return parseResponse<TravelInfo>(res)
}
