import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/modules/auth/auth.service', () => ({
    registerUser: vi.fn(async () => ({ token: 'test-token', user: { id: '1', email: 'test@example.com' } })),
    loginUser: vi.fn(async () => ({ token: 'test-token', user: { id: '1', email: 'test@example.com' } })),
    me: vi.fn(async () => ({ id: '1', email: 'test@example.com', first_name: 'Test' })),
    changePassword: vi.fn(async () => undefined)
}))

vi.mock('@/middleware/auth', () => ({
    requireUser: vi.fn(() => 'user-id')
}))

vi.mock('@/modules/travelers/travel.service', () => ({
    createTravelInfo: vi.fn(async (payload) => ({ travelerInfo: { id: 'travel-1', ...payload } })),
    getTravelInfosByTravelerId: vi.fn(async () => [{ id: 'travel-1' }]),
    getAllTravelsInfo: vi.fn(async () => []),
    updateTravelInfo: vi.fn(async () => ({ updatedTravel: { id: 'travel-1' } }))
}))

import { register, logout } from '@/modules/auth/auth.controller'
import { createTravelInfo } from '@/modules/travelers/travel.controller'

describe('Controllers', () => {
    it('auth.register returns a plain data object, not NextResponse', async () => {
        const result = await register({ json: async () => ({ email: 'test@example.com', password: 'password', mobile: '1234567890', first_name: 'Test' }) } as any)

        expect(result).toEqual({ token: 'test-token', user: { id: '1', email: 'test@example.com' } })
        expect(result).not.toHaveProperty('json')
    })

    it('auth.logout returns a plain object', async () => {
        const result = await logout()
        expect(result).toEqual({ success: true })
        expect(result).not.toHaveProperty('cookies')
    })

    it('travel.createTravelInfo returns raw data and does not build a NextResponse', async () => {
        const result = await createTravelInfo({ json: async () => ({ fromWhere: 'A', toWhere: 'B', travel_date: new Date(Date.now() + 3600000).toISOString(), maxWeight: 5, from_country_name: 'France', from_state_name: 'Paris', to_country_name: 'Spain', to_state_name: 'Madrid' }) } as any)

        expect(result).toEqual({ travelerInfo: expect.objectContaining({ id: 'travel-1' }) })
        expect(result).not.toHaveProperty('json')
    })
})
