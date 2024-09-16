'use client';

import Footer from '@/components/features/footer/Footer';
import React, { useEffect } from 'react';
import TaskCard from './components/taskCard/TaskCard';
import { ResetBtn, ResetBtnDisabled } from './components/timer/ResetBtn';
import { InTimer, NextTimer } from './components/timer/Timer';
import { DailySchedule, TaskList } from '@/constants/routing';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { SideSwipe } from '@/components/ui/sideSwipe';

import { useUserData } from '@/components/features/use-cookies/useUserData';
import NoWorkResult from 'postcss/lib/no-work-result';
import AddTaskModal from '@/components/features/add-task-modal/addTaskModal';

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

type Schedule = {
	id: number;
	user_id: number;
	type: string;
	start_time: string;
	end_time: string;
	duration: number;
	updated_at: string;
	created_at: string;
};

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

const TopTask = () => {
	const router = useRouter();

	const { getUserData } = useUserData();
	const user_id = getUserData().user_id;

	const [taskList, setTaskList] = React.useState<Task[]>([]);
	const [topTask, setTopTask] = React.useState<Task | null>(null);
	const [nextSchedule, setNextSchedule] = React.useState<Schedule | null>(null);
	const [timeDifference, setTimeDifference] = React.useState<number>(0);
	const [scheduleInProgress, setScheduleInProgress] =
		React.useState<boolean>(false);

	const handlers = useSwipeable({
		onSwipedLeft: () => router.push(TaskList),
		onSwipedRight: () => router.push(DailySchedule),
		preventScrollOnSwipe: true,
		trackMouse: true,
	});

	//API: 今やるべきタスクの一覧を取得する
	const get_next_task_list = async (user_id: string): Promise<Task[]> => {
		return new Promise((resolve, reject) => {
			const url = `api/task/${user_id}/next`;
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
							default:
								throw new Error('Unknown Error');
						}
					}
					const data = await res.json();
					resolve(data.nextTask);
				});
			} catch (error) {
				alert('A:タスク一覧取得中にエラーが発生しました。');
				reject(error);
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
		const call_get_next_task_list = async () => {
			try {
				const taskList = await get_next_task_list(user_id);
				if (!taskList) {
					throw new Error('TaskList is empty');
				}
				if (taskList.length === 0) {
					alert('タスクがありません。');
				}
				setTaskList(taskList);
				setTopTask(taskList[0]);
			} catch (error) {
				alert('B: タスク一覧取得中にエラーが発生しました。');
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
				if (
					convertTimestampToMilliseconds(scheduleList[0].start_time) <
					now.getTime()
				) {
					setScheduleInProgress(true);
				}
			} catch (error) {
				alert('B: スケジュール一覧取得中にエラーが発生しました。');
				return;
			}
		};

		call_get_next_task_list();
		call_get_next_schedule();
	}, []);

	useEffect(() => {
		// 残り時間を計算する関数
		if (!scheduleInProgress) {
			const calculateTimeDifference = () => {
				const now = new Date();
				let difference: number = 0;
				if (nextSchedule) {
					difference = Math.max(
						0,
						Math.floor(
							(convertTimestampToMilliseconds(nextSchedule.start_time) -
								now.getTime()) /
								1000
						)
					); // 秒単位の差を計算
					if (
						convertTimestampToMilliseconds(nextSchedule.start_time) <
						now.getTime()
					) {
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
		} else {
			const calculateTimeDifference = () => {
				const now = new Date();
				let difference: number = 0;
				if (nextSchedule) {
					difference = Math.max(
						0,
						Math.floor(
							(convertTimestampToMilliseconds(nextSchedule.end_time) -
								now.getTime()) /
								1000
						)
					); // 秒単位の差を計算
					if (
						convertTimestampToMilliseconds(nextSchedule.start_time) >
						now.getTime()
					) {
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
	}, [nextSchedule, scheduleInProgress]);

	return (
		<SideSwipe>
			<main {...handlers}>
				<div className="absolute top-0 my-14 space-y-4">
					{scheduleInProgress ? (
						<>
							<InTimer time={formatTime(timeDifference)} />
							<ResetBtn />
						</>
					) : (
						<>
							<NextTimer time={formatTime(timeDifference)} />
							<ResetBtnDisabled />
						</>
					)}
				</div>

				{topTask && (
					<TaskCard
						task_id={taskList[0].id}
						task_title={taskList[0].title}
						task_progress={taskList[0].progress}
						limit_time_org={taskList[0].limit_time}
					/>
				)}

				{!topTask && (
					<p className="text-lg text-red-600">タスクがありません。</p>
				)}

				<Footer />
			</main>
		</SideSwipe>
	);
};

export default TopTask;
