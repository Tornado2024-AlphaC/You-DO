'use client';

import Footer from '@/components/features/footer/Footer';
import React from 'react';
import TaskCard from './components/taskCard/TaskCard';
import { ResetBtn, ResetBtnDisabled } from './components/timer/ResetBtn';
import { InTimer, NextTimer } from './components/timer/Timer';
import { DailySchedule, TaskList } from '@/constants/routing';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { SideSwipe } from '@/components/ui/sideSwipe';

const TopTask = () => {
	const router = useRouter();

	const handlers = useSwipeable({
		onSwipedLeft: () => router.push(TaskList),
		onSwipedRight: () => router.push(DailySchedule),
		preventScrollOnSwipe: true,
		trackMouse: true,
	});

	return (
		<SideSwipe>
			<main {...handlers}>
				<div className="absolute top-0 my-14 space-y-4">
					<NextTimer />
					<ResetBtnDisabled />
				</div>

				<TaskCard />

				<Footer />
			</main>
		</SideSwipe>
	);
};

export default TopTask;
