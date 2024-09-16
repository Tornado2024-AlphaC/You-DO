'use client';
import React, { useEffect, useState } from 'react';
import { CalendarToday } from '@mui/icons-material';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import TaskCard from '../../components/features/task-card/task-card';

import { useUserData } from '@/components/features/use-cookies/useUserData';
import { get } from 'http';

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
};

// Tailwind CSS for styling
const LimitTaskList: React.FC = () => {
	const { getUserData } = useUserData();
	const user_id = getUserData().user_id;

	const router = useRouter();
	const [selectedDate, setSelectedDate] = useState(
		format(new Date(), 'yyyy-MM-dd')
	); // 今日の日付を初期値に設定

	const [taskList, setTaskList] = React.useState<Task[]>([]);

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

	useEffect(() => {
		const call_get_task_list = async () => {
			try {
				const taskList = await get_task_list(user_id);
				if (taskList.length === 0) {
					alert('タスクがありません。');
				}
				setTaskList(taskList);
			} catch (error) {
				alert('タスク一覧取得中にエラーが発生しました。');
				return;
			}
		};
		call_get_task_list();
	}, []);

	const handleViewSchedule = () => {
		router.push('/daily-schedule');
	};
	// 日付選択ハンドラー
	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedDate(event.target.value);
	};

	//timestampから、時間のみを取得する関数
	const getTime = (timestamp: string) => {
		const date = new Date(timestamp);
		return format(date, 'HH:mm');
	};

	//timestampから、日付のみを取得する関数
	const getDate = (timestamp: string) => {
		const date = new Date(timestamp);
		return format(date, 'yyyy-MM-dd');
	};

	//タスクの日付が、選択された日付と一致するかどうかを判定する関数
	const isSameDate = (taskDate: string) => {
		const date = getDate(taskDate);
		return date === selectedDate;
	};

	const isSameBeforeLimitTime = (task_idx: number) => {
		const taskTime = getTime(taskList[task_idx].limit_time);
		const beforeTaskTime = getTime(taskList[task_idx - 1].limit_time);
		return taskTime === beforeTaskTime;
	};

	//本日までのタスクの個数を取得する関数
	const getTodayTaskCount = () => {
		let count = 0;
		for (let i = 0; i < taskList.length; i++) {
			if (isSameDate(taskList[i].limit_time)) {
				count++;
			}
		}
		return count;
	};

	return (
		<div className="min-h-screen flex flex-col justify-between items-center bg-white p-4">
			{/* Header with Date */}
			<div className="flex justify-between items-center w-full max-w-md mb-4">
				<div className="flex items-center">
					<input
						type="date"
						value={selectedDate}
						onChange={handleDateChange}
						className="bg-green-200 text-green-800 py-2 px-4 rounded-lg shadow-md"
					/>
				</div>
			</div>
			{/* Message */}
			<div className="flex-grow flex justify-center items-center">
				{/* ここをタスクがあるときない時に切り替える */}
				{/*<p className="text-green-600 text-lg">本日納期のタスクはありません</p>*/}
				<div className="flex flex-col gap-3  overflow-scroll">
					{getTodayTaskCount() === 0 ? (
						<p className="text-green-600 text-lg">
							本日納期のタスクはありません
						</p>
					) : (
						taskList.map((task, index) => {
							if (isSameDate(task.limit_time)) {
								return (
									<>
										<TaskCard
											key={index}
											id={task.id}
											taskName={task.title}
											progress={task.progress}
											limit_time={getTime(task.limit_time)}
										/>
									</>
								);
							}
						})
					)}
				</div>
			</div>

			{/* Footer Button */}
			<div className="w-full flex justify-center">
				<button
					className="flex items-center bg-green-400 text-white py-2 px-4 rounded-lg shadow-md"
					onClick={handleViewSchedule}
				>
					<span className="mr-2">← 1日の予定を見る</span>
				</button>
			</div>
		</div>
	);
};

export default LimitTaskList;

// import { Profile, TopTask } from '@/constants/routing';
// import Link from 'next/link';
// import React from 'react';

// const TaskList = () => {
// 	return (
// 		<main>
// 			<h1>TaskList</h1>
// 			<Link href={Profile} className="text-blue-500">
// 				プロフィール画面へ
// 			</Link>
// 			<Link href={TopTask} className="text-blue-500">
// 				今やるタスク画面へ
// 			</Link>
// 		</main>
// 	);
// };

// export default TaskList;
