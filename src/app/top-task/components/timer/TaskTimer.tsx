import React from 'react';

const TaskTimer = () => {
	return (
		<div>
			<div className="flex flex-col w-[200px] h-[50px] mb-2 justify-center items-center text-red-tertiary bg-red-secondary rounded-sm">
				<p className=" text-base font-semibold">残り 00：00：00</p>
			</div>
		</div>
	);
};

export default TaskTimer;
