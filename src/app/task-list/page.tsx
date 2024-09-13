'use client';
import React, { useState } from 'react';
import { CalendarToday } from '@mui/icons-material';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

// Tailwind CSS for styling
const TaskList: React.FC = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd')); // 今日の日付を初期値に設定

  const handleViewSchedule = () => {
    router.push('/daily-schedule'); 
  };
  // 日付選択ハンドラー
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-white p-4">
      {/* Header with Date */}
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <div className="flex items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-green-200 text-green-800 py-2 px-4 rounded-lg shadow-md"
          />
        </div>
	  </div>
      {/* Message */}
      <div className="flex-grow flex justify-center items-center">
        <p className="text-green-600 text-lg">本日納期のタスクはありません</p>
      </div>

      {/* Footer Button */}
      <div className="w-full flex justify-center">
        <button
          className="flex items-center bg-green-400 text-white py-2 px-4 rounded-lg shadow-md"
          onClick={handleViewSchedule}
        >
          <span className="mr-2">← 1日の予定を見る</span>
        </button>
      </div>
    </div>
  );
};


export default TaskList;










// import { Profile, TopTask } from '@/constants/routing';
// import Link from 'next/link';
// import React from 'react';

// const TaskList = () => {
// 	return (
// 		<main>
// 			<h1>TaskList</h1>
// 			<Link href={Profile} className="text-blue-500">
// 				プロフィール画面へ
// 			</Link>
// 			<Link href={TopTask} className="text-blue-500">
// 				今やるタスク画面へ
// 			</Link>
// 		</main>
// 	);
// };

// export default TaskList;
