import { NextRequest, NextResponse } from "next/server"
import * as authService from "./auth.service"
import { requireUser } from "@/middleware/auth"
import { AppError } from "@/lib/errors/AppError"
import { ChangePasswordDTO } from "@/types/auth.type"

export async function register(req: NextRequest) {

    try {

        const body = await req.json()

        const result = await authService.registerUser(body)

        const response = NextResponse.json({
            success: true,
            user: result.user
        })

        response.cookies.set("token", result.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })

        return response

    } catch (error: any) {

        if (error instanceof AppError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function login(req: NextRequest) {

    try {

        const body = await req.json()

        const result = await authService.loginUser(
            body.email,
            body.password
        )

        const response = NextResponse.json({
            success: true,
            user: result.user
        })

        response.cookies.set("token", result.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/"
        })

        return response

    } catch (error: any) {

        if (error instanceof AppError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function me(req: NextRequest) {

    try {
        const userId = requireUser(req)

        const user = await authService.me(userId)

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name
            }
        })
    } catch (error: any) {

        if (error instanceof AppError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}


export async function logout() {

    try {
        const response = NextResponse.json({
            success: true
        })

        response.cookies.delete("token")

        return response
    } catch (error: any) {

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function changePassword(req: NextRequest) {
    try {
        const userId = requireUser(req)

        const body: ChangePasswordDTO = await req.json()

        // Validation
        if (!body.password || !body.confirmPassword) {
            throw new AppError("All fields are required", 400)
        }

        if (body.password.length < 6) {
            throw new AppError("Password must be at least 6 characters", 400)
        }

        if (body.password !== body.confirmPassword) {
            throw new AppError("Passwords do not match", 400)
        }

        await authService.changePassword(userId, body.password)

        return NextResponse.json({
            success: true,
            message: "Password updated successfully"
        })

    } catch (error: any) {
        if (error instanceof AppError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.statusCode }
            )
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}