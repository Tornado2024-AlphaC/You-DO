import { NextResponse } from "next/server";
import spabase from "../../../../libs/spabase";

export async function GET(req:any, { params }:any) {
    const id = Number(params.id);
    try {
        const { data, error } = await spabase.from("sample-posts").select("*").eq("id", id);
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