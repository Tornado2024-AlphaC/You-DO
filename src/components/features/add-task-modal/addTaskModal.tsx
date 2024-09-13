'use client';
import { useState } from 'react';

import DescriptionIcon from '@mui/icons-material/Description';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import Image from 'next/image';
import youDoAddTask from '../../../../public/add-task/Frame 100.svg';


// 型定義
type TimeUnit = '10分' | '30分' | '1時間';

const AddTaskModal = () => {
	const [taskName, setTaskName] = useState('');
	const [totalMinutes, setTotalMinutes] = useState(0);

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
	
	  // 所要時間の分を時間と分の形式に変換する関数
	  const formatTime = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours > 0 ? `${hours}時間` : ''}${mins}分`;
	  };
	
	  // 取消ボタンで時間をリセットする
	  const handleCancel = () => {
		setTotalMinutes(0); // または初期値にリセット
	  };


	return (
		<div>
			<div className="flex flex-col gap-2">
				<div>
					<input
						type="text"
						id="taskName"
						value={taskName}
						placeholder="タスク名を追加"
						className="outline-none text-lg"
						onChange={e => setTaskName(e.target.value)}
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
					<input type="date" />
					<input type="time" />
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
					<span className="text-green-600 ml-auto">{formatTime(totalMinutes)}</span>
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
					<button className="flex items-center justify-center px-6 py-2 bg-green-400 text-white rounded-lg">
					← 戻る
					</button>
					<button className="flex items-center justify-center px-6 py-2 bg-green-400 text-white rounded-lg">
					＋ タスク追加
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTaskModal;
