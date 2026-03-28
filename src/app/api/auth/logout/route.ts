import { NextResponse } from 'next/server'
import { logout } from '@/modules/auth/auth.controller'
import { AppError } from '@/lib/errors/AppError'

export async function POST() {
  try {
    await logout()
    const response = NextResponse.json({ success: true })
    response.cookies.delete('token')
    return response
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
