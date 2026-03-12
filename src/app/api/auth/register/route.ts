import { register } from "@/modules/auth/auth.controller"

export async function POST(req: Request) {
  return register(req as any)
}