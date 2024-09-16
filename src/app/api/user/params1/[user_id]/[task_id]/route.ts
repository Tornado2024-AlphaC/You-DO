import { NextResponse } from 'next/server';
import spabase from "@/libs/spabase";
import {Task,User} from "@/libs/type";

export async function PUT(req: Request, { params }: { params: { user_id: string, task_id: string } }) {
    // パスパラメータから user_id と task_id を取得
    const userId = Number(params.user_id);
    const taskId = Number(params.task_id);

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

    if (!taskId) {
        return NextResponse.json({
            status: 400,
            message: "タスクIDが必要です",
        }, { status: 400 });
    }

    if (isNaN(taskId)) {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        },{ status: 400 });
    }


    try {
        // ユーザーのタスクを全て取得
        const { data: userDara, error } = await spabase
            .from("sample-User") // タスクテーブル名
            .select("*")
            .eq("id", userId);

        if (error) {
            return NextResponse.json({
                status: 404,
                message: "ユーザーが存在しません",
            }, { status: 404 });
        }

        const { data: taskDara, error:error2 } = await spabase
            .from("sample-Task") // タスクテーブル名
            .select("*")
            .eq("id", taskId);

        if (error2) {
            return NextResponse.json({
                status: 404,
                message: "タスクが存在しません",
            }, { status: 404 });
        }

        if(userDara[0].id !== taskDara[0].user_id){
            return NextResponse.json({
                status: 400,
                message: "ユーザーIDとが一致しません",
            }, { status: 400 });
        }

        const result: User = culcParams1(userDara[0],taskDara[0]);
       
                // 指定されたユーザーのデータを更新
       await spabase.from("sample-User")
       .update({ params1: result.params1 })
                .eq("id", result.id);
        

        // 成功
        return NextResponse.json({
            status: 200,
            message: result.params1
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "サーバーエラーが発生しました",
            error: error 
        }, { status: 500 });
    }
}

function culcParams1(userData : User,taskData : Task) {
    if (taskData.firstexpect !== 0) {
    const achievementRate = taskData.duration/ taskData.firstexpect;
    const newParams = userData.params1 *0.7 + achievementRate *0.3;
    userData.params1 = parseFloat(newParams.toFixed(3));
    return userData;
    }
    else{
        return userData;
    }
}