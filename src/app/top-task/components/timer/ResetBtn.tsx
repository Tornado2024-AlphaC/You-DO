import React from 'react';

export const ResetBtn = () => {
	return (
		<div className="flex justify-center items-center">
			<button className="w-[280px] bg-red-primary text-red-secondary border-2 border-red-secondary py-2 px-4 rounded-sm">
				空き時間を終了する
			</button>
		</div>
	);
};

// 非活性のボタン
export const ResetBtnDisabled = () => {
	return (
		<div className="flex justify-center items-center">
			<button
				className="w-[280px] bg-green-primary text-green-secondary border-2 border-green-secondary py-2 px-4 rounded-sm opacity-30"
				disabled
			>
				空き時間を終了する
			</button>
		</div>
	);
};
