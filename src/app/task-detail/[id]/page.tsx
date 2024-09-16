'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import DescriptionIcon from '@mui/icons-material/Description';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { useParams } from 'next/navigation';
import { set } from 'date-fns';

// 型定義
type TimeUnit = '10分' | '30分' | '1時間';
type IconType =
	| 'DescriptionIcon'
	| 'WorkIcon'
	| 'SchoolIcon'
	| 'FitnessCenterIcon';

type Task = {
	id: number;
	name: string;
	icon: IconType;
	color: string;
	progress: number;
	timestamp: number; // APIで返ってくるtimestamp
	totalMinutes: number;
};

// timestampを日付と時間に分ける関数
const convertTimestampToDateAndTime = (dateStr: string) => {
	const date = new Date(dateStr); // 秒単位のtimestampをミリ秒に変換
	//UTC時間と判定されて9時間戻されてしまうため　　9時間の部分消しました。以下のコード
	date.setHours(date.getHours());
	const dueDate = date.toISOString().split('T')[0]; // YYYY-MM-DD形式の文字列を抽出
	const dueTime = date.toTimeString().split(':').slice(0, 2).join(':'); // HH:MM形式の時間を抽出
	return { dueDate, dueTime };
};

const convertDateAndTimeToTimestamp = (
	dueDate: string,
	dueTime: string
): string => {
	// 日付と時間を組み合わせてISO 8601形式の文字列を作成
	const combinedDateTime = `${dueDate}T${dueTime}:00`; // "YYYY-MM-DDTHH:MM:00"

	// Dateオブジェクトを日本時間として解釈
	const jstDate = new Date(combinedDateTime);

	// JSTをUTCに変換するために9時間進める
	jstDate.setHours(jstDate.getHours() + 9);

	// ISO 8601形式の文字列を返す
	return jstDate.toISOString();
};

const TaskDetail = () => {
	//パスパラメータに含まれるidを取得する
	const { id } = useParams();
	const task_id = id as string;
	const router = useRouter();

	const [taskName, setTaskName] = useState('');
	const [totalMinutes, setTotalMinutes] = useState(0);
	const [selectedIcon, setSelectedIcon] = useState<IconType>('DescriptionIcon');
	const [selectedColor, setSelectedColor] = useState('bg-green-300');
	const [progress, setProgress] = useState(50);
	const [dueDate, setDueDate] = useState('');
	const [dueTime, setDueTime] = useState('');
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const [user_id, setUserId] = useState('');
	const [limit_time, setLimitTime] = useState('');
	const [parent_id, setParentId] = useState('');
	const [available_break, setAvailableBreak] = useState(true);
	const [duration, setDuration] = useState(0);
	const [priority, setPriority] = useState('Medium');
	const [skip_count, setSkipCount] = useState(1);

	// APIからデータを取得する関数
	const getTaskData = async (id: string) => {
		try {
			const response = await fetch(`/api/task/detail/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch task data');
			}

			const data = await response.json();
			return data.task;
		} catch (error) {
			return null;
		}
	};

	const handleSave = async () => {
		const updateData = {
			id: task_id,
			user_id: user_id,
			title: taskName,
			limit_time: convertDateAndTimeToTimestamp(dueDate, dueTime),
			parent_id: parent_id,
			available_break: available_break,
			duration: duration,
			expectation: Math.floor(totalMinutes * 60000),
			progress: progress,
			priority: priority,
			skip_count: skip_count,
		};

		try {
			const response = await fetch('/api/task', {
				// APIエンドポイントに合わせてパスを変更
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateData),
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				console.error('Error:', errorResponse.message);
				return;
			}
			alert('保存完了！');
		} catch (error) {
			console.error('Fetch Error:', error);
		}

		try {
			const response = await fetch(`/api/task/${user_id}/setpriority`, {
				// APIエンドポイントのパスを指定
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				console.error('Error:', errorResponse.message);
				return;
			}

			const data = await response.json();
			console.log('Success:', data.message);
		} catch (error) {
			console.error('Fetch Error:', error);
		}

		try {
			const response = await fetch(`/api/task/${user_id}/culcUrgency`, {
				// APIエンドポイントのパスを指定
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const errorResponse = await response.json();
				console.error('Error:', errorResponse.message);
				return;
			}

			const data = await response.json();
			console.log('Success:', data.result);
		} catch (error) {
			console.error('Fetch Error:', error);
		}
	};

	useEffect(() => {
		// 初回ロード時にAPIからデータを取得してstateに設定
		const loadTaskData = async () => {
			const taskData = await getTaskData(task_id); // IDは任意で変更可能
			if (taskData) {
				setTaskName(taskData.title || '');
				if (taskData.expectation) {
					const min = convertToMin(taskData.expectation);
					setTotalMinutes(min);
				} else {
					setTotalMinutes(0);
				}
				setSelectedIcon(taskData.icon || 'DescriptionIcon');
				setSelectedColor(taskData.color || 'bg-green-300');
				setProgress(taskData.progress);
				setUserId(taskData.user_id);
				setLimitTime(taskData.limit_time);
				setParentId(taskData.parent_id);
				setAvailableBreak(taskData.available_break);
				setDuration(taskData.duration);
				setPriority(taskData.priority);
				setSkipCount(taskData.skip_count);

				// タイムスタンプから日付と時間を分割
				const { dueDate, dueTime } = convertTimestampToDateAndTime(
					taskData.limit_time
				);
				setDueDate(dueDate);
				setDueTime(dueTime);
			} else {
				alert('タスク取得中にエラーが発生しました。前のページに戻ります。');
				router.push('/task-list');
			}
		};

		loadTaskData();
	}, []);

	//ミリ秒で与えられた時間を、分単位にして返す関数
	const convertToMin = (ms: number) => {
		const minutes = Math.round(ms / 60000);
		return minutes;
	};

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
		setTotalMinutes(prev => prev + minutesToAdd);
	};

	// 時間をリセットする関数
	const handleCancel = () => {
		router.push('/task-list');
	};

	// アイコンをレンダリングする関数
	const renderIcon = () => {
		switch (selectedIcon) {
			case 'WorkIcon':
				return <WorkIcon className="mr-2" />;
			case 'SchoolIcon':
				return <SchoolIcon className="mr-2" />;
			case 'FitnessCenterIcon':
				return <FitnessCenterIcon className="mr-2" />;
			default:
				return <DescriptionIcon className="mr-2" />;
		}
	};

	return (
		<div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
			{/* タスク名入力 */}
			<div className="mb-4">
				<input
					type="text"
					value={taskName}
					placeholder="タスク名を追加"
					className="w-full p-2 border border-gray-300 rounded outline-none text-lg"
					onChange={e => setTaskName(e.target.value)}
				/>
			</div>

			{/* アイコン選択 */}
			<div className="flex items-center py-4">
				{renderIcon()}
				<button
					onClick={() => setIsIconPickerOpen(prev => !prev)}
					className="flex items-center px-2 py-1 bg-green-200 text-green-600 rounded"
				>
					アイコンを変更
				</button>
			</div>

			{/* アイコン選択のドロップダウン */}
			{isIconPickerOpen && (
				<div className="flex gap-2 mb-4">
					<button
						onClick={() => setSelectedIcon('DescriptionIcon')}
						className="p-2"
					>
						<DescriptionIcon />
					</button>
					<button onClick={() => setSelectedIcon('WorkIcon')} className="p-2">
						<WorkIcon />
					</button>
					<button onClick={() => setSelectedIcon('SchoolIcon')} className="p-2">
						<SchoolIcon />
					</button>
					<button
						onClick={() => setSelectedIcon('FitnessCenterIcon')}
						className="p-2"
					>
						<FitnessCenterIcon />
					</button>
				</div>
			)}

			{/* 色選択 */}
			<div className="flex justify-around py-4">
				<div
					onClick={() => setSelectedColor('bg-green-300')}
					className={`w-8 h-8 ${selectedColor === 'bg-green-300' ? 'ring-2 ring-black' : ''} bg-green-300 rounded-full cursor-pointer`}
				></div>
				<div
					onClick={() => setSelectedColor('bg-blue-300')}
					className={`w-8 h-8 ${selectedColor === 'bg-blue-300' ? 'ring-2 ring-black' : ''} bg-blue-300 rounded-full cursor-pointer`}
				></div>
				<div
					onClick={() => setSelectedColor('bg-purple-300')}
					className={`w-8 h-8 ${selectedColor === 'bg-purple-300' ? 'ring-2 ring-black' : ''} bg-purple-300 rounded-full cursor-pointer`}
				></div>
				<div
					onClick={() => setSelectedColor('bg-red-300')}
					className={`w-8 h-8 ${selectedColor === 'bg-red-300' ? 'ring-2 ring-black' : ''} bg-red-300 rounded-full cursor-pointer`}
				></div>
				<div
					onClick={() => setSelectedColor('bg-yellow-300')}
					className={`w-8 h-8 ${selectedColor === 'bg-yellow-300' ? 'ring-2 ring-black' : ''} bg-yellow-300 rounded-full cursor-pointer`}
				></div>
			</div>

			{/* 納期 */}
			<div className="flex items-center py-4">
				<EventAvailableIcon className="mr-2" />
				<span className="text-lg">納期</span>
			</div>
			<div className="flex gap-2 mb-4">
				<input
					type="date"
					className="border border-gray-300 rounded p-2"
					value={dueDate}
					onChange={e => setDueDate(e.target.value)}
				/>
				<input
					type="time"
					className="border border-gray-300 rounded p-2"
					value={dueTime}
					onChange={e => setDueTime(e.target.value)}
				/>
			</div>

			{/* 所要時間 */}
			<div className="flex items-center mb-4">
				<AccessTimeIcon className="w-6 h-6 mr-2" />
				<h3 className="text-gray-700 font-medium">所要時間</h3>
				<span className="text-green-600 ml-auto">
					{Math.floor(totalMinutes / 60)}時間 {totalMinutes % 60}分
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
			</div>

			{/* 進捗 */}
			<div className="flex items-center mb-4">
				<CheckCircleOutlineIcon className="w-6 h-6 mr-2" />
				<span className="text-lg">進捗</span>
				<input
					type="range"
					min="0"
					max="100"
					value={progress}
					onChange={e => setProgress(Number(e.target.value))}
					className="ml-auto"
				/>
				<span className="ml-2">{progress}%</span>
			</div>

			{/* キャンセルボタン */}
			<div className="flex gap-4">
				<button
					onClick={handleCancel}
					className="px-4 py-2 bg-red-200 text-red-600 rounded-full"
				>
					キャンセル
				</button>
				<button
					onClick={() => handleSave()}
					className="px-4 py-2 bg-blue-200 text-blue-600 rounded-full"
				>
					保存
				</button>
			</div>
		</div>
	);
};

export default TaskDetail;

// import React from 'react';

// const TaskDetail = () => {
// 	return <div>TaskDetail</div>;
// };

// export default TaskDetail;
