function culcExpectation(taskData: taskData, userData: userData) {
    if(taskData.progress !== 0 && taskData.duration !== 0){
        taskData.cuExpecTime =(((taskData.duration / taskData.progress)*taskData.progress+
        taskData.firstExpecTime*(1-taskData.progress)) * userData.params1)/userData.params2;
    }
    else{
        taskData.cuExpecTime = taskData.firstExpecTime*userData.params1/userData.params2;
    }
    return taskData;
}
// UserおよびTaskが更新された際に、予想所用時間を計算します。