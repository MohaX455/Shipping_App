import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!
type JwtPayload = {
  userId: string
}

export function generateToken(userId: string) {

  return jwt.sign(
    { userId } as JwtPayload,
    JWT_SECRET,
    { expiresIn: "7d" }
  )

}

export function verifyToken(token: string) {

  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }

}