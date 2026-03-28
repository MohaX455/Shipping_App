import TravelInfo from "@/models/TravelInfo";
import { CreateTravelInfoInput, UpdateTravelInfoInput } from "@/types/travelInfo.type";

export async function getTravelInfoById(id: string) {
    return TravelInfo.findById(id)
}

export async function createTravelInfo(data: CreateTravelInfoInput) {
    const travelerInfo = new TravelInfo(data)
    return travelerInfo.save()
}

export async function getTravelInfosByTravelerId(travelerId: string) {
    return TravelInfo.find({ travelerId }).sort({ createdAt: -1 })
}

export async function getAllTravelsInfo() {
    return TravelInfo.find().sort({ createdAt: -1 })
}

export async function updateTravelInfo(travelInfoId: string, data: UpdateTravelInfoInput) {
    return TravelInfo.findByIdAndUpdate(travelInfoId, data, { new: true })
}