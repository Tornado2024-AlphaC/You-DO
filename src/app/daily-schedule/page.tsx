import { Profile, TopTask } from '@/constants/routing';
import Link from 'next/link';
import React from 'react';

const DailySchedule = () => {
	return (
		<main>
			<h1>Daily Schedule</h1>
			<Link href={Profile} className="text-blue-500">
				プロフィール画面へ
			</Link>
			<Link href={TopTask} className="text-blue-500">
				今やるタスク画面へ
			</Link>
		</main>
	);
};

export default DailySchedule;
