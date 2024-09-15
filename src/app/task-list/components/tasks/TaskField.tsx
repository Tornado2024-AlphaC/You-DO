'use client';

import React, { useEffect, useState } from 'react';
import TaskBubble from './TaskBubble';

interface TaskFieldProps {
	taskTotal: number;
}

const TaskField = ({ taskTotal }: TaskFieldProps) => {
	const [bubbles, setBubbles] = useState<
		{
			x: number;
			y: number;
			color: string;
			size: { bubble: string; icon: number };
		}[]
	>([]);

	const TASK_COLORS = [
		'bg-red-primary border-red-secondary',
		'bg-orange-primary border-orange-secondary',
		'bg-yellow-primary border-yellow-secondary',
		'bg-green-primary border-green-secondary',
		'bg-sky-primary border-sky-secondary',
		'bg-blue-primary border-blue-secondary',
		'bg-purple-primary border-purple-secondary',
	];
	const ICON_SIZE = [80, 70, 60, 50, 40, 30, 20];
	const TASK_SIZE = [
		'w-[160px] h-[160px]',
		'w-[140px] h-[140px]',
		'w-[120px] h-[120px]',
		'w-[100px] h-[100px]',
		'w-[80px] h-[80px]',
		'w-[60px] h-[60px]',
		'w-[40px] h-[40px]',
	];

	const generateRandomPosition = () => {
		let x = Math.floor(Math.random() * 325);
		let y = Math.floor(Math.random() * 560);
		while (y <= 10 || (y >= 260 && y <= 450)) {
			y = Math.floor(Math.random() * 560);
		}

		return { x, y };
	};

	const isTooClose = (x1: number, y1: number, x2: number, y2: number) => {
		const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
		return distance < 140;
	};

	const generateBubbles = () => {
		const newBubbles = [];
		for (let i = 0; i < taskTotal; i++) {
			let position: any;
			let isValidPosition = false;
			let attempts = 0;
			const maxAttempts = 300; // 配置試行回数の制限
			while (!isValidPosition && attempts < maxAttempts) {
				position = generateRandomPosition();
				isValidPosition = newBubbles.every(
					bubble => !isTooClose(bubble.x, bubble.y, position.x, position.y)
				);
				attempts++;
			}
			if (isValidPosition) {
				const color =
					TASK_COLORS[Math.floor(Math.random() * TASK_COLORS.length)];
				const sizeIndex = Math.floor(Math.random() * TASK_SIZE.length);
				const size = TASK_SIZE[sizeIndex];
				const iconSize = ICON_SIZE[sizeIndex];
				newBubbles.push({
					...position,
					color,
					size: { bubble: size, icon: iconSize },
				});
			}
			setBubbles(newBubbles);
		}
	};
	useEffect(() => {
		generateBubbles();
	}, [taskTotal]);

	return (
		<div className="relative w-full h-full">
			{bubbles.map((bubble, index) => (
				<TaskBubble
					key={index}
					x={bubble.x}
					y={bubble.y}
					color={bubble.color}
					size={bubble.size.bubble}
					icon={bubble.size.icon}
				/>
			))}
		</div>
	);
};
export default TaskField;
