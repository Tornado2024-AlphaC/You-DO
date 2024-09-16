import { NextResponse } from 'next/server';
import spabase from '@/libs/spabase';
import { color } from 'framer-motion';

type Request = {
	user_id: string;
	title: string;
	limit_time: string;
	parent_id: number | null;
	available_break: boolean;
	expectation: number;
	icon: string;
	color: string;
};

type PutRequest = {
	id: number;
	user_id: number;
	title: string;
	limit_time: string;
	parent_id: number | null;
	available_break: boolean;
	duration: number;
	expectation: number;
	progress: number;
	priority: number;
	skip_count: number;
	icon: string;
	color: string;
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

	console.log('body: ' + JSON.stringify(body));

	//いずれかのパラメータが不正な場合はエラー（簡易的なもの）
	if (
		!body.user_id ||
		!body.title ||
		!body.limit_time ||
		!body.hasOwnProperty('parent_id') ||
		!body.available_break ||
		!body.expectation
	) {
		console.log('API: いずれかの値がありません。');
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
		firstexpect: body.expectation,
		progress: 0,
		priority: 1,
		skip_count: 0,
		icon: body.icon,
		color: body.color,
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

export async function PUT(req: any) {
	if (!req.body) {
		return NextResponse.json(
			{
				status: 400,
				message: 'Bad Request',
			},
			{ status: 400 }
		);
	}

	const body: PutRequest = await req.json();

	//いずれかのパラメータが不正な場合はエラー（簡易的なもの）
	if (
		!body.hasOwnProperty('id') ||
		!body.hasOwnProperty('user_id') ||
		!body.hasOwnProperty('title') ||
		!body.hasOwnProperty('limit_time') ||
		!body.hasOwnProperty('parent_id') ||
		!body.hasOwnProperty('available_break') ||
		!body.hasOwnProperty('duration') ||
		!body.hasOwnProperty('expectation') ||
		!body.hasOwnProperty('progress') ||
		!body.hasOwnProperty('priority') ||
		!body.hasOwnProperty('skip_count')
	) {
		return NextResponse.json(
			{
				status: 400,
				message: 'Bad Request',
			},
			{ status: 400 }
		);
	}

	const updateObj = {
		id: body.id,
		user_id: body.user_id,
		title: body.title,
		limit_time: body.limit_time,
		parent_id: body.parent_id,
		available_break: body.available_break,
		duration: body.duration,
		expectation: body.expectation,
		progress: body.progress,
		priority: body.priority,
		skip_count: body.skip_count,
		color: body.color,
		icon: body.icon
	};

	try {
		const { data, error } = await spabase
			.from('sample-Task')
			.update(updateObj)
			.eq('id', body.id)
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
