import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    
}

export async function GET() {
    return NextResponse.json({ success: true, info: null });
}
