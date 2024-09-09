import { NextResponse } from "next/server";
import spabase from "../../../libs/spabase";

export async function GET() {
  try {
    const { data, error } = await spabase.from("sample-posts").select("*");
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

export async function POST(req:any) {
  try {
    const body = await req.json();
    const {error} = await spabase.from("sample-posts").insert([body]);
    if (error) {
      throw error;
    }
    return NextResponse.json({
      message: "Post created successfully",
    });
  } catch (error) {
    throw error;
  }
}