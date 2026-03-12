import { NextResponse } from 'next/server';

// dummy handler to satisfy TypeScript module requirement
export async function GET() {
  return NextResponse.json({ success: true, benefits: [] });
}

export async function POST() {
  return NextResponse.json({ success: true });
}