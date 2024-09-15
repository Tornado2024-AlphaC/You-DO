'use client';

import Footer from '@/components/features/footer/Footer';
import { SideSwipe } from '@/components/ui/sideSwipe';
import { TopTask } from '@/constants/routing';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { InTimer } from './components/timer/Timer';
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
};

const TaskList = () => {
	const router = useRouter();

	const { getUserData } = useUserData();
	const user_id = getUserData().user_id;

	const [taskList, setTaskList] = React.useState<Task[]>([]);
	const [formListLen, setFormListLen] = React.useState<number>(0);

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
				setFormListLen(taskList.length);
			} catch (error) {
				alert('タスク一覧取得中にエラーが発生しました。');
				return;
			}
		};

		call_get_task_list();
	}, []);

	const handlers = useSwipeable({
		onSwipedRight: () => router.push(TopTask),
		preventScrollOnSwipe: true,
		trackMouse: true,
	});
	return (
		<SideSwipe>
			<main {...handlers}>
				<TaskField taskTotal={7} />
				{/* InTimer：空き時間中、NextTimer：空き時間外 */}
				{/* <NextTimer /> */}
				<InTimer />
				<Footer />
			</main>
		</SideSwipe>
	);
};

export default TaskList;
