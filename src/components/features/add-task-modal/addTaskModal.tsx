'use client';
import { useState } from 'react';

import DescriptionIcon from '@mui/icons-material/Description';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const AddTaskModal = () => {
	const [taskName, setTaskName] = useState('');
	return (
		<div>
			<div className="flex flex-col gap-2">
				<div>
					<input
						type="text"
						id="taskName"
						value={taskName}
						placeholder="タスク名を追加"
						className="outline-none text-lg"
						onChange={e => setTaskName(e.target.value)}
					/>
				</div>
				<hr />
				<div className="flex flex-row gap-3">
					<p className="text-lg">
						<DescriptionIcon />
					</p>
					<p className="text-lg">アイコンを変更</p>
				</div>
				<hr />
				<div className="flex flex-row gap-3">
					<p className="text-lg">
						<ColorLensIcon />
					</p>
					<p className="text-lg">アイコン色を変更</p>
				</div>
				<hr />
				<div className="flex flex-row gap-3">
					<p className="text-lg">
						<EventAvailableIcon />
					</p>
					<p className="text-lg">納期を設定</p>
				</div>
				<div className="flex flex-row gap-3">
					<input type="date" />
					<input type="time" />
				</div>
				<hr />
			</div>
		</div>
	);
};

export default AddTaskModal;
