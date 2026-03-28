import { NextResponse } from 'next/server'
import { getAllTravelsInfo } from '@/modules/travelers/travel.controller'
import { AppError } from '@/lib/errors/AppError'

export async function GET() {
  try {
    const result = await getAllTravelsInfo()
    return NextResponse.json({ success: true, travelInfos: result.travelInfos }, { status: 200 })
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
