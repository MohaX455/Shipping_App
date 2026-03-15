import { verifyToken } from "@/lib/auth/jwt"
import { NextRequest } from "next/server"
import { AppError } from "@/lib/errors/AppError"

type JwtPayload = {
  userId: string
}

export function requireUser(req: NextRequest): string {

  const token = req.cookies.get("token")?.value

  if (!token) {
    throw new AppError("Unauthorized", 401)
  }

  try {

    const decoded = verifyToken(token) as JwtPayload

    return decoded.userId

  } catch {

    throw new Error("Unauthorized")

  }

}