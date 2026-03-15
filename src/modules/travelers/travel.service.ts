import { connectDB } from "@/lib/db/db";
import { CreateTravelInfoInput } from "@/types/travelInfo.type";
import * as travelInfoRepo from "./travel.repository";
import { AppError } from "@/lib/errors/AppError";

export async function createTravelInfo(data: CreateTravelInfoInput) {

    await connectDB()

    if (!data.travelerId || !data.fromWhere || !data.toWhere || !data.travel_date || !data.maxWeight || !data.from_country_name || !data.from_state_name || !data.to_country_name || !data.to_state_name) throw new AppError('All fields are required', 400)

    const travelDate = new Date(data.travel_date)

    if (travelDate < new Date()) throw new AppError('Travel date must be in the future', 400)
    if (Number(data.maxWeight) <= 0) throw new AppError('Max weight must be positive', 400)
    if (data.from_country_name === data.to_country_name && data.from_state_name === data.to_state_name) throw new AppError('From and to locations cannot be the same', 400)

    const travelerInfo = await travelInfoRepo.createTravelInfo(data)

    return { travelerInfo }
}