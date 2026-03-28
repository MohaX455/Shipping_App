import { NextResponse } from 'next/server'
import { login } from '@/modules/auth/auth.controller'
import { AppError } from '@/lib/errors/AppError'

export async function POST(req: Request) {
  try {
    const result = await login(req as any)
    const response = NextResponse.json({ success: true, user: result.user })

    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    })

    return response
  } catch (error: any) {
    if (error instanceof AppError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
