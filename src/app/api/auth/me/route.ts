import { me } from "@/modules/auth/auth.controller";

export async function GET(req: Request) {
  return me(req as any)
}