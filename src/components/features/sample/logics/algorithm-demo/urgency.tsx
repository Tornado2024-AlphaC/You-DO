function culcUrgency(taskDatas:taskData[], timeDatas:timeData[]){
    taskDatas.sort((a,b) => a.priority - b.priority);
    timeDatas.sort((a,b) => a.start.getTime() - b.start.getTime());
    let duration :number = 0;
    for (let i = 0; i < taskDatas.length; i++){
        let remain:number = 0;
        for (let j = 0; j < timeDatas.length; j++){
            const timeData = timeDatas[j];
            if(timeData.start.getTime() >= taskDatas[i].deadLine.getTime()){
                break;
            }
            else if (timeData.start.getTime() < taskDatas[i].deadLine.getTime() && timeData.end.getTime() >= taskDatas[i].deadLine.getTime()){
                remain += taskDatas[i].deadLine.getTime() - timeData.start.getTime();
                break;
            }
            else{
                remain += timeData.end.getTime() - timeData.start.getTime();
            }
        }
        remain -= duration;
        taskDatas[i].urgency = taskDatas[i].cuExpecTime / remain;
        if (remain < taskDatas[i].cuExpecTime){
            duration += remain;
        }
        else{
            duration += taskDatas[i].cuExpecTime;
        }
    }
    return taskDatas
}

//TaskおよびScheduleが更新された際に、緊急度を計算します。