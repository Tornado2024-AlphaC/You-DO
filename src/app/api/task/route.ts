import { NextResponse } from 'next/server';
import spabase from '@/libs/spabase';

type Request = {
	user_id: string;
	title: string;
	limit_time: string;
	parent_id: number | null;
	available_break: boolean;
	expectation: number;
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

	const body: Request = await req.json();

	//いずれかのパラメータが不正な場合はエラー（簡易的なもの）
	if (
		!body.user_id ||
		!body.title ||
		!body.limit_time ||
		!body.hasOwnProperty('parent_id') ||
		!body.available_break ||
		!body.expectation
	) {
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
		title: body.title,
		limit_time: body.limit_time,
		parent_id: body.parent_id,
		available_break: body.available_break,
		duration: 0,
		expectation: body.expectation,
		urgency: 0,
		firstexpect: 0,
		progress: 0,
		priority: 1,
		skip_count: 0,
	};

	try {
		const { data, error } = await spabase
			.from('sample-Task')
			.insert([insertObj])
			.select();
		if (error) {
			throw error;
		}
		return NextResponse.json({
			task: data[0],
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
