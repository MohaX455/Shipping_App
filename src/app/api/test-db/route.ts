import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/db'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({ message: 'Database connection successful' })
  } catch (error: any) {
    console.error('Database connection error:', error)
    return NextResponse.json({ message: 'Database connection failed' }, { status: 500 })
  }
}
