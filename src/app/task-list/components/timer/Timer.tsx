import React from 'react';

export const InTimer =(props : {time:string}) => {
	return (
		// absoluteで画面中央に表示
		<div className="absolute m-auto">
			<div className="flex flex-col w-[200px] h-[60px] justify-center items-center text-red-quaternary bg-red-secondary rounded-sm">
				<p className="text-[12px]">残り空き時間</p>
				<p className=" text-xl font-bold">{props.time}</p>
			</div>
		</div>
	);
};

export const NextTimer = (props : {time:string}) => {
	return (
		<div className="absolute m-auto">
			<div className="flex flex-col w-[200px] h-[60px] justify-center items-center text-green-quaternary bg-green-secondary rounded-sm">
				<p className="text-[12px]">次の空き時間まで</p>
				<p className=" text-xl font-bold">{props.time}</p>
			</div>
		</div>
	);
};
