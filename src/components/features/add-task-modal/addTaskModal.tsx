'use client';
import { useState } from 'react';

import DescriptionIcon from '@mui/icons-material/Description';

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import { useUserData } from '../use-cookies/useUserData';
import ColorPicker from './ColorPicker';
import Icon from '@/components/ui/Icon';
import { Button } from '@/components/ui/button';
import { AddTimeBtn, DeleteTimeBtn } from './AddTimeBtn';

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
type IconType =
	| 'DescriptionIcon'
	| 'WorkIcon'
	| 'SchoolIcon'
	| 'FitnessCenterIcon';

const AddTaskModal = ({ closeModal }: { closeModal: () => void }) => {
	const { getUserData } = useUserData();
	const user_id = Number(getUserData().user_id);

	//フォームの入力内容
	const [task_name, set_task_name] = useState('');
	const [total_minutes, set_total_minutes] = useState(0);
	const [selected_date, set_selected_date] = useState('');
	const [selected_time, set_selected_time] = useState('');
	const [selectedIcon, setSelectedIcon] = useState<IconType>('DescriptionIcon'); // デフォルトアイコン
	const [selectedColor, setSelectedColor] = useState('bg-green-300'); // デフォルト色
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false); // アイコン選択用のフラグ

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
				resetForm();
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

	// アイコン変更ボタンをクリックしたときのハンドラ
	const toggleIconPicker = () => {
		setIsIconPickerOpen(prev => !prev);
	};

	const resetForm = () => {
		set_task_name('');
		setSelectedIcon('DescriptionIcon');
		setSelectedColor('bg-green-300');
		set_total_minutes(0);
		set_selected_date('');
		set_selected_time('');
		setIsIconPickerOpen(false);
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

	const COLORS: string[] = [
		'green',
		'sky',
		'blue',
		'purple',
		'red',
		'orange',
		'yellow',
	];

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
				<div className="flex items-center py-4">
					{renderIcon()}
					<button
						onClick={toggleIconPicker}
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
						<button
							onClick={() => setSelectedIcon('SchoolIcon')}
							className="p-2"
						>
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
				<hr />
				{/* タスクカラー選択 */}
				<div className="flex justify-around items-center py-4">
					{/* map関数でCOLORSの数だけ繰り返し */}
					{COLORS.map(color => (
						<ColorPicker
							key={color}
							color={color}
							selectedColor={selectedColor}
							setSelectedColor={setSelectedColor}
						/>
					))}
				</div>
				<hr />
				<div className="flex flex-row gap-3">
					<p className="text-lg">
						<Icon iconRoute="add-task" iconName="deadline" size={24} />
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
					<Icon iconRoute="add-task" iconName="timer" size={24} />
					<h3 className="text-gray-700 font-medium">所要時間</h3>
					<span className="text-green-600 ml-auto">
						{formatTime(total_minutes)}
					</span>
				</div>

				<div className="flex gap-2 mb-6">
					<AddTimeBtn addTime={addTime} timeUnit="10分" />
					<AddTimeBtn addTime={addTime} timeUnit="30分" />
					<AddTimeBtn addTime={addTime} timeUnit="1時間" />
					<DeleteTimeBtn addTime={addTime} timeUnit="取消" />
				</div>

				<div className="flex justify-between">
					<Button onClick={closeModal}>
						<Icon iconRoute="add-task" iconName="back" size={24} />
						戻る
					</Button>
					<Button onClick={save_task}>
						<Icon iconRoute="icons" iconName="plus" size={24} />
						タスク追加
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;
