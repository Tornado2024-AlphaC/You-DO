'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const variants = {
	hidden: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
		transition: { duration: 0.5 },
	}),
	enter: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.5 },
	},
	exit: (direction: number) => ({
		x: direction > 0 ? -1000 : 1000,
		opacity: 0,
		transition: { duration: 0.5 },
	}),
};

export const SideSwipe = ({ children }: { children: ReactNode }) => {
	const pathName = usePathname();
	let direction = 0;

	if (pathName === '/top-task') {
		direction = 0;
	} else if (pathName === '/daily-schedule') {
		direction = pathName === '/top-task' ? 1 : -1;
	} else if (pathName === '/task-list') {
		direction = pathName === '/top-task' ? -1 : 1;
	}
	return (
		// 画面スワイプによる画面遷移アニメーション
		<AnimatePresence mode="wait">
			<motion.div
				key={pathName}
				custom={direction}
				variants={variants}
				initial="hidden"
				animate="enter"
				exit="exit"
				transition={{ type: 'tween', duration: 0.5 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};
