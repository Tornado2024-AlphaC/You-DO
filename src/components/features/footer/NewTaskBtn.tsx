import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const NewTaskBtn = () => {
	const router = useRouter();

	const showNewTaskModal = () => {
		console.log('showNewTaskModal');
	};
	return (
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
	);
};

export default NewTaskBtn;
