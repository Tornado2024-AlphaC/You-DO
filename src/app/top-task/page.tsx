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

const TopTask = () => {
	const router = useRouter();

	const { getUserData } = useUserData();
	const user_id = getUserData().user_id;

	const [taskList, setTaskList] = React.useState<Task[]>([]);
	const [topTask, setTopTask] = React.useState<Task | null>(null);
	const [currentTaskNo, setCurrentTaskNo] = React.useState<number>(0);

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

	useEffect(() => {
		const call_get_next_task_list = async () => {
			try {
				const taskList = await get_next_task_list(user_id);
				if (!taskList) {
					throw new Error('TaskList is empty');
				}
				if (taskList.length === 0) {
					alert('タスクがありません。');
					setCurrentTaskNo(-1);
				}
				setTaskList(taskList);
				setCurrentTaskNo(0);
			} catch (error) {
				alert('B: タスク一覧取得中にエラーが発生しました。');
				return;
			}
		};

		call_get_next_task_list();
	}, []);
	return (
		<SideSwipe>
			<main {...handlers}>
				<div className="absolute top-0 my-14 space-y-4">
					<NextTimer />
					<ResetBtnDisabled />
				</div>

				{currentTaskNo >= 0 && (
					<TaskCard
						task_id={taskList[currentTaskNo].id}
						task_title={taskList[currentTaskNo].title}
						task_progress={taskList[currentTaskNo].progress}
						limit_time_org={taskList[currentTaskNo].limit_time}
					/>
				)}

				{currentTaskNo < 0 && (
					<p className="text-lg text-red-600">タスクがありません。</p>
				)}

				<Footer />
			</main>
		</SideSwipe>
	);
};

export default TopTask;
