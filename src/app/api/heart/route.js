import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Welcome to API Routes!" });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ message: `You submitted the following data: ${JSON.stringify(body)}` });
}
