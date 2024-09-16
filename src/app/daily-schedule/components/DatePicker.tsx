import React from 'react';
import { Calendar } from '@/components/ui/calendar';

interface CalendarProps {
	isModal: boolean;
}

const DatePicker = ({ isModal }: CalendarProps) => {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	console.log(isModal);

	return `${
		isModal && (
			<div className="absolute w-full h-screen m-auto">
				<Calendar
					mode="single"
					selected={date}
					onDayClick={setDate}
					showOutsideDays={false}
				/>
			</div>
		)
	}`;
};

export default DatePicker;
