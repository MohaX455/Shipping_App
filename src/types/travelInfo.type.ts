export interface CreateTravelInfoInput {
    travelerId: string
    fromWhere: string
    toWhere: string
    maxWeight: string
    travel_date: Date
    from_country_name: string
    from_state_name: string
    to_country_name: string
    to_state_name: string
}

export type TravelInfo = {
    _id: string
    travelerId: string
    fromWhere: string
    toWhere: string
    maxWeight: number
    travel_date: string
    from_country_name: string
    from_state_name: string
    to_country_name: string
    to_state_name: string
    created_at: string
    updated_at: string
}