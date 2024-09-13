import { NextResponse } from "next/server";
import spabase from "@/libs/spabase";

export async function PUT(req:any, { params }:any) {
    const userId = Number(params.user_id);

    // パラメータのチェック
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

        // タスクの優先度を再計算
        const selectedTasks = tasks.filter(task => task.progress !== 100);
        const sortedTasks = selectedTasks.sort((a, b) => new Date(a.limit_time).getTime() - new Date(b.limit_time).getTime());

        const updatePromises = sortedTasks.map((task, index) => {
            // 各タスクに順位を設定 (最も早い締切が優先度1)
            return spabase
                .from("sample-Task")
                .update({ priority: index + 1 })
                .eq("id", task.id);
        });

        // 全タスクの優先度を更新
        await Promise.all(updatePromises);

        // 成功
        return NextResponse.json({
            status: 200,
            message: "タスクの優先度が更新されました"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "サーバーエラーが発生しました",
        }, { status: 500 });
    }
}
