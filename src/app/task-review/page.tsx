'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './TaskReview.css';
import Image from 'next/image';
import youDoLog1 from '../../../public/task-review_img/Ellipse 27.svg';
import youDoLog2 from '../../../public/task-review_img/Vector-1.svg';
import youDoLog3 from '../../../public/task-review_img/Vector.svg';

const TaskReview: React.FC = () => {
	const router = useRouter(); // useRouterフックを使ってrouterオブジェクトを取得
	const [progress, setProgress] = useState(10);
	const [satisfaction, setSatisfaction] = useState<number | null>(3); // 満足度（0: 悪い, 1: 普通, 2: 良い, 3:とても良い）

	const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProgress(parseInt(event.target.value, 10));
	};

	const handleSatisfactionChange = (value: number) => {
		setSatisfaction(value);
	};

	const handleNextTask = () => {
		// 次のタスクのページへ遷移
		router.push('/task-review');
	};

	return (
		<main>
			<div className="container">
				<div className="task-completion-screen">
					{/* <h1 className="screen-title">空き時間終了画面</h1> */}
					<div className="task-info">
						<div className="task-icon">
							<Image src={youDoLog1} alt="Logo" className="image1" />
							<Image src={youDoLog2} alt="Logo" className="image2" />
							<Image src={youDoLog3} alt="Logo" className="image3" />
						</div>
						<h2 className="task-name">タスク名: abc123</h2>
					</div>

					<div className="progress-section">
						<label htmlFor="progress">タスクの進捗は？</label>
						<input
							type="range"
							id="progress"
							name="progress"
							min="0"
							max="100"
							value={progress}
							onChange={handleProgressChange}
						/>
						<span>{progress}%</span>
					</div>

					<div className="satisfaction-section">
						<label>タスクの満足度は？</label>
						<div className="satisfaction-options">
							{['😞', '😐', '😊', '😄'].map((emoji, index) => (
								<button
									key={index}
									className={`satisfaction-button ${satisfaction === index ? 'selected' : ''}`}
									onClick={() => handleSatisfactionChange(index)}
								>
									{emoji}
								</button>
							))}
						</div>
					</div>

					<button className="next-task-button" onClick={handleNextTask}>
						次のタスクへ
					</button>
				</div>
			</div>
		</main>
	);
};

export default TaskReview;

// import React from 'react';

// const TaskReview = () => {
// 	return (
// 		<main>
// 			<h1>TaskReview</h1>
// 		</main>
// 	);
// };

// export default TaskReview;
