import { NextResponse } from "next/server";
import spabase from "@/libs/spabase";
import {Task,Schedule} from "@/libs/type";


export async function PUT(req:any, { params }:any) {
    const userId = Number(params.user_id);

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
            .from("sample-User") 
            .select("*")
            .eq("id", userId);

        if (error2) {
            return NextResponse.json({
                status: 404,
                message: "ユーザーが存在しません",
            }, { status: 404 });
        }

        const jst = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
        const now = new Date(jst);
        const nowHour = now.getHours();
        const nowMinute = now.getMinutes();
        const nowSecond = now.getSeconds();
        const nowDate = now.getDate();
        const nowMonth = now.getMonth() + 1;
        const nowYear = now.getFullYear();

        const nowTime = nowYear + "-" + nowMonth + "-" + nowDate + " " + nowHour + ":" + nowMinute + ":" + nowSecond;

        //現在時刻より終了時間が後のスケジュールを取得
        const { data:scheduleData, error :error3 } = 
        await spabase.from("sample-schedule").select("*").eq("user_id", userId).gt("end_time", nowTime).order("start_time");

        if (error3) {
            throw error3;
        }

        if (scheduleData.length === 0) {
            return NextResponse.json({
                status: 404,
                message: "Data not found",
            },{ status: 404 });
        }

        const scheduleList: Schedule[] = scheduleData;

        const selectedTasks:Task[] = tasks.filter(task => task.progress !== 100);//未完のタスク
        
        const resultTask:Task[] = culcUrgency(selectedTasks, scheduleList, userdata[0].params2).result;
        const durationList:number[] = culcUrgency(selectedTasks, scheduleList, userdata[0].params2).durationList;
        const remainList:number[] = culcUrgency(selectedTasks, scheduleList, userdata[0].params2).remainList;

        const updatePromises = resultTask.map((task, index) => {
            return spabase
                .from("sample-Task")
                .update({ urgency: task.urgency })
                .eq("id", task.id);
        });

        await Promise.all(updatePromises);

        // 成功
        return NextResponse.json({
            status: 200,
            message: "Success",
            result : remainList
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "サーバーエラーが発生しました",
        }, { status: 500 });
    }
}

function convertTimestampToMilliseconds(timestamp: string): number {
    // 受け取ったタイムスタンプ文字列をDateオブジェクトに変換
    const date = new Date(timestamp);
    
    // Dateオブジェクトを秒に変換
    return date.getTime();
  }
  

function culcUrgency(taskDatas:Task[], timeDatas:Schedule[], params2:number){
    taskDatas.sort((a,b) => a.priority - b.priority);
    timeDatas.sort((a,b) => convertTimestampToMilliseconds(a.start_time) - convertTimestampToMilliseconds(b.start_time));
    let duration :number = 0;
    const remainList:number[] = [];
    const durationList:number[] = [];
    for (let i = 0; i < taskDatas.length; i++){
        let remain:number = 0;
        for (let j = 0; j < timeDatas.length; j++){
            const timeData = timeDatas[j];
            if(convertTimestampToMilliseconds(timeData.start_time)>= convertTimestampToMilliseconds(taskDatas[i].limit_time)){
                break;
            }
            else if (convertTimestampToMilliseconds(timeData.start_time) < convertTimestampToMilliseconds(taskDatas[i].limit_time)
                 && convertTimestampToMilliseconds(timeData.end_time) >= convertTimestampToMilliseconds(taskDatas[i].limit_time)){
                remain += (convertTimestampToMilliseconds(taskDatas[i].limit_time) - convertTimestampToMilliseconds(timeData.start_time));
                break;
            }
            else{
                remain += convertTimestampToMilliseconds(timeData.end_time) - convertTimestampToMilliseconds(timeData.start_time);
            }
        }
        remain -= duration;
        remainList.push(remain);
        if(remain ===0){
            remain =1;
        }
        taskDatas[i].urgency = categorizeValue(taskDatas[i].expectation/remain,params2);
        if (remain < taskDatas[i].expectation){
            duration += taskDatas[i].expectation;
        }
        else if (remain <= taskDatas[i].expectation/params2){
            duration += remain;
        }
        else{
            duration += taskDatas[i].expectation/params2;
        }
        durationList.push(duration);
    }

    return {result:taskDatas, durationList:durationList, remainList:remainList};
}

function categorizeValue(value: number, param:number): number {
    if (value > 1) {
      return 2;
    } else if ( value > param) {
      return 1;
    } else if(value > 0) {
      return 0;
    }
    else{
        return 2
    }
}