'use client';

import Footer from '@/components/features/footer/Footer';
import { SideSwipe } from '@/components/ui/sideSwipe';
import { TopTask } from '@/constants/routing';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { InTimer } from './components/timer/Timer';
import TaskField from './components/tasks/TaskField';

const TaskList = () => {
	const router = useRouter();

	const handlers = useSwipeable({
		onSwipedRight: () => router.push(TopTask),
		preventScrollOnSwipe: true,
		trackMouse: true,
	});
	return (
		<SideSwipe>
			<main {...handlers}>
				<TaskField taskTotal={7} />
				{/* InTimer：空き時間中、NextTimer：空き時間外 */}
				{/* <NextTimer /> */}
				<InTimer />
				<Footer />
			</main>
		</SideSwipe>
	);
};

export default TaskList;
