'use client';
import { useState } from 'react';

import DescriptionIcon from '@mui/icons-material/Description';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

// 型定義
type TimeUnit = '10分' | '30分' | '1時間';
type IconType = 'DescriptionIcon' | 'WorkIcon' | 'SchoolIcon' | 'FitnessCenterIcon';

const TaskDetail = () => {
  const [taskName, setTaskName] = useState('');
  const [totalMinutes, setTotalMinutes] = useState(0); 
  const [selectedIcon, setSelectedIcon] = useState<IconType>('DescriptionIcon'); // デフォルトアイコン
  const [selectedColor, setSelectedColor] = useState('bg-green-300'); // デフォルト色
  const [progress, setProgress] = useState(50); // 初期進捗
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false); // アイコン選択用のフラグ

  // 日付と時間のステート
  const [dueDate, setDueDate] = useState(''); // 初期日付
  const [dueTime, setDueTime] = useState(''); // 初期時間

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

  // 時間をリセットする関数
  const handleCancel = () => {
    setTotalMinutes(0); 
    setTaskName('');
    setSelectedIcon('DescriptionIcon'); // 初期のアイコンにリセット
    setSelectedColor('bg-green-300');   // 初期の色にリセット
    setProgress(50);                    // 初期の進捗にリセット
    setDueDate('');                     // 日付をリセット
    setDueTime('');                     // 時間をリセット
  };

  // 削除ボタンで入力をリセットする
  const handleReset = () => {
    setTaskName('');
    setTotalMinutes(0);
    setSelectedIcon('DescriptionIcon');
    setSelectedColor('bg-green-300');
    setProgress(50);
    setDueDate('');  // 日付のリセット
    setDueTime('');  // 時間のリセット
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

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          id="taskName"
          value={taskName}
          placeholder="タスク名を追加"
          className="w-full p-2 border border-gray-300 rounded outline-none text-lg"
          onChange={e => setTaskName(e.target.value)}
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
          <button onClick={() => setSelectedIcon('DescriptionIcon')} className="p-2">
            <DescriptionIcon />
          </button>
          <button onClick={() => setSelectedIcon('WorkIcon')} className="p-2">
            <WorkIcon />
          </button>
          <button onClick={() => setSelectedIcon('SchoolIcon')} className="p-2">
            <SchoolIcon />
          </button>
          <button onClick={() => setSelectedIcon('FitnessCenterIcon')} className="p-2">
            <FitnessCenterIcon />
          </button>
        </div>
      )}
      <hr />
      <div className="flex justify-around py-4">
        <div onClick={() => setSelectedColor('bg-green-300')} className={`w-8 h-8 ${selectedColor === 'bg-green-300' ? 'ring-2 ring-black' : ''} bg-green-300 rounded-full cursor-pointer`}></div>
        <div onClick={() => setSelectedColor('bg-blue-300')} className={`w-8 h-8 ${selectedColor === 'bg-blue-300' ? 'ring-2 ring-black' : ''} bg-blue-300 rounded-full cursor-pointer`}></div>
        <div onClick={() => setSelectedColor('bg-purple-300')} className={`w-8 h-8 ${selectedColor === 'bg-purple-300' ? 'ring-2 ring-black' : ''} bg-purple-300 rounded-full cursor-pointer`}></div>
        <div onClick={() => setSelectedColor('bg-red-300')} className={`w-8 h-8 ${selectedColor === 'bg-red-300' ? 'ring-2 ring-black' : ''} bg-red-300 rounded-full cursor-pointer`}></div>
        <div onClick={() => setSelectedColor('bg-yellow-300')} className={`w-8 h-8 ${selectedColor === 'bg-yellow-300' ? 'ring-2 ring-black' : ''} bg-yellow-300 rounded-full cursor-pointer`}></div>
      </div>
      <hr />
      <div className="flex items-center py-4">
        <EventAvailableIcon className="mr-2" />
        <span className="text-lg">納期</span>
      </div>
      <div className="flex gap-2 mb-4">
        <input 
          type="date" 
          className="border border-gray-300 rounded p-2" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
        <input 
          type="time" 
          className="border border-gray-300 rounded p-2" 
          value={dueTime} 
          onChange={(e) => setDueTime(e.target.value)} 
        />
      </div>
      <hr />
      <div className="flex items-center mb-4">
        <AccessTimeIcon className="w-6 h-6 mr-2" />
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

      <div className="flex items-center mb-4">
        <CheckCircleOutlineIcon className="mr-2" />
        <span className="text-lg">進捗</span>
      </div>

      {/* 進捗スライダー */}
      <div className="flex items-center mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full"
        />
        <span className="ml-2">{progress}%</span>
      </div>
      <hr />
      <div className="flex justify-between py-4">
        <button className="flex items-center justify-center px-6 py-2 bg-green-400 text-white rounded-lg">
          ← 戻る
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center px-6 py-2 bg-red-400 text-white rounded-lg"
        >
          ✖ 削除
        </button>
        <button className="flex items-center justify-center px-6 py-2 bg-green-400 text-white rounded-lg">
          ✔ 保存
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
