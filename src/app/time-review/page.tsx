"use client";
import React from 'react';
import './TimeReview.css';
import { useRouter } from 'next/navigation';

const TimeReview: React.FC = () => {
	const router = useRouter(); 
	const change_time_button = () => {
		// 次のタスクのページへ遷移
		router.push("/daily-schedule"); 
	};
	const end_time_button = () => {
		// 次のタスクのページへ遷移
		router.push("/top-task"); 
	};
	return (
		<div className="container">
		<div className="header">
			<div className="celebration-icon">🎉</div>
			<h2>タスクを〇個消化できました！</h2>
		</div>
		<div className="satisfaction">
			<p>空き時間の満足度は？</p>
			<div className="emoji-container">
			<button className="emoji-button">😡</button>
			<button className="emoji-button">😟</button>
			<button className="emoji-button ">😊</button>
			<button className="emoji-button">😐</button>
			</div>
		</div>
		<div className="next-time">
			<p>次の空き時間は…</p>
			<p>〇月〇日(〇)・00:00 ～</p>
		</div>
		<div className="buttons">
			<button className="change-time-button" onClick={change_time_button}>空き時間を変更する</button>
			<button className="end-time-button" onClick={end_time_button}>空き時間を終了する</button>
		</div>
		</div>
	);
};

export default TimeReview;



// import React from 'react';

// const TimeReview = () => {
// 	return (
// 		<main>
// 			<h1>TimeReview</h1>
// 		</main>
// 	);
// };

// export default TimeReview;
