import TravelInfo from "@/models/TravelInfo";
import { CreateTravelInfoInput } from "@/types/travelInfo.type";

export async function createTravelInfo(data: CreateTravelInfoInput) {
    const travelerInfo = new TravelInfo(data)
    return travelerInfo.save()
}
