import { NextResponse } from 'next/server';
import spabase from '@/libs/spabase';

type PostRequest = {
	user_id: number;
	type: string;
	start_time: string;
	end_time: string;
};

export async function POST(req: any) {
	if (!req.body) {
		return NextResponse.json(
			{
				status: 400,
				message: 'Bad Request',
			},
			{ status: 400 }
		);
	}

	const body: PostRequest = await req.json();

	if (!body.user_id || !body.type || !body.start_time || !body.end_time) {
		return NextResponse.json(
			{
				status: 400,
				message: 'Bad Request',
			},
			{ status: 400 }
		);
	}

	const insertObj = {
		user_id: body.user_id,
		type: body.type,
		start_time: body.start_time,
		end_time: body.end_time,
		duration: 0,
	};

	try {
		const { data, error } = await spabase
			.from('sample-Schedule')
			.insert([insertObj])
			.select();
		if (error) {
			throw error;
		}
		return NextResponse.json({
			schedule: data[0],
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
