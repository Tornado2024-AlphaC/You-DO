import React from 'react';
import { FiEdit3, FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

// Define props for reuse
interface TaskCardProps {
	id: number;
	taskName: string;
	progress: number; // Progress percentage (e.g., 10)
	limit_time: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
	id,
	taskName,
	progress,
	limit_time,
}) => {
	const router = useRouter();

	// Handler for the detail button
	const handleDetailClick = () => {
		router.push(`/task-detail/${id}`); // Example route for task details
	};

	return (
		<div className="bg-red-300 p-4 rounded-lg shadow-md flex flex-col items-center w-64">
			{/* Task Name and Circular Icon */}
			<div className="flex items-center w-full mb-2">
				<FiCheckCircle className="text-white text-3xl mr-2" />{' '}
				{/* Circular Check Icon */}
				<span className="text-white text-lg">{taskName}</span>
			</div>

			{/* Limit Time */}
			<div className="w-full mb-1">
				<span className="text-white text-sm">納期: {limit_time}</span>
			</div>

			{/* Progress Bar */}
			<div className="w-full flex items-center mb-4">
				<div className="bg-red-400 w-full h-2 rounded-lg overflow-hidden">
					<div
						className="bg-red-200 h-full"
						style={{ width: `${progress}%` }} // Dynamic width based on progress
					></div>
				</div>
				<span className="ml-2 text-white text-sm">{`${progress}%`}</span>
			</div>

			{/* Detail Button */}
			<button
				className="bg-green-400 text-white text-sm py-2 px-4 rounded-lg flex items-center"
				onClick={handleDetailClick}
			>
				<FiEdit3 className="mr-2" /> {/* Edit Icon */}
				詳細へ
			</button>
		</div>
	);
};

export default TaskCard;
