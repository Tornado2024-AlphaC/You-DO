'use client';
import AddTaskModal from '@/components/features/add-task-modal/addTaskModal';
import { useState } from 'react';

const AddTaskTest = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<main>
			<h1>Add Task Test</h1>
			<button onClick={() => setIsModalOpen(true)}>Open Modal</button>
			{isModalOpen && <AddTaskModal closeModal={closeModal} />}
		</main>
	);
};

export default AddTaskTest;
