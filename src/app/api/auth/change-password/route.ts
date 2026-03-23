import { changePassword } from "@/modules/auth/auth.controller";

export function POST(req: Request) {
    return changePassword(req as any)
}