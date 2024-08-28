import { NextResponse } from "next/server";
import spabase from "../../../libs/spabase";

export async function GET() {
  try {
    const { data, error } = await spabase.from("posts").select("*");
    if (error) {
      throw error;
    }
    return NextResponse.json({
      data,
    });
  } catch (error) {
    throw error;
  }
}
