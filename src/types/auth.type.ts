export interface RegisterUserInput {
    first_name: string
    email: string
    password: string
    mobile: string
    country_name: string
    state_name: string
    city_name: string
    gender: string
}

export type ChangePasswordDTO = {
    password: string
    confirmPassword: string
}