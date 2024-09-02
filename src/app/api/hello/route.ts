import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      message: "Hello Next.js API Routes",
    });
  } catch (error) {
    throw error;
  }
}
