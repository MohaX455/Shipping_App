import { hashPassword, comparePassword } from "@/lib/auth/password"
import { generateToken } from "@/lib/auth/jwt"
import * as authRepository from "./auth.repository"
import { connectDB } from '@/lib/db/db'

import { RegisterUserInput } from "@/types/auth"

export async function registerUser(data: RegisterUserInput) {
    await connectDB()

    const existingUser = await authRepository.findUserByEmail(data.email)

    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS")
    }

    const existingMobile = await authRepository.findMobile(data.mobile)

    if (existingMobile) {
        throw new Error("MOBILE_ALREADY_EXISTS")
    }

    const hashedPassword = await hashPassword(data.password)

    const user = await authRepository.createUser({
        ...data,
        password: hashedPassword
    })

    const token = generateToken(user._id.toString())

    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            first_name: user.first_name
        }
    }
}

export async function loginUser(email: string, password: string) {

    await connectDB()

    const user = await authRepository.findUserByEmail(email)

    if (!user) {
        throw new Error("INVALID_CREDENTIALS")
    }

    const isValid = await comparePassword(password, user.password)

    if (!isValid) {
        throw new Error("INVALID_CREDENTIALS")
    }

    const token = generateToken(user._id.toString())

    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            first_name: user.first_name
        }
    }
}

export async function me(userId: string) {

    await connectDB()

    const user = await authRepository.findUserById(userId)

    if (!user) {
        throw new Error("User not found")
    }

    return {
        id: user._id,
        email: user.email,
        first_name: user.first_name
    }
}