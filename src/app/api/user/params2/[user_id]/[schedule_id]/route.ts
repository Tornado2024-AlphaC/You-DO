import { NextResponse } from 'next/server';
import spabase from "@/libs/spabase";
import {Schedule,User} from "@/libs/type";

export async function PUT(req: Request, { params }: { params: { user_id: string, schedule_id: string } }) {
    // パスパラメータから user_id と task_id を取得
    const userId = Number(params.user_id);
    const scheduleId = Number(params.schedule_id);

    // クエリパラメータのチェック
    if (!userId) {
        return NextResponse.json({
            status: 400,
            message: "ユーザーIDが必要です",
        }, { status: 400 });
    }

    if (isNaN(userId)) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        },{ status: 400 });
    }

    if (!scheduleId) {
        return NextResponse.json({
            status: 400,
            message: "タスクIDが必要です",
        }, { status: 400 });
    }

    if (isNaN(scheduleId)) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        },{ status: 400 });
    }

    try {
        // ユーザーデータを取得
        const { data: userDara, error } = await spabase
            .from("sample-User") 
            .select("*")
            .eq("id", userId);

        if (error) {
            return NextResponse.json({
                status: 404,
                message: "ユーザーが存在しません",
            }, { status: 404 });
        }

        const { data: scheduleData, error:error2 } = await spabase
            .from("sample-schedule")
            .select("*")
            .eq("id", scheduleId);

        if (error2) {
            return NextResponse.json({
                status: 404,
                message: "スケジュールが存在しません",
            }, { status: 404 });
        }

        const result: User = culcParams2(userDara[0],scheduleData[0]);
       
                // 指定されたユーザーのデータを更新
       await spabase.from("sample-User")
       .update({ params2: result.params2 })
                .eq("id", result.id);
        

        // 成功
        return NextResponse.json({
            status: 200,
            message: result.params2
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "サーバーエラーが発生しました",
            error: error 
        }, { status: 500 });
    }
}

function culcParams2(userData : User,timeData : Schedule) {
    const commitRate = timeData.duration / (convertTimestampToMilliseconds(timeData.end_time) 
    - convertTimestampToMilliseconds(timeData.start_time));
    const newParams = userData.params2 *0.8+ commitRate *0.2;
    userData.params2 = parseFloat(newParams.toFixed(3));
    return userData;
}

function convertTimestampToMilliseconds(timestamp: string): number {
    // 受け取ったタイムスタンプ文字列をDateオブジェクトに変換
    const date = new Date(timestamp);
    
    // Dateオブジェクトを秒に変換
    return date.getTime()/60000;
  }
  
