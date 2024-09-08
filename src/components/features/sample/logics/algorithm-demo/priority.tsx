function setPriority(taskDatas:taskData[]){
    taskDatas.sort((a,b) => a.deadLine.getTime() - b.deadLine.getTime());
    for (let i = 0; i < taskDatas.length; i++){
        taskDatas[i].priority = i+1;
    }
    return taskDatas;
}
//Taskデータが更新された際に、優先度を設定します。

function changePriority(taskDatas:taskData[]){
    const displayNum : number = 5 
    taskDatas.sort((a,b) => a.priority - b.priority);
    for (let i = 1; i <= displayNum; i++){
        if(i==1){
            taskDatas[0].priority = displayNum;
        }
        else{
            taskDatas[i-1].priority -= 1;
        }
    }
    return taskDatas;
}
//Taskの並び替えが手動で行われた際に、優先度を変更します。