import Image from 'next/image';
import React from 'react';

interface TaskBubbleProps {
	color: string;
	size: string;
	icon: number;
	x: number;
	y: number;
}

const TaskBubble = ({ icon, size, color, x, y }: TaskBubbleProps) => {
	return (
		<div
			className={`rounded-full absolute flex justify-center items-center border-2 ${color} ${size} `}
			style={{ left: `${x}px`, top: `${y}px` }}
		>
			<Image src={'/icons/text.svg'} width={icon} height={icon} alt="icon" />
		</div>
	);
};

export default TaskBubble;
