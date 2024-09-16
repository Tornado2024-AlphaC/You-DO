import React from 'react';

interface ColorPickerProps {
	color: string;
	selectedColor: string;
	setSelectedColor: (selectedColor: string) => void;
}

const ColorPicker = ({
	selectedColor,
	color,
	setSelectedColor,
}: ColorPickerProps) => {
	return (
		<div
			onClick={() => setSelectedColor(color)}
			className={`w-8 h-8 ${selectedColor === color ? `bg-${color}-primary` : 'bg-white-primary'} border-8 border-${color}-primary rounded-full cursor-pointer`}
		></div>
	);
};

export default ColorPicker;
