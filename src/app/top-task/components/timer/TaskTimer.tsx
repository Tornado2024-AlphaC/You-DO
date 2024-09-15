import React from 'react';

interface TaskTimerProps {
	color: 'red' | 'orange' | 'yellow' | 'green';
}
const TaskTimer = ({ color }: TaskTimerProps) => {
	const getColorClass = (color: string) => {
		switch (color) {
			case 'red':
				return 'text-red-tertiary bg-red-secondary';
			case 'orange':
				return 'text-orange-tertiary bg-orange-secondary';
			case 'yellow':
				return 'text-yellow-tertiary bg-yellow-secondary';
			case 'green':
				return 'text-green-tertiary bg-green-secondary';
			default:
				return 'text-red-tertiary bg-red-secondary';
		}
	};
	return (
		<div>
			<div
				className={`flex flex-col w-[200px] h-[50px] mb-2 justify-center items-center ${getColorClass(color)} rounded-sm`}
			>
				<p className=" text-base font-semibold">残り 00：00：00</p>
			</div>
		</div>
	);
};

export default TaskTimer;
