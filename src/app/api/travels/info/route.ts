import { NextRequest } from 'next/server';
import { createTravelInfo } from '@/modules/travelers/travel.controller'

export async function POST(req: NextRequest) {
    return createTravelInfo(req)
}
