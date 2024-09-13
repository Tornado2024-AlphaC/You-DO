import { NextResponse } from "next/server";
import spabase from "@/libs/spabase";

export async function PUT(req:any, { params }:any) {
    const userId = Number(params.user_id);

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

    try {
        // ユーザーのタスクを全て取得
        const { data: tasks, error } = await spabase
            .from("sample-Task") // タスクテーブル名
            .select("*")
            .eq("user_id", userId);

        if (error) {
            return NextResponse.json({
                status: 404,
                message: "ユーザーが存在しません",
            }, { status: 404 });
        }

        if (!tasks || tasks.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "指定されたユーザーにはタスクが見つかりません",
            }, { status: 404 });
        }

        const { data:userdata , error:error2 } = await spabase
            .from("sample-User") // タスクテーブル名
            .select("*")
            .eq("id", userId);

        if (error2) {
            return NextResponse.json({
                status: 404,
                message: "ユーザーが存在しません",
            }, { status: 404 });
        }


        const selectedTasks = tasks.filter(task => task.progress !== 100);//未完のタスク
        
        selectedTasks.map((taskData) => {
            if(taskData.progress !== 0 && taskData.duration !== 0){
                taskData.expectation =Math.floor(((taskData.duration / (taskData.progress/100))*(1-taskData.progress/100)*taskData.progress/100)+
                (taskData.firstexpect*(1-taskData.progress/100)*(1-(taskData.progress/100))* userdata[0].params1));
            }
            else{
                taskData.expectation = Math.floor(taskData.firstexpect*userdata[0].params1);
            }
             });

        const updatePromises = selectedTasks.map((task, index) => {
            return spabase
                .from("sample-Task")
                .update({ expectation: task.expectation })
                .eq("id", task.id);
        });

        await Promise.all(updatePromises);

        // 成功
        return NextResponse.json({
            status: 200,
            message: "タスクの所要時間が更新されました",
            result : selectedTasks
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "サーバーエラーが発生しました",
        }, { status: 500 });
    }
}
