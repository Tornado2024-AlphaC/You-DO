'use client';

import Footer from '@/components/features/footer/Footer';
import React from 'react';
import TaskCard from './components/taskCard/TaskCard';
import { ResetBtn, ResetBtnDisabled } from './components/timer/ResetBtn';
import { InTimer, NextTimer } from './components/timer/Timer';
import { SideSwipe } from '@/components/ui/sideSwipe';
import Link from 'next/link';
import { TaskList } from '@/constants/routing';

const TopTask = () => {
	return (
		<SideSwipe>
			<main>
				<div className="absolute top-0 my-14 space-y-4">
					<NextTimer />
					<ResetBtnDisabled />
					<Link href={TaskList}>タスク一覧へ</Link>
					<Link href="/daily-schedule">日課へ</Link>
				</div>

				<TaskCard />

				<Footer />
			</main>
		</SideSwipe>
	);
};

export default TopTask;
