'use client';
import React, { useState } from 'react';
import Footer from '../../components/features/footer/Footer';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { TopTask } from '@/constants/routing';
import { SideSwipe } from '@/components/ui/sideSwipe';
import Header from './components/Header';

const DailySchedule: React.FC = () => {
	const router = useRouter();

	const [schedules, setSchedules] = useState<{ time: number; text: string }[]>(
		[]
	); // スケジュールの状態管理

	// スケジュール追加ハンドラー
	const handleAddSchedule = (time: number) => {
		setSchedules([...schedules, { time, text: '予定' }]);
	};

	// 予定を削除するハンドラー
	const handleSwipe = (index: number) => {
		setSchedules(schedules.filter(schedule => schedule.time !== index));
	};

	const handlers = useSwipeable({
		onSwipedLeft: () => router.push(TopTask),
		preventScrollOnSwipe: true,
		trackMouse: true,
	});

	return (
		<SideSwipe>
			<main
				{...handlers}
				className="h-full w-full bg-white flex flex-col justify-center items-center p-3"
			>
				{/* Header */}
				<Header />

				{/* Schedule Grid */}
				<div
					className="w-full bg-white overflow-y-auto"
					style={{ maxHeight: 'calc(100vh - 200px)' }}
				>
					{Array.from({ length: 24 }).map((_, index) => (
						<div
							key={index}
							className="relative flex items-start border-t border-white-tertiary"
						>
							<div className="w-14 text-xs text-white-quaternary">
								{index.toString().padStart(2, '0')}:00
							</div>
							<div
								className="flex-1 h-10 border-l border-white-tertiary"
								onClick={() => handleAddSchedule(index)} // スケジュール追加用のクリックハンドラー
							>
								{/* Placeholder for Scheduled Item */}
								{schedules
									.filter(schedule => schedule.time === index)
									.map((schedule, i) => (
										<div
											key={i}
											className="bg-green-quaternary text-green-secondary border-2 border-green-secondary items-center py-2 rounded-sm rounded-ee-none"
											style={{ width: 'calc(100% - 1rem)' }}
											onTouchEnd={() => handleSwipe(index)} // スワイプで削除できる
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
			</main>
		</SideSwipe>
	);
};

export default DailySchedule;
