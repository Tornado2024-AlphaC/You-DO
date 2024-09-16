import React from 'react';

interface AddTimeBtnProps {
	addTime: (timeUnit: string) => void;
	timeUnit: string;
}

export const AddTimeBtn = ({ addTime, timeUnit }: AddTimeBtnProps) => {
	return (
		<div
			onClick={() => addTime(timeUnit)}
			className="flex items-center justify-center bg-green-primary text-green-secondary border-2 border-green-secondary text-sm w-20 h-10 rounded-full cursor-pointer"
		>
			{timeUnit}
		</div>
	);
};

export const DeleteTimeBtn = ({ addTime, timeUnit }: AddTimeBtnProps) => {
	return (
		<div
			onClick={() => addTime(timeUnit)}
			className="flex items-center justify-center bg-red-primary text-red-secondary border-2 border-red-secondary text-sm w-20 h-10 rounded-full cursor-pointer"
		>
			{timeUnit}
		</div>
	);
};
