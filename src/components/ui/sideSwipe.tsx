'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const variants = {
	hidden: (direction: number) => ({
		opacity: 0,
		transition: { duration: 0.5 },
	}),
	enter: {
		opacity: 1,
		transition: { duration: 0.5 },
	},
	exit: (direction: number) => ({
		opacity: 0,
		transition: { duration: 0.5 },
	}),
};

export const SideSwipe = ({ children }: { children: ReactNode }) => {
	const pathName = usePathname();

	return (
		// 画面スワイプによる画面遷移アニメーション
		<AnimatePresence mode="wait">
			<motion.div
				key={pathName}
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
