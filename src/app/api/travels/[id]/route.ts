import { NextResponse, NextRequest } from 'next/server';
import { updateTravelInfo } from '@/modules/travelers/travel.controller';
import { AppError } from '@/lib/errors/AppError'

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const result = await updateTravelInfo(req, id)
    return NextResponse.json({ success: true, updatedTravel: result.updatedTravel }, { status: 200 })
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
