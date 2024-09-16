import { NextResponse } from "next/server";
import spabase from "@/libs/spabase";
import { User } from "@/libs/type";

export async function GET(_:any, { params }:{ params: { uuid: string } }) {
    if (!params.uuid) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        },{ status: 400 });
    }
    const uuid = params.uuid;
    try {
        const { data, error } = await spabase.from("sample-User").select("*").eq("uuid", uuid);
        if (error) {
        throw error;
        }
        if (data.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "Data not found",
            },{ status: 404 });
        }
        if (data.length > 1) {
            return NextResponse.json({
                status: 500,
                message: "Internal Server Error",
            },{ status: 500 });
        }
        const user: User = data[0];
        return NextResponse.json({
            user,
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        },{status: 500});
    }
}