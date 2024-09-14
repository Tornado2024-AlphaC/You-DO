'use client';

import Footer from '@/components/features/footer/Footer';
import { SideSwipe } from '@/components/ui/sideSwipe';
import { TopTask } from '@/constants/routing';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSwipeable } from 'react-swipeable';

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
				<h1>TaskList</h1>
				<Footer />
			</main>
		</SideSwipe>
	);
};

export default TaskList;
