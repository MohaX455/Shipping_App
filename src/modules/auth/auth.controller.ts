import { NextRequest } from "next/server"
import * as authService from "./auth.service"
import { requireUser } from "@/middleware/auth"
import { AppError } from "@/lib/errors/AppError"
import { ChangePasswordDTO } from "@/types/auth.type"

export async function register(req: NextRequest) {
  const body = await req.json()
  return await authService.registerUser(body)
}

export async function login(req: NextRequest) {
  const body = await req.json()
  return await authService.loginUser(body.email, body.password)
}

export async function me(req: NextRequest) {
  const userId = requireUser(req)
  return await authService.me(userId)
}

export async function logout() {
  return { success: true }
}

export async function changePassword(req: NextRequest) {
  const userId = requireUser(req)
  const body: ChangePasswordDTO = await req.json()

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

  return {
    success: true,
    message: "Password updated successfully"
  }
}
