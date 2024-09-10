'use client';

import Footer from '@/components/features/footer/Footer';

import React from 'react';
import { ResetBtn, ResetBtnDisabled } from './components/timer/ResetBtn';
import { InTimer, NextTimer } from './components/timer/Timer';

const TopTask = () => {
	return (
		<main>
			<div className="absolute top-0 my-14 space-y-4">
				<NextTimer />
				<ResetBtnDisabled />
			</div>

			<Footer />
		</main>
	);
};

export default TopTask;
