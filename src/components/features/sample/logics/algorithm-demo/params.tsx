function culcParams1(userData : userData,taskData : taskData) {
    const achievementRate = taskData.duration/ taskData.firstExpecTime;
    const newParams = userData.params1 *0.7 + achievementRate *0.3;
    userData.params1 = newParams;
    return userData;
}
//タスクを完遂した時に更新　

function culcParams2(userData : userData,timeData : timeData) {
    const commitRate = timeData.duration / (timeData.end.getTime() - timeData.start.getTime());
    const newParams = userData.params2 *0.8+ commitRate *0.2;
    userData.params2 = newParams;
}
//空き時間を終了した際に更新