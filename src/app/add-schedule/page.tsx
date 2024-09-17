'use client';

import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useState } from 'react';

import { format, set } from 'date-fns';

import { useRouter } from 'next/navigation';
import { useUserData } from '@/components/features/use-cookies/useUserData';
import { get } from 'http';

type Schedule = {
	id: number;
	user_id: number;
	type: string;
	start_time: string;
	end_time: string;
	duration: number;
	created_at: string;
	updated_at: string;
};

const PostSchedule = () => {
	const router = useRouter();
	const { getUserData } = useUserData();
	const user_id = Number(getUserData().user_id);

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

	const now1 = new Date();
	const now2 = new Date();
	now1.setHours(now1.getHours() + 1); // 1時間を追加
	now1.setMinutes(0); // 分を0にリセット
	const startDefault = now1;
	now2.setHours(now2.getHours() + 1); // 1時間を追加
	now2.setMinutes(30); // 分を30にリセット
	const endDefault = now2;

	//開始時間を管理
	const [startDate, setStartDate] = useState(
		getDate(startDefault.toISOString())
	);
	const [startTime, setStartTime] = useState(
		getTime(startDefault.toISOString())
	);
	//終了時間を管理
	const [endDate, setEndDate] = useState(getDate(endDefault.toISOString()));
	const [endTime, setEndTime] = useState(getTime(endDefault.toISOString()));

	// 時間をリセットする関数
	const handleCancel = () => {
		router.push('/daily-schedule');
	};

	const handleClear = () => {
		resetForm();
	};

	const save_schedule = async (
		user_id: number,
		type: string,
		start_time: string,
		end_time: string
	): Promise<Schedule> => {
		return new Promise((resolve, reject) => {
			const url = '/api/schedule';
			const body = {
				user_id,
				type,
				start_time,
				end_time,
			};

			try {
				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				}).then(async res => {
					if (!res.ok) {
						throw new Error('Failed to save schedule');
					}
					const data = await res.json();
					resolve(data.schedule);
				});
			} catch (error) {
				alert('スケジュールの保存に失敗しました');
				reject(null);
			}
		});
	};

	const call_save_schedule = () => {
		if (!startDate || !startTime || !endDate || !endTime) {
			alert('日付と時間を両方設定してから保存してください');
			return;
		}

		const start_time = `${startDate}T${startTime}`;
		const end_time = `${endDate}T${endTime}`;
		const type = 'empty';

		try {
			const schedule = save_schedule(user_id, type, start_time, end_time);
			if (!schedule) {
				alert('スケジュールの保存に失敗しました');
				return;
			}
			alert('スケジュールを保存しました');
			resetForm();
		} catch (error) {
			alert('スケジュールの保存に失敗しました');
		}
	};

	const resetForm = () => {
		const now1 = new Date();
		const now2 = new Date();
		now1.setHours(now1.getHours() + 1); // 1時間を追加
		now1.setMinutes(0); // 分を0にリセット
		const startDefault = now1;
		now2.setHours(now2.getHours() + 1); // 1時間を追加
		now2.setMinutes(30); // 分を30にリセット
		const endDefault = now2;
		setStartDate(getDate(startDefault.toISOString()));
		setStartTime(getTime(startDefault.toISOString()));
		setEndDate(getDate(endDefault.toISOString()));
		setEndTime(getTime(endDefault.toISOString()));
	};

	return (
		<div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
			<div className="mb-4">
				<h1 className="text-2xl font-semibold">スケジュール（空き時間）追加</h1>
			</div>

			{/* 開始時間 */}
			<div className="flex items-center py-4">
				<EventAvailableIcon className="mr-2" />
				<span className="text-lg">開始時間</span>
			</div>
			<div className="flex gap-2 mb-4">
				<input
					type="date"
					className="border border-gray-300 rounded p-2"
					value={startDate}
					onChange={e => setStartDate(e.target.value)}
				/>
				<input
					type="time"
					className="border border-gray-300 rounded p-2"
					value={startTime}
					onChange={e => setStartTime(e.target.value)}
				/>
			</div>

			{/* 開始時間 */}
			<div className="flex items-center py-4">
				<EventAvailableIcon className="mr-2" />
				<span className="text-lg">終了時間</span>
			</div>
			<div className="flex gap-2 mb-4">
				<input
					type="date"
					className="border border-gray-300 rounded p-2"
					value={endDate}
					onChange={e => setEndDate(e.target.value)}
				/>
				<input
					type="time"
					className="border border-gray-300 rounded p-2"
					value={endTime}
					onChange={e => setEndTime(e.target.value)}
				/>
			</div>

			{/* キャンセルボタン */}
			<div className="flex gap-2">
				<button
					onClick={handleCancel}
					className="px-4 py-2 bg-red-200 text-red-600 rounded-full"
				>
					キャンセル
				</button>
				<button
					onClick={handleClear}
					className="px-4 py-2 bg-red-200 text-red-600 rounded-full"
				>
					クリア
				</button>
				<button
					onClick={call_save_schedule}
					className="px-4 py-2 bg-blue-200 text-blue-600 rounded-full"
				>
					保存
				</button>
			</div>
		</div>
	);
};

export default PostSchedule;
