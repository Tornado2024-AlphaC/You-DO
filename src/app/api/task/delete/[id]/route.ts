import { NextResponse } from 'next/server';
import spabase from '@/libs/spabase';

export async function DELETE(_: any, { params }: { params: { id: string } }) {
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
		const { error } = await spabase.from('sample-Task').delete().eq('id', id);
		if (error) {
			throw error;
		}
		return NextResponse.json(
			{
				status: 200,
				message: 'Success',
			},
			{ status: 200 }
		);
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
