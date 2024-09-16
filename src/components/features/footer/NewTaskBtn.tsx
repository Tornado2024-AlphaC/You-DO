import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import AddTaskModal from '@/components/features/add-task-modal/addTaskModal';

const NewTaskBtn: React.FC = () => {
	// モーダルの開閉を管理するステート
	const [isModalOpen, setIsModalOpen] = useState(false);

	// モーダルを開く関数
	const showNewTaskModal = () => {
		setIsModalOpen(true);
	};

	// モーダルを閉じる関数
	const closeNewTaskModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{/* タスク追加ボタン */}
			<Button onClick={showNewTaskModal}>
				<Image
					src={'/icons/plus.svg'}
					width={20}
					height={20}
					alt="+"
					className="mr-3"
				/>
				タスクの追加
			</Button>

			{/* モーダルの表示 */}
			{isModalOpen && (
				<>
					<span
						onClick={closeNewTaskModal}
						className="fixed top-0 left-0 w-full h-screen bg-white-secondary opacity-25 z-40"
					/>
					{/* モーダルコンテンツ */}
					<AddTaskModal closeModal={closeNewTaskModal} />
				</>
			)}
		</>
	);
};

export default NewTaskBtn;

// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import React from 'react';
// import { useRouter } from 'next/navigation';
// import AddTaskMmodal from '@/components/features/add-task-modal/addTaskModal';

// const NewTaskBtn = () => {
// 	const router = useRouter();

// 	const showNewTaskModal = () => {
// 		return (
// 			<main>
// 				<AddTaskMmodal />
// 			</main>
// 		);
// 	};
// 	return (
// 		<Button onClick={showNewTaskModal}>
// 			<Image
// 				src={'/icons/plus.svg'}
// 				width={20}
// 				height={20}
// 				alt="+"
// 				className="mr-3"
// 			/>
// 			タスクの追加
// 		</Button>
// 	);
// };

// export default NewTaskBtn;
