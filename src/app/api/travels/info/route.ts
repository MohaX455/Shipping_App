import { NextResponse, NextRequest } from 'next/server';
import { createTravelInfo, getTravelInfosByTravelerId } from '@/modules/travelers/travel.controller'
import { AppError } from '@/lib/errors/AppError'

export async function POST(req: NextRequest) {
  try {
    const result = await createTravelInfo(req)
    return NextResponse.json({ success: true, travelerInfo: result.travelerInfo }, { status: 201 })
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const result = await getTravelInfosByTravelerId(req)
    return NextResponse.json({ success: true, travelerInfos: result.travelerInfos }, { status: 200 })
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
