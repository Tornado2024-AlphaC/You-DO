'use client';
import { useState } from 'react';

import DescriptionIcon from '@mui/icons-material/Description';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import Image from 'next/image';
import youDoAddTask from '../../../../public/add-task/Frame 100.svg';

import { useUserData } from '../use-cookies/useUserData';

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

// 型定義
type TimeUnit = '10分' | '30分' | '1時間';

interface AddTaskModalProps {
	closeModal: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ closeModal }) => {
	const { getUserData } = useUserData();
	const user_id = Number(getUserData().user_id);

	//フォームの入力内容
	const [task_name, set_task_name] = useState('');
	const [total_minutes, set_total_minutes] = useState(0);
	const [selected_date, set_selected_date] = useState('');
	const [selected_time, set_selected_time] = useState('');

	// 時間を分単位に変換して加算する関数
	const addTime = (timeUnit: TimeUnit) => {
		let minutesToAdd = 0;
		switch (timeUnit) {
			case '10分':
				minutesToAdd = 10;
				break;
			case '30分':
				minutesToAdd = 30;
				break;
			case '1時間':
				minutesToAdd = 60;
				break;
			default:
				break;
		}
		set_total_minutes(prev => prev + minutesToAdd);
	};

	// 所要時間の分を時間と分の形式に変換する関数
	const formatTime = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours > 0 ? `${hours}時間` : ''}${mins}分`;
	};

	// 取消ボタンで時間をリセットする
	const handleCancel = () => {
		set_total_minutes(0); // 初期値にリセット
	};

	const resetForm = () => {
		set_task_name('');
		set_total_minutes(0);
		set_selected_date('');
		set_selected_time('');
	};

	const save_new_task = async (
		user_id: number,
		title: string,
		limit_time: string,
		expectation: number
	): Promise<Task> => {
		return new Promise((resolve, reject) => {
			const url = 'api/task';
			const obj = {
				user_id,
				title,
				limit_time,
				parent_id: 0,
				available_break: true,
				expectation,
			};

			try {
				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(obj),
				}).then(async res => {
					if (!res.ok) {
						const statusCode = res.status;
						switch (statusCode) {
							case 400:
								throw new Error('Bad Request');
							case 500:
								throw new Error('Internal Server Error');
							default:
								throw new Error('Unknown Error');
						}
					}
					const data = await res.json(); //okだった時の処理
					resolve(data.task);
				});
			} catch (error) {
				alert('apiで登録中にエラーが発生しました。');
				reject(null);
			}
		});
	};

	const save_task = () => {
		if (
			task_name === '' ||
			total_minutes === 0 ||
			selected_date === '' ||
			selected_time === ''
		) {
			alert('すべての項目を入力してから、「追加」ボタンを教えてください。');
			return;
		}

		const title = task_name;
		const selected_date_time = selected_date + 'T' + selected_time + ':00.000';
		const total_expectation = total_minutes * 60 * 1000;

		try {
			const taskData = save_new_task(
				user_id,
				title,
				selected_date_time,
				total_expectation
			);
			if (!taskData) {
				alert('タスクが登録できませんでした。');
				return;
			}
			alert('タスクが登録されました。');
			resetForm();
		} catch (error) {
			alert('タスクが登録できませんでした。');
		}
	};

	return (
		<div className="bg-white">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">タスクの追加</h2>
				{/* モーダルを閉じるボタン */}
				<button onClick={closeModal} className="text-red-500">
					閉じる
				</button>
			</div>
			<div className="flex flex-col gap-2">
				<div>
					<input
						type="text"
						id="taskName"
						value={task_name}
						placeholder="タスク名を追加"
						className="outline-none text-lg w-full border-b border-gray-300 pb-2"
						onChange={e => set_task_name(e.target.value)}
					/>
				</div>
				<hr />
				<div className="flex flex-row gap-3">
					<p className="text-lg">
						<DescriptionIcon />
					</p>
					<p className="text-lg">アイコンを変更</p>
				</div>
				<hr />
				<div className="flex flex-row gap-3">
					<p className="text-lg">
						<ColorLensIcon />
					</p>
					<p className="text-lg">アイコン色を変更</p>
				</div>
				<hr />
				<div className="flex flex-row gap-3">
					<p className="text-lg">
						<EventAvailableIcon />
					</p>
					<p className="text-lg">納期を設定</p>
				</div>
				<div className="flex flex-row gap-3">
					<input
						type="date"
						value={selected_date}
						onChange={e => set_selected_date(e.target.value)}
					/>
					<input
						type="time"
						value={selected_time}
						onChange={e => set_selected_time(e.target.value)}
					/>
				</div>
				<hr />
			</div>

			<div className="p-4">
				<div className="flex items-center mb-4">
					<Image
						src={youDoAddTask}
						alt="時計アイコン"
						className="w-8 h-8 mr-2"
					/>
					<h3 className="text-gray-700 font-medium">所要時間</h3>
					<span className="text-green-600 ml-auto">
						{formatTime(total_minutes)}
					</span>
				</div>

				<div className="flex gap-2 mb-6">
					<button
						onClick={() => addTime('10分')}
						className="px-4 py-2 bg-green-200 text-green-600 rounded-full"
					>
						10分
					</button>
					<button
						onClick={() => addTime('30分')}
						className="px-4 py-2 bg-green-200 text-green-600 rounded-full"
					>
						30分
					</button>
					<button
						onClick={() => addTime('1時間')}
						className="px-4 py-2 bg-green-200 text-green-600 rounded-full"
					>
						1時間
					</button>
					<button
						onClick={handleCancel}
						className="px-4 py-2 bg-red-400 text-white rounded-full"
					>
						取消
					</button>
				</div>

				<div className="flex justify-between">
					<button
						onClick={closeModal}
						className="flex items-center justify-center px-6 py-2 bg-gray-400 text-white rounded-lg"
					>
						← 戻る
					</button>
					<button
						className="flex items-center justify-center px-6 py-2 bg-green-400 text-white rounded-lg"
						onClick={save_task}
					>
						＋ タスク追加
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;

// 'use client';
// import { useState } from 'react';

// import DescriptionIcon from '@mui/icons-material/Description';
// import ColorLensIcon from '@mui/icons-material/ColorLens';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// import Image from 'next/image';
// import youDoAddTask from '../../../../public/add-task/Frame 100.svg';

// // 型定義
// type TimeUnit = '10分' | '30分' | '1時間';

// const AddTaskModal = () => {
// 	const [taskName, setTaskName] = useState('');
// 	const [totalMinutes, setTotalMinutes] = useState(0);

// 	// 時間を分単位に変換して加算する関数
// 	const addTime = (timeUnit: TimeUnit) => {
// 		let minutesToAdd = 0;
// 		switch (timeUnit) {
// 		  case '10分':
// 			minutesToAdd = 10;
// 			break;
// 		  case '30分':
// 			minutesToAdd = 30;
// 			break;
// 		  case '1時間':
// 			minutesToAdd = 60;
// 			break;
// 		  default:
// 			break;
// 		}
// 		setTotalMinutes(prev => prev + minutesToAdd);
// 	  };

// 	  // 所要時間の分を時間と分の形式に変換する関数
// 	  const formatTime = (minutes: number): string => {
// 		const hours = Math.floor(minutes / 60);
// 		const mins = minutes % 60;
// 		return `${hours > 0 ? `${hours}時間` : ''}${mins}分`;
// 	  };

// 	  // 取消ボタンで時間をリセットする
// 	  const handleCancel = () => {
// 		setTotalMinutes(0); // または初期値にリセット
// 	  };

// 	return (
// 		<div>
// 			<div className="flex flex-col gap-2">
// 				<div>
// 					<input
// 						type="text"
// 						id="taskName"
// 						value={taskName}
// 						placeholder="タスク名を追加"
// 						className="outline-none text-lg"
// 						onChange={e => setTaskName(e.target.value)}
// 					/>
// 				</div>
// 				<hr />
// 				<div className="flex flex-row gap-3">
// 					<p className="text-lg">
// 						<DescriptionIcon />
// 					</p>
// 					<p className="text-lg">アイコンを変更</p>
// 				</div>
// 				<hr />
// 				<div className="flex flex-row gap-3">
// 					<p className="text-lg">
// 						<ColorLensIcon />
// 					</p>
// 					<p className="text-lg">アイコン色を変更</p>
// 				</div>
// 				<hr />
// 				<div className="flex flex-row gap-3">
// 					<p className="text-lg">
// 						<EventAvailableIcon />
// 					</p>
// 					<p className="text-lg">納期を設定</p>
// 				</div>
// 				<div className="flex flex-row gap-3">
// 					<input type="date" />
// 					<input type="time" />
// 				</div>
// 				<hr />

// 			</div>
// 			<div className="p-4">
// 				<div className="flex items-center mb-4">
// 					<Image
// 						src={youDoAddTask}
// 						alt="時計アイコン"
// 						className="w-8 h-8 mr-2"
// 					/>
// 					<h3 className="text-gray-700 font-medium">所要時間</h3>
// 					<span className="text-green-600 ml-auto">{formatTime(totalMinutes)}</span>
// 				</div>

// 				<div className="flex gap-2 mb-6">
// 					<button
// 					onClick={() => addTime('10分')}
// 					className="px-4 py-2 bg-green-200 text-green-600 rounded-full"
// 					>
// 					10分
// 					</button>
// 					<button
// 					onClick={() => addTime('30分')}
// 					className="px-4 py-2 bg-green-200 text-green-600 rounded-full"
// 					>
// 					30分
// 					</button>
// 					<button
// 					onClick={() => addTime('1時間')}
// 					className="px-4 py-2 bg-green-200 text-green-600 rounded-full"
// 					>
// 					1時間
// 					</button>
// 					<button
// 					onClick={handleCancel}
// 					className="px-4 py-2 bg-red-400 text-white rounded-full"
// 					>
// 					取消
// 					</button>
// 				</div>

// 				<div className="flex justify-between">
// 					<button className="flex items-center justify-center px-6 py-2 bg-green-400 text-white rounded-lg">
// 					← 戻る
// 					</button>
// 					<button className="flex items-center justify-center px-6 py-2 bg-green-400 text-white rounded-lg">
// 					＋ タスク追加
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default AddTaskModal;
