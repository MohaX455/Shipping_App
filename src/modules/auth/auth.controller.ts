import { NextRequest, NextResponse } from "next/server"
import * as authService from "./auth.service"
import { requireUser } from "@/middleware/auth"

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
            sameSite: "strict",
            path: "/"
        })

        return response

    } catch (error: any) {

        console.log('Error', error)

        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return NextResponse.json(
                { message: "Email already used" },
                { status: 400 }
            )
        }

        if (error.message === "MOBILE_ALREADY_EXISTS") {
            return NextResponse.json(
                { message: "Mobile already used" },
                { status: 400 }
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

        if (error.message === "INVALID_CREDENTIALS") {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
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

        if (error.message === "Unauthorized") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
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