'use client';

import { DailySchedule, Profile, TaskList } from '@/constants/routing';
import Link from 'next/link';
import React from 'react';

const TopTask = () => {
	return (
		<main>
			<h1>TopTask</h1>
			<Link href={Profile} className="text-blue-500">
				プロフィール画面へ
			</Link>
			<div className="flex justify-between">
				<Link href={TaskList} className="text-blue-500">
					タスク一覧画面へ
				</Link>
				<Link href={DailySchedule} className="text-blue-500">
					1日の予定画面へ
				</Link>
			</div>
		</main>
	);
};

export default TopTask;
