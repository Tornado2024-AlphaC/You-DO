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
        <div className="fixed inset-0 flex items-center justify-center bg-slate-50 bg-opacity-100 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            {/* モーダルコンテンツ */}
            <AddTaskModal closeModal={closeNewTaskModal} />
          </div>
        </div>
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
