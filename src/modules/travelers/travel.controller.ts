import { NextRequest, NextResponse } from 'next/server';
import * as travelInfoService from './travel.service'
import { requireUser } from '@/middleware/auth';
import { AppError } from '@/lib/errors/AppError';

export async function createTravelInfo(req: NextRequest) {

    try {
        const userId = requireUser(req)

        const data = await req.json()
        const payload = {
            ...data,
            travelerId: userId
        }

        const { travelerInfo } = await travelInfoService.createTravelInfo(payload)

        return NextResponse.json(
            { travelerInfo },
            { status: 201 }
        )
    } catch (err: any) {

        if (err instanceof AppError) {
            return NextResponse.json(
                { message: err.message },
                { status: err.statusCode }
            )
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }

}

export async function getTravelInfosByTravelerId(req: NextRequest) {

    try {
        const userId = requireUser(req)

        const travelerInfos = await travelInfoService.getTravelInfosByTravelerId(userId)

        return NextResponse.json(
            { travelerInfos },
            { status: 200 }
        )
    } catch (err: any) {

        if (err instanceof AppError) {
            return NextResponse.json(
                { message: err.message },
                { status: err.statusCode }
            )
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}