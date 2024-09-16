import { NextResponse } from "next/server";
import spabase from "@/libs/spabase";
import {Task} from "@/libs/type";


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

        const selectedTasks = tasks.filter((task) => task.progress !== 100);
        // タスクの優先度を再計算
        const displayNum : number = (selectedTasks.length > 5 )? 5 : selectedTasks.length;//とりあえず5個まで表示
        selectedTasks.sort((a:any,b:any) => a.priority - b.priority);
        const sortedTasks =[...selectedTasks];
        sortedTasks.sort((a:any,b:any) => new Date(a.limit_time).getTime() - new Date(b.limit_time).getTime());
        
        const updatePromises = priotitySort(sortedTasks,selectedTasks,displayNum).map((task:any, index:number) => {
            // 各タスクに順位を設定 (最も早い締切が優先度1)
            return spabase
                .from("sample-Task")
                .update({ priority: task.priority })
                .eq("id", task.id);
        });


        // 全タスクの優先度を更新
        await Promise.all(updatePromises);

        // 成功
        return NextResponse.json({
            status: 200,
            message: "Success",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "サーバーエラーが発生しました",
            error: error 
        }, { status: 500 });
    }
}

function priotitySort(sortedTasks:Task[], selectedTasks:Task[],displayNum:number){
    let targetNum : number = 0;
    for(let i = 0; i < displayNum; i++){
        if(sortedTasks[i].id == selectedTasks[0].id){
           targetNum = i;
        }
    }
    if (targetNum === displayNum-1){
        for(let j =0; j < displayNum; j++){
            sortedTasks[j].priority = j+1;
        }
          
          return sortedTasks;
    }
    else{
       for(let j =0; j <= targetNum; j++){
           sortedTasks[j].priority = j+2;
       }
         sortedTasks[targetNum+1].priority = 1;
         return sortedTasks;
    }
}