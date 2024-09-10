import React from 'react';
import TaskTimer from '../timer/TaskTimer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const TaskCard = () => {
	return (
		<div className="flex flex-col justify-center items-center w-[400px] bg-green-tertiary border-2 border-green-secondary rounded-sm shadow-sm p-3">
			<TaskTimer />
			<div className="flex flex-col justify-start items-start w-[380px] text-green-secondary">
				<div className="flex items-center max-w-[380px] p-2">
					<Image
						src={'/icons/plus.svg'}
						width={48}
						height={48}
						alt="icon"
						className="p-2 bg-green-secondary rounded-full mr-3"
					/>
					Task title
				</div>
				<div className="flex items-center p-2">
					<Image
						src={'/icons/plus.svg'}
						width={48}
						height={48}
						alt="icon"
						className="p-2 rounded-full mr-3"
					/>
					Task progress
				</div>
				<div className="flex items-center p-2">
					<Image
						src={'/icons/plus.svg'}
						width={48}
						height={48}
						alt="icon"
						className="p-2 rounded-full mr-3"
					/>
					2024年10月22日(日)・23:00
				</div>
			</div>
			<div>
				<Button className="px-10 py-2">
					<Image
						src={'icons/edit.svg'}
						width={36}
						height={36}
						alt="edit"
						className="mr-3"
					/>
					詳細へ
				</Button>
			</div>
		</div>
	);
};

export default TaskCard;
