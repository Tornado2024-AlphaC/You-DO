import React from 'react';

export const InTimer = () => {
	return (
		<div>
			<div className="flex flex-col w-[280px] h-[80px] justify-center items-center text-red-quaternary bg-red-secondary rounded-sm">
				<p className="text-xs">残り空き時間</p>
				<p className=" text-2xl font-bold">00：00：00</p>
			</div>
		</div>
	);
};

export const NextTimer = () => {
	return (
		<div>
			<div className="flex flex-col w-[280px] h-[80px] justify-center items-center text-green-quaternary bg-green-secondary rounded-sm">
				<p className="text-xs">次の空き時間まで</p>
				<p className=" text-2xl font-bold">00：00：00</p>
			</div>
		</div>
	);
};
