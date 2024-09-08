//必要な要素だけ載せてます。要素名も仮です。

//scheduleに相当
type timeData = {start : Date, end :Date, duration : number};//durationは経過時間（ミリ秒）

//taskに相当
type taskData = {taskId : number,deadLine:Date,cuExpecTime :number,priority: number,urgency:number,
    duration:number,firstExpecTime:number,progress:number};
//firstExpecTimeは初期に申告する予想時間、cuExpextimeは残りの予想時間、progressは進捗率（0~1）

//userDataに相当
type userData = {params1 : number ,params2 : number}
//params1は予想時間と実際の所要時間の誤差補正、params2は空き時間とコミット時間の誤差補正