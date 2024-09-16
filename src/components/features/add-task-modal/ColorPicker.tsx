import React from 'react';
import classNames from 'classnames';

interface ColorPickerProps {
	color: string;
	selectedColor: string;
	setSelectedColor: (selectedColor: string) => void;
}


const ColorPicker = ({ selectedColor, color, setSelectedColor }: ColorPickerProps) => {
	{/*
    const circleClass = classNames(
        'w-8 h-8 rounded-full cursor-pointer', // 共通のクラス
        {
            [`bg-${color}-primary`]: selectedColor === color, // 動的な背景色クラス
            'bg-white-primary': selectedColor !== color, // 条件に合わない場合のクラス
            [`border-${color}-primary`]: true, // 動的なボーダークラス（常に適用）
            'border-8': true, // 常に適用されるクラス
        }
    );
		*/}
		const colorClasses: { [key: string]: string } = {
			red: 'bg-red-primary',
			blue: 'bg-blue-primary ',
			green: 'bg-green-primary',
			yellow: 'bg-yellow-primary',
			purple: 'bg-purple-primary',
			sky: 'bg-sky-primary',
			orange: 'bg-orange-primary',
			 
			// 他の色を追加
		};
	
		const circleClass = classNames(
			'w-8 h-8 rounded-full cursor-pointer border-8', // 共通のクラス
			{
				[colorClasses[color]]: selectedColor === color, // 条件に応じて色クラスを適用
				'bg-white-primary': selectedColor !== color,
				"border-red-primary": color === "red",
				"border-blue-primary": color === "blue",
				"border-green-primary": color === "green",
				"border-yellow-primary": color === "yellow",
				"border-purple-primary": color === "purple",
				"border-sky-primary": color === "sky",
				"border-orange-primary": color === "orange",
			}
		);
	console.log(circleClass);
	return (
		<div
			onClick={() => setSelectedColor(color)}
			//className={`w-8 h-8 ${selectedColor === color ? `bg-${color}-primary` : 'bg-white-primary'} border-8 border-${color}-primary rounded-full cursor-pointer`}
			className={circleClass}
		></div>
	);
};

export default ColorPicker;
