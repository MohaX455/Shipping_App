import { NextRequest } from 'next/server';
import { createTravelInfo, getTravelInfosByTravelerId } from '@/modules/travelers/travel.controller'

export async function POST(req: NextRequest) {
    return createTravelInfo(req)
}

export async function GET(req: NextRequest) {
    return getTravelInfosByTravelerId(req)
}