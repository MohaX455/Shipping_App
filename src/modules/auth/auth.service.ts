import { hashPassword, comparePassword } from "@/lib/auth/password"
import { generateToken } from "@/lib/auth/jwt"
import * as authRepository from "./auth.repository"
import { connectDB } from '@/lib/db/db'
import { AppError } from "@/lib/errors/AppError"

import { RegisterUserInput } from "@/types/auth.type"

export async function registerUser(data: RegisterUserInput) {
    await connectDB()

    const existingUser = await authRepository.findUserByEmail(data.email)

    if (existingUser) {
        throw new AppError("Email already used", 409)
    }

    const existingMobile = await authRepository.findMobile(data.mobile)

    if (existingMobile) {
        throw new AppError("Mobile already used", 409)
    }

    if (data.password.length < 6) {
        throw new AppError("Password must be at least 6 characters", 400)
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
        throw new AppError("Invalid email or password", 401)
    }

    const isValid = await comparePassword(password, user.password)

    if (!isValid) {
        throw new AppError("Invalid email or password", 401)
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
        throw new AppError("User not found", 404)
    }

    return {
        id: user._id,
        email: user.email,
        first_name: user.first_name
    }
}

export async function changePassword(userId: string, password: string) {

    const hashedPassword = await hashPassword(password)

    await authRepository.changePassword(userId, hashedPassword)
}