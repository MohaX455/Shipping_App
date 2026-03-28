import { NextResponse } from 'next/server'
import { me } from '@/modules/auth/auth.controller'
import { AppError } from '@/lib/errors/AppError'

export async function GET(req: Request) {
  try {
    const user = await me(req as any)
    return NextResponse.json({ success: true, user })
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
