'use client';

import Footer from '@/components/features/footer/Footer';
import { SideSwipe } from '@/components/ui/sideSwipe';
import { TopTask } from '@/constants/routing';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { InTimer,NextTimer } from './components/timer/Timer';
import TaskField from './components/tasks/TaskField';
import { useUserData } from '@/components/features/use-cookies/useUserData';

type Task = {
	id: number;
	user_id: number;
	title: string;
	limit_time: string;
	parent_id: number;
	available_break: boolean;
	duration: number;
	expectation: number;
	urgency: number;
	firstexpect: number;
	progress: number;
	priority: number;
	skip_count: number;
	created_at: string;
	updated_at: string;
	icon : "WorkIcon" | "SchoolIcon" | "FitnessCenterIcon" | "DescriptionIcon";
	color :  'red' | 'orange' | 'yellow' | 'green' | 'sky' | 'blue' | 'purple',
};

type Schedule = {
    id: number;
    user_id: number;
    type: string;
    start_time: string;
    end_time: string;
    duration: number;
    updated_at: string;
    created_at: string;
}


const TaskList = () => {
	const router = useRouter();

	const { getUserData } = useUserData();
	const user_id = getUserData().user_id;

	const [taskList, setTaskList] = React.useState<Task[]>([]);
	const [formListLen, setFormListLen] = React.useState<number>(0);
	const [nextSchedule, setNextSchedule] = React.useState<Schedule | null>(null);
	const [timeDifference, setTimeDifference] = React.useState<number>(0);
	const [scheduleInProgress,setScheduleInProgress] = React.useState<boolean>(false);

	
	function convertTimestampToMilliseconds(timestamp: string): number {
    	// 受け取ったタイムスタンプ文字列をDateオブジェクトに変換
    	const date = new Date(timestamp);
    
    	// Dateオブジェクトをミリ秒に変換
    	return date.getTime();
  	}

	const formatTime = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
  
		// 2桁のゼロ埋めを行う
		const pad = (num: number) => String(num).padStart(2, '0');
  
		return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  	};

	//タスクリストを取得する関数
	const get_task_list = async (user_id: string): Promise<Task[]> => {
		return new Promise((resolve, reject) => {
			const url = `api/task/${user_id}/list`;
			try {
				fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}).then(async res => {
					const contentType = res.headers.get('content-type');
					if (!res.ok) {
						const statusCode = res.status;
						if (!contentType || !contentType.includes('application/json')) {
							throw new Error("Oops, we haven't got JSON!");
						}
						switch (statusCode) {
							case 400:
								throw new Error('Bad Request');
							case 401:
								throw new Error('Unauthorized');
							case 500:
								throw new Error('Internal Server Error');
							default:
								throw new Error('Unknown Error');
						}
					}
					const data = await res.json();
					resolve(data.taskList);
				});
			} catch (error) {
				alert('タスク一覧取得中にエラーが発生しました。');
				reject(null);
			}
		});
	};

	const get_next_schedule = async (user_id: string): Promise<Schedule[]> => {
		return new Promise((resolve, reject) => {
			const url = `api/schedule/${user_id}/next-empty`;
			try {
				fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}).then(async res => {
					const contentType = res.headers.get('content-type');
					if (!res.ok) {
						const statusCode = res.status;
						if (!contentType || !contentType.includes('application/json')) {
							throw new Error("Oops, we haven't got JSON!");
						}
						switch (statusCode) {
							case 400:
								throw new Error('Bad Request');
							case 500:
								throw new Error('Internal Server Error');
							case 404:
								throw new Error('Data not found');
							default:
								throw new Error('Unknown Error');
						}
					}
					const data = await res.json();
					resolve(data.scheduleList);
				});
			} catch (error) {
				alert('A:スケジュール取得中にエラーが発生しました。');
				reject(error);
			}
		});
	};

	useEffect(() => {
		const call_get_task_list = async () => {
			try {
				const taskList = await get_task_list(user_id);
				if (taskList.length === 0) {
					alert('タスクがありません。');
				}
				setTaskList(taskList);
				setFormListLen(taskList.length);
			} catch (error) {
				alert('タスク一覧取得中にエラーが発生しました。');
				return;
			}
		};

		const call_get_next_schedule = async () => {
			try {
				const scheduleList = await get_next_schedule(user_id);
				if (!scheduleList) {
					throw new Error('ScheduleList is empty');
				}
				if (scheduleList.length === 0) {
					alert('スケジュールがありません。');
				}
				setNextSchedule(scheduleList[0]);
				const now = new Date();
				if(convertTimestampToMilliseconds(scheduleList[0].start_time)<now.getTime()){
					setScheduleInProgress(true);
				}
			} catch (error) {
				alert('B: スケジュール一覧取得中にエラーが発生しました。');
				return;
			}
		};

		call_get_task_list();
		call_get_next_schedule();
	}, []);

	useEffect(() => {
		// 残り時間を計算する関数
		if(!scheduleInProgress){
			const calculateTimeDifference = () => {
		    const now = new Date();
		  	let difference:number = 0
		  	if(nextSchedule){
		  		difference = Math.max(0, Math.floor((convertTimestampToMilliseconds(nextSchedule.start_time)- now.getTime()) / 1000)); // 秒単位の差を計算
			  	if(convertTimestampToMilliseconds(nextSchedule.start_time)<now.getTime()){
					setScheduleInProgress(true);
				}
		  	}
		  	setTimeDifference(difference);
			};

		// 初回計算
			calculateTimeDifference();
	
		// 1秒ごとに残り時間を更新
			const timerId = setInterval(calculateTimeDifference, 1000);
	
		// クリーンアップ関数でsetIntervalをクリア
			return () => clearInterval(timerId);
		}
		else{
			const calculateTimeDifference = () => {
				const now = new Date();
				  let difference:number = 0
				  if(nextSchedule){
					  difference = Math.max(0, Math.floor((convertTimestampToMilliseconds(nextSchedule.end_time)- now.getTime()) / 1000)); // 秒単位の差を計算
					  if(convertTimestampToMilliseconds(nextSchedule.start_time)>now.getTime()){
						setScheduleInProgress(false);
					}
				  }
				  setTimeDifference(difference);
				};
	
			// 初回計算
				calculateTimeDifference();
		
			// 1秒ごとに残り時間を更新
				const timerId = setInterval(calculateTimeDifference, 1000);
		
			// クリーンアップ関数でsetIntervalをクリア
				return () => clearInterval(timerId);
			
		}
	  }, [nextSchedule,scheduleInProgress]);

	const handlers = useSwipeable({
		onSwipedRight: () => router.push(TopTask),
		preventScrollOnSwipe: true,
		trackMouse: true,
	});
	return (
		<SideSwipe>
			<main {...handlers}>
				<TaskField taskBubbleData={taskList} />
				{/* InTimer：空き時間中、NextTimer：空き時間外 */}
				{/* <NextTimer /> */}
				{scheduleInProgress ? <InTimer time={formatTime(timeDifference)} /> : <NextTimer time={formatTime(timeDifference)} />}	
      			
				<Footer />
			</main>
		</SideSwipe>
	);
};

export default TaskList;
