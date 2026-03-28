import { describe, it, expect, vi } from 'vitest'
import { AppError } from '@/lib/errors/AppError'

process.env.MONGODB_URI = 'mongodb://localhost/test'

vi.mock('@/middleware/auth', () => ({
    requireUser: vi.fn(() => 'user-id')
}))

describe('Route handlers', () => {
    it('auth change-password route returns AppError response when validation fails', async () => {
        const { POST } = await import('@/app/api/auth/change-password/route')

        const req = {
            json: async () => ({ password: 'short', confirmPassword: 'short' })
        } as any

        const response = await POST(req)
        expect(response.status).toBe(400)
        expect(await response.json()).toEqual({ message: 'Password must be at least 6 characters' })
    })

    it('auth change-password route returns 500 when the request body parser throws', async () => {
        const { POST } = await import('@/app/api/auth/change-password/route')

        const req = {
            json: async () => {
                throw new Error('boom')
            }
        } as any

        const response = await POST(req)
        expect(response.status).toBe(500)
        expect(await response.json()).toEqual({ message: 'Internal server error' })
    })

    it('travels public route returns AppError json when controller throws business error', async () => {
        vi.resetModules()
        const { AppError: RouteAppError } = await import('@/lib/errors/AppError')

        vi.doMock('@/modules/travelers/travel.controller', () => ({
            getAllTravelsInfo: vi.fn(async () => {
                throw new RouteAppError('No travels yet', 404)
            })
        }))

        const { GET } = await import('@/app/api/travels/public/route')
        const response = await GET()

        expect(response.status).toBe(404)
        expect(await response.json()).toEqual({ message: 'No travels yet' })
    })

    it('travels public route returns 500 for generic controller errors', async () => {
        vi.resetModules()
        vi.doMock('@/modules/travelers/travel.controller', () => ({
            getAllTravelsInfo: vi.fn(async () => {
                throw new Error('boom')
            })
        }))

        const { GET } = await import('@/app/api/travels/public/route')
        const response = await GET()

        expect(response.status).toBe(500)
        expect(await response.json()).toEqual({ message: 'Internal server error' })
    })
})
