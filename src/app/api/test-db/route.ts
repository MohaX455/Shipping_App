import { connectDB } from '@/lib/db/db'

export async function GET() {
    try {
        await connectDB()
        return Response.json({ message: "Database connection successful" })
    } catch (error) {
        console.error("Database connection error:", error)
        return Response.json({ message: "Database connection failed" }, { status: 500 })
    }
}