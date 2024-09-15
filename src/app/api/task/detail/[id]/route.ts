import { NextResponse } from 'next/server';
import spabase from '@/libs/spabase';

type Task = {
	id: number;
	user_id: number;
	title: string;
	limit_time: string;
	parent_id: number;
	available_break: boolean;
	duration: number;
	expectation: number;
	urgency: number;
	firstexpect: number;
	progress: number;
	priority: number;
	skip_count: number;
	created_at: string;
	updated_at: string;
};

export async function GET(_: any, { params }: { params: { id: string } }) {
	if (!params.id) {
		return NextResponse.json(
			{
				status: 400,
				message: 'Bad Request',
			},
			{ status: 400 }
		);
	}
	const id = Number(params.id);
	if (isNaN(id)) {
		return NextResponse.json(
			{
				status: 400,
				message: 'Bad Request',
			},
			{ status: 400 }
		);
	}
	try {
		const { data, error } = await spabase
			.from('sample-Task')
			.select('*')
			.eq('id', id);
		if (error) {
			throw error;
		}
		if (data.length === 0) {
			return NextResponse.json(
				{
					status: 404,
					message: 'Data not found',
				},
				{ status: 404 }
			);
		}
		if (data.length > 1) {
			return NextResponse.json(
				{
					status: 500,
					message: 'Internal Server Error',
				},
				{ status: 500 }
			);
		}
		const task: Task = data[0];
		return NextResponse.json({
			task,
		});
	} catch (error) {
		return NextResponse.json(
			{
				status: 500,
				message: 'Internal Server Error',
			},
			{ status: 500 }
		);
	}
}
