import { format } from 'date-fns';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import DatePicker from './DatePicker';
import Image from 'next/image';

const Header = () => {
	const router = useRouter();

	const [isModal, setIsModal] = useState(false);

	const [selectedDate, setSelectedDate] = useState(
		format(new Date(), 'yyyy-MM-dd')
	); // 今日の日付を初期値に設定

	// 日付選択ハンドラー
	const handleDateChange = () => {
		setIsModal(true);
	};

	const handleRoute = () => {
		router.push('/limit-task');
	};

	return (
		<div className="flex justify-between items-center w-full mb-4">
			<Button onClick={handleDateChange}>{selectedDate}</Button>

			<Button onClick={handleRoute}>
				<Image src={'/icons/deadline.svg'} width={20} height={20} alt="納期" />
				<span className="ml-2">納期</span>
			</Button>

			<Button onClick={() => router.push('/add-schedule')}>
				<span className="ml-2">追加</span>
			</Button>

			{/* 三項演算子 */}
			{/* isModalがtrueの場合、Calendarコンポーネントを表示 */}
			{isModal && (
				<div
					onClick={() => setIsModal(false)}
					className="absolute top-0 left-0 h-screen w-full m-auto z-50 bg-white-secondary opacity-25"
				>
					<DatePicker isModal={isModal} />
				</div>
			)}
		</div>
	);
};

export default Header;
