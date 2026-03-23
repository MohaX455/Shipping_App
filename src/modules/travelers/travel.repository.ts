import TravelInfo from "@/models/TravelInfo";
import { CreateTravelInfoInput } from "@/types/travelInfo.type";

export async function createTravelInfo(data: CreateTravelInfoInput) {
    const travelerInfo = new TravelInfo(data)
    return travelerInfo.save()
}

export async function getTravelInfosByTravelerId(travelerId: string) {
    return TravelInfo.find({ travelerId }).sort({ createdAt: -1 })
}