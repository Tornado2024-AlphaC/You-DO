import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const NewTaskBtn = () => {
	return (
		<Button>
			<Image
				src={'/icons/plus.svg'}
				width={20}
				height={20}
				alt="+"
				className=" mr-3"
			/>
			タスクの追加
		</Button>
	);
};

export default NewTaskBtn;
