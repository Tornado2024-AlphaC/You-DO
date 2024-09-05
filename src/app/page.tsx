import { TopTask } from '@/constants/routing';
import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<h1>Home</h1>

			<Link href={TopTask} className="text-blue-500">
				今やるタスク画面へ
			</Link>
		</main>
	);
}
