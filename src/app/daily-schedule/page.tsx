'use client';
import React, { useState } from 'react';
import { CalendarToday, Timer } from '@mui/icons-material';
import { format } from 'date-fns';
import Footer from '../../components/features/footer/Footer';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation'

const DailySchedule: React.FC = () => {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd')); // 今日の日付を初期値に設定
  const [schedules, setSchedules] = useState<{ time: number; text: string }[]>([]); // スケジュールの状態管理

  // 日付選択ハンドラー
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  // スケジュール追加ハンドラー
  const handleAddSchedule = (time: number) => {
    setSchedules([...schedules, { time, text: '予定' }]);
  };

  // 予定を削除するハンドラー
  const handleSwipe = (index: number) => {
    setSchedules(schedules.filter(schedule => schedule.time !== index));
  };

  // スワイプハンドラー設定
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      // スワイプした方向に応じて処理を追加
      console.log("Swiped left", eventData);
    },
    onSwipedRight: (eventData) => {
      // スワイプした方向に応じて処理を追加
      console.log("Swiped right", eventData);
    },
  });
  const goTo_task_list = () => {
	// 次のタスクのページへ遷移
	router.push('/task-list');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      {/* Meta Tag for Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <div className="flex items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="bg-green-200 text-green-800 py-2 px-4 rounded-lg shadow-md"
          />
        </div>
        <button className="flex items-center bg-green-200 text-green-800 py-2 px-4 rounded-lg shadow-md" onClick={goTo_task_list}>
          <Timer className="text-lg" />
          <span className="ml-2">納期</span>
        </button>
      </div>

      {/* Schedule Grid */}
      <div className="w-full max-w-md bg-white overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className="relative flex items-start border-t border-gray-200">
            <div className="w-14 text-xs text-gray-500">{index.toString().padStart(2, '0')}:00</div>
            <div
              className="flex-1 h-10 border-l border-gray-200"
              onClick={() => handleAddSchedule(index)} // スケジュール追加用のクリックハンドラー
            >
              {/* Placeholder for Scheduled Item */}
              {schedules.filter(schedule => schedule.time === index).map((schedule, i) => (
                <div
                  key={i}
                  className="bg-green-700 text-white text-center py-2 rounded-lg m-1 transition-transform duration-300 ease-in-out"
                  style={{ width: 'calc(100% - 1rem)' }}
                  {...swipeHandlers} // スワイプハンドラーを追加
                  onTouchEnd={() => handleSwipe(index)} // スワイプで削除
                >
                  {schedule.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
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
