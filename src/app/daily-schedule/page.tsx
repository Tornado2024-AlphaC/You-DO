'use client';

import { Profile, TopTask } from '@/constants/routing';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'react-calendar/dist/Calendar.css'; // カレンダーのスタイル
import './daily-schedule.css';

interface Task {
	id: number;
	title: string;
	priority: number;
}

const DailySchedule: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [availableTimes, setAvailableTimes] = useState<string[]>([]);

	// タスクの取得
	const fetchTasks = async () => {
		try {
			const response = await axios.get('/api/tasks', {
				params: { date: selectedDate },
			});
			setTasks(response.data);
		} catch (error) {
			console.error('タスクの取得に失敗しました', error);
		}
	};

	// 空き時間の投稿
	const postAvailability = async (times: string[]) => {
		try {
			await axios.post('/api/availability', { date: selectedDate, times });
			fetchTasks(); // 更新後に再度タスクを取得
		} catch (error) {
			console.error('空き時間の投稿に失敗しました', error);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, [selectedDate]);

	// カレンダーのトグル表示
	const toggleCalendar = () => {
		setShowCalendar(!showCalendar);
	};

	// カレンダーでの日付選択ハンドラー
	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		setShowCalendar(false);
	};

	return (
		<div className="app">
			<header className="header">
				<button onClick={toggleCalendar} className="button date-button">
					📅 {selectedDate.toLocaleDateString()}
				</button>
				<button
					className="button deadline-button"
					onClick={() => console.log('納期一覧に移動')}
				>
					⏰ 納期
				</button>
			</header>

			{/* カレンダーの表示/非表示 */}
			{showCalendar && (
				<div className="calendar-overlay">
					<div className="calendar-container">
						{/* <Calendar
							onChange={handleDateChange}
							value={selectedDate}
							tileClassName={({ date, view }) => {
								if (view === 'month') {
									const today = new Date();
									if (date.toDateString() === selectedDate.toDateString()) {
										return 'selected-date';
									} else if (date.toDateString() === today.toDateString()) {
										return 'today-date';
									}
								}
								return null;
							}}
						/> */}
					</div>
				</div>
			)}

			<div className="schedule">
				{Array.from({ length: 24 }, (_, i) => (
					<div key={i} className="time-block">
						<div className="time-label">{i.toString().padStart(2, '0')}:00</div>
						<div className="event" draggable>
							予定
						</div>
					</div>
				))}
			</div>

			<footer className="footer">
				<button className="profile-button">👤</button>
				<button
					className="add-task-button"
					onClick={() => postAvailability(availableTimes)}
				>
					+ タスク追加
				</button>
			</footer>
		</div>
	);
};
export default DailySchedule;

// return (
// 	<main>
// 		<h1>Daily Schedule</h1>
// 		<Link href={Profile} className="text-blue-500">
// 			プロフィール画面へ
// 		</Link>
// 		<Link href={TopTask} className="text-blue-500">
// 			今やるタスク画面へ
// 		</Link>
// 	</main>
// );

// import React from 'react';
// import './App.css';

// const App: React.FC = () => {
//   return (
//     <div className="app">
//       <header className="header">
//         <button className="button date-button">
//           📅 10月10日
//         </button>
//         <button className="button deadline-button">
//           ⏰ 納期
//         </button>
//       </header>

//       <div className="schedule">
//         <div className="time-block">
//           <div className="time-label">00:00</div>
//           <div className="event">予定</div>
//         </div>
//         <div className="time-block">
//           <div className="time-label">10:00</div>
//           <div className="event">予定</div>
//         </div>
//       </div>

//       <footer className="footer">
//         <button className="profile-button">👤</button>
//         <button className="add-task-button">+ タスク追加</button>
//       </footer>
//     </div>
//   );
// };

// export default App;
