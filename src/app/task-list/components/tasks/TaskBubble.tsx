import Image from 'next/image';
import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DescriptionIcon from '@mui/icons-material/Description';

interface TaskBubbleProps {
	color: string;
	size: string;
	icon: number;
	x: number;
	y: number;
	iconType: string;
}

function getIcon(iconType: string, icon: number) {
	switch (iconType) {
		case 'WorkIcon':
			return <WorkIcon sx={{ fontSize: icon, color: "#ffff" }}/>;
		case 'SchoolIcon':
			return <SchoolIcon sx={{ fontSize: icon, color: "#ffff" }}/>;
		case 'FitnessCenterIcon':
			return <FitnessCenterIcon sx={{ fontSize: icon, color: "#ffff" }}/>;
		case 'DescriptionIcon':
			return <DescriptionIcon sx={{ fontSize: icon, color: "#ffff" }}/>;
		default:
			return <DescriptionIcon sx={{ fontSize: icon, color: "#ffff" }}/>;
	}
}

const TaskBubble = ({ icon, size, color, x, y,iconType }: TaskBubbleProps) => {
	console.log(icon);
	return (
		<div
			className={`rounded-full absolute flex justify-center items-center border-2 ${color} ${size} `}
			style={{ left: `${x}px`, top: `${y}px` }}
		>
			{getIcon(iconType, icon)}
		</div>
	);
};

export default TaskBubble;
