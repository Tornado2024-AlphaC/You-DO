import { NextResponse } from "next/server";
import spabase from "@/libs/spabase";

type Schedule = {
    id: number;
    user_id: number;
    type: string;
    start_time: string;
    end_time: string;
    duration: number;
    updated_at: string;
    created_at: string;
}

export async function GET(_:any, { params }: { params: { user_id: string } }) {
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
    //現在の時刻を取得
    const jst = new Date().toLocaleString("ja-JP", {timeZone: "Asia/Tokyo"});
    const now = new Date(jst);
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
    const nowSecond = now.getSeconds();
    const nowDate = now.getDate();
    const nowMonth = now.getMonth() + 1;
    const nowYear = now.getFullYear();

    const nowTime = nowYear + "-" + nowMonth + "-" + nowDate + " " + nowHour + ":" + nowMinute + ":" + nowSecond;
    try {

        //現在時刻より終了時間が後のスケジュールを取得
        const { data, error } = await spabase.from("sample-schedule").select("*").limit(2).eq("user_id", user_id).gt("end_time", nowTime).order("start_time");

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "Data not found",
            },{ status: 404 });
        }
        //１個目：現在または直近のスケジュール、２個目：その次のスケジュール
        const scheduleList: Schedule[] = data;
        return NextResponse.json({
            scheduleList,
        });
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        },{ status: 500 });
    }
}