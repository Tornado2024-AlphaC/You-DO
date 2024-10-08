import { NextResponse } from "next/server";
import spabase from "@/libs/spabase";
import { Schedule } from "@/libs/type";


export async function GET(_:any, { params }:{ params: { user_id: string } }) {
    if (!params.user_id) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        },{ status: 400 });
    }
    const user_id = Number(params.user_id);
    if (isNaN(user_id)) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        },{ status: 400 });
    }
    try {
        const { data, error } = await spabase.from("sample-schedule").select("*").eq("user_id", user_id);
        if (error) {
        throw error;
        }
        const scheduleList: Schedule[] = data;
        if (scheduleList.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "Data not found",
            },{ status: 404 });
        }
        return NextResponse.json({
            scheduleList,
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        },{status: 500});
    }
}