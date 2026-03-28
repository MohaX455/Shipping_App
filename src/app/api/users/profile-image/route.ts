import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
