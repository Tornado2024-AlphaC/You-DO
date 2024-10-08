import React from 'react';
import TaskTimer from '../timer/TaskTimer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

type Props = {
	task_id: number;
	task_title: string;
	task_progress: number;
	limit_time_org: string;
	iconType : string;
	color:string
};

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DescriptionIcon from '@mui/icons-material/Description';

const TaskCard = (props: Props) => {
	const router = useRouter();
	const { task_title, task_progress, limit_time_org,iconType,color} = props;
	const week = ['日', '月', '火', '水', '木', '金', '土'];
	//limit_timeは日付型に変換する
	const limit_time = new Date(limit_time_org);
	const limit_time_str = `${limit_time.getFullYear()}年${limit_time.getMonth() + 1}月${limit_time.getDate()}日(${week[limit_time.getDay()]})・
							${String(limit_time.getHours()).padStart(2,"0")}:${String(limit_time.getMinutes()).padStart(2,"0")}`;
	const dital_page = (task_id: number) => {
		// 次のタスクのページへ遷移
		router.push(`/task-detail/${task_id}`);
	};

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

	const cardClass = classNames(
		'flex flex-col justify-center items-center w-[400px] border-2 border-green-secondary rounded-sm shadow-sm p-3',
		{
			'bg-red-tertiary': color === 'red',
			'bg-orange-tertiary': color === 'orange',
			'bg-yellow-tertiary': color === 'yellow',
			'bg-green-tertiary': color === 'green',
			'bg-sky-tertiary': color === 'sky',
			'bg-blue-tertiary': color === 'blue',
			'bg-purple-tertiary': color === 'purple',
		}
	);

	return (
		<div className={cardClass}>
			<TaskTimer color={'red'} />
			<div className="flex flex-col justify-start items-start w-[380px] text-white-primary">
				<div className="flex items-center max-w-[380px] p-2">
					{/*<Image
						src={'/icons/plus.svg'}
						width={48}
						height={48}
						alt="icon"
						className="p-2 bg-green-secondary rounded-full mr-3"
					/>*/}
					{getIcon(iconType, 48)}
					{task_title}
				</div>
				<div className="flex items-center p-2">
					<Image
						src={'/icons/progress.svg'}
						width={48}
						height={48}
						alt="icon"
						className="p-2 mr-3"
					/>
					<div className="flex flex-row justify-center items-center space-x-[12px]">
						<div className="relative w-[230px] h-3 border-2 border-white-primary bg-white-primary rounded-full">
						<div
						className="absolute top-0 bg-green-tertiary h-[11px]  rounded-full"
						style={{ width: `${task_progress}%` }} // Dynamic width based on progress
					></div>
							{/*<span className="absolute top-0 bg-green-tertiary h-[11px] w-[230px] rounded-full" />*/}
						</div>
						<p>{task_progress}%</p>
					</div>
				</div>
				<div className="flex items-center p-2">
					<Image
						src={'/icons/deadline.svg'}
						width={48}
						height={48}
						alt="icon"
						className="p-2 mr-3"
					/>
					{limit_time_str}
				</div>
			</div>
			<div>
				<Button
					className="px-10 py-2"
					onClick={() => dital_page(props.task_id)}
					// onClick={() => alert('編集ボタンが押されました' + props.task_id)}
				>
					<Image
						src={'icons/edit.svg'}
						width={36}
						height={36}
						alt="edit"
						className="mr-3"
					/>
					詳細へ
				</Button>
			</div>
		</div>
	);
};

export default TaskCard;
