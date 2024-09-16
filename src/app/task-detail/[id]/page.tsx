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
import ColorPicker from '@/components/features/add-task-modal/ColorPicker';
import Icon from '@/components/ui/Icon';
import {
	AddTimeBtn,
	DeleteTimeBtn,
} from '@/components/features/add-task-modal/AddTimeBtn';
import { Button } from '@/components/ui/button';

// 型定義
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

const COLORS: string[] = [
	'green',
	'sky',
	'blue',
	'purple',
	'red',
	'orange',
	'yellow',
];

// timestampを日付と時間に分ける関数
const convertTimestampToDateAndTime = (dateStr: string) => {
	const date = new Date(dateStr); // 秒単位のtimestampをミリ秒に変換
	//UTC時間と判定されて9時間戻されてしまうため
	date.setHours(date.getHours() - 9);
	const dueDate = date.toISOString().split('T')[0]; // YYYY-MM-DD形式の文字列を抽出
	const dueTime = date.toTimeString().split(':').slice(0, 2).join(':'); // HH:MM形式の時間を抽出
	return { dueDate, dueTime };
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
		const minutes = ms / 60000;
		return minutes;
	};

	// 時間を分単位に変換して加算する関数
	const addTime = (timeUnit: string) => {
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
			case '取消':
				setTotalMinutes(0);
				break;
			default:
				break;
		}
		setTotalMinutes(prev => prev + minutesToAdd);
	};

	// タスクの変更を取り消すときの関数
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
		<div className="w-full max-w-[500px]">
			{/* タスク名入力 */}
			<input
				type="text"
				id="taskName"
				value={taskName}
				placeholder="タスク名を追加"
				className="outline-none text-lg w-full border-b border-white-tertiary p-3 px-5"
				onChange={e => setTaskName(e.target.value)}
			/>
			<hr />

			<span
				onClick={() => setIsIconPickerOpen(prev => !prev)}
				className="cursor-pointer"
			>
				<div className="flex justify-start items-center w-full border-b-2 border-white-tertiary p-3 px-5">
					{renderIcon()}アイコンを変更
				</div>
			</span>

			{/* アイコン選択のドロップダウン */}
			{isIconPickerOpen && (
				<div className="flex items-ceter justify-between p-2 bg-white-tertiary">
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
			{/* タスクカラー選択 */}
			<div className="flex justify-between items-center w-full border-b-2 border-white-tertiary p-3 px-5">
				{COLORS.map(color => (
					<ColorPicker
						key={color}
						color={color}
						selectedColor={selectedColor}
						setSelectedColor={setSelectedColor}
					/>
				))}
			</div>
			{/* 納期設定 */}
			<div className="flex flex-col justify-center items-center p-3 w-full border-b-2 border-white-tertiary px-5">
				<div className="flex items-center justify-start mb-2 w-full">
					<Icon iconRoute="add-task" iconName="deadline" size={24} />
					<h3 className="text-white-secondary font-medium">納期</h3>
				</div>
				<div className="flex flex-row items-center justify-between w-full">
					<input
						type="date"
						value={dueDate}
						onChange={e => setDueDate(e.target.value)}
					/>
					<input
						type="time"
						value={dueTime}
						onChange={e => setDueDate(e.target.value)}
					/>
				</div>
				<hr />
			</div>

			{/* 所要時間 */}
			<div className="flex flex-col justify-center items-center p-3 w-full border-b-2 border-white-tertiary px-5">
				<div className="flex items-center justify-between mb-4 w-full">
					<Icon iconRoute="add-task" iconName="timer" size={24} />
					<h3 className="text-white-secondary font-medium">所要時間</h3>
					<span className="text-green-tertiary ml-auto">
						{Math.floor(totalMinutes / 60)}時間 {totalMinutes % 60}分
					</span>
				</div>

				<div className="flex items-center justify-between w-full">
					<AddTimeBtn addTime={addTime} timeUnit="10分" />
					<AddTimeBtn addTime={addTime} timeUnit="30分" />
					<AddTimeBtn addTime={addTime} timeUnit="1時間" />
					<DeleteTimeBtn addTime={addTime} timeUnit="取消" />
				</div>
			</div>

			{/* 進捗 */}
			<div className="flex flex-col justify-center items-center p-3 w-full border-b-2 border-white-tertiary px-5">
				<div className="flex items-center justify-start mb-4 w-full">
					<Icon iconRoute="add-task" iconName="progress" size={24} />
					<h3 className="text-white-secondary font-medium">進捗</h3>
				</div>
				<div className="flex items-center justify-between w-full">
					<input
						type="range"
						min="0"
						max="100"
						value={progress}
						onChange={e => setProgress(Number(e.target.value))}
						className="w-[300px]"
					/>
					<span className="ml-2 text-green-tertiary text-base">
						{progress}%
					</span>
				</div>
			</div>

			{/* キャンセルボタン */}
			<div className="z-30 absolute flex justify-between items-center bottom-0 w-full max-w-[500px]">
				<Button onClick={handleCancel}>
					<Icon iconRoute="add-task" iconName="back" size={24} />
					戻る
				</Button>
				<Button
					onClick={() => alert('削除')}
					className="bg-red-primary text-red-secondary border-red-secondary"
				>
					<Icon iconRoute="add-task" iconName="delete" size={24} />
					削除
				</Button>
				<Button onClick={() => alert('保存')}>
					<Icon iconRoute="add-task" iconName="save" size={24} />
					保存
				</Button>
			</div>
		</div>
	);
};

export default TaskDetail;
