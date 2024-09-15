'use client';

import { signInWithGoogle } from '@/libs/firebase/index'; // index.tsから関数をインポート
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Image from 'next/image';
import youDoLog from '../../public/google_login/AlphaC_Googleligin_image.svg';
import { getUID } from '@/libs/firebase/auth';

import { getDisplayName } from '@/libs/firebase/auth';

import { useUserData } from '@/components/features/use-cookies/useUserData';

type User = {
	id: number;
	name: string;
	uuid: string;
	gender: string;
	birthday: string;
	survey_file_name: string;
	task_completed_count: number;
	image_url: number;
	params1: number;
	params2: number;
	login_at: string;
	created_at: string;
};

export default function Home() {
	const { setUserData } = useUserData();

	// APIgetの関数
	const get_user_data = async (uid: string): Promise<User> => {
		return new Promise((resolve, reject) => {
			const url = `api/user/${uid}`;
			try {
				fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}).then(async res => {
					const contentType = res.headers.get('content-type');
					if (!res.ok) {
						const statusCode = res.status;
						if (!contentType || !contentType.includes('application/json')) {
							throw new Error("Oops, we haven't got JSON!");
						}
						switch (statusCode) {
							case 400:
								throw new Error('Bad Request');
							case 401:
								throw new Error('Unauthorized');
							case 404:
								throw new Error('Not Found');
							case 500:
								throw new Error('Internal Server Error');
							default:
								throw new Error('Unknown Error');
						}
					}
					const data = await res.json();
					resolve(data.user);
				});
			} catch (error) {
				alert('P1ユーザー情報取得中に、エラーが発生しました。');
				reject(null);
			}
		});
	};

	// API_post
	const post_user_data = async (uuid: string, name: string): Promise<User> => {
		return new Promise((resolve, reject) => {
			const url = `api/user/`;
			const obj = {
				uuid: uuid,
				name: name,
				gender: 'm',
				birthday: '2000-01-01T00:00:00.000Z',
			};

			try {
				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(obj),
				}).then(async res => {
					if (!res.ok) {
						const statusCode = res.status;
						switch (statusCode) {
							case 400:
								throw new Error('Bad Request');
							case 500:
								throw new Error('Internal Server Error');
							default:
								throw new Error('Unknown Error');
						}
					}
					const data = await res.json(); //okだった時の処理
					resolve(data.user);
				});
			} catch (error) {
				alert('エラーが発生しました。');
				reject(null);
			}
		});
	};

	const router = useRouter();
	const [loading, setLoading] = useState(false); // ローディング状態を管理

	// Googleログイン処理
	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
			const signInResult = await signInWithGoogle();

			if (!signInResult) return;

			if (signInResult.isNewUser) {
				// ユーザー登録を行うAPI
				const user_uid = await getUID();
				const display_name = await getDisplayName();
				if (typeof user_uid === 'string' && typeof display_name === 'string') {
					// API呼び出し
					const user_data = await post_user_data(user_uid, display_name);
					if (!user_data) {
						alert('P3ユーザー情報の取得に失敗しました。');
						return;
					}
					setUserData(user_data.id, user_data.name, user_data.uuid);
					router.push('/top-task'); // 初回登録情報入力ページに遷移
				} else {
					alert('P2ユーザー情報の取得に失敗しました。');
					return;
				}
			} else {
				// ユーザー情報を取得するAPI
				const user_uid = await getUID();
				if (typeof user_uid === 'string') {
					// API呼び出し
					const user_data = await get_user_data(user_uid);
					if (!user_data) {
						alert('P3ユーザー情報の取得に失敗しました。');
						return;
					}
					setUserData(user_data.id, user_data.name, user_data.uuid);
					router.push('/top-task'); // 初回登録情報入力ページに遷移
					// ここに次の処理を書ける
				} else {
					alert('P4ユーザー情報の取得に失敗しました。');
					return;
				}
			}
		} catch (error) {
			console.error('Google Sign-In Error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
			{/* ロゴセクション */}
			<div className="mb-8">
				<Image src={youDoLog} alt="Logo" className="w-32 h-32" />
			</div>

			{/* Googleログインボタン */}
			<button
				onClick={handleGoogleSignIn}
				disabled={loading} // ローディング中はボタンを無効化
				className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 disabled:opacity-50"
			>
				<span className="text-gray-700">
					{loading ? 'ログイン中...' : 'Googleログイン'}
				</span>
			</button>
		</div>
	);
}
// ユーザー登録確認関数（例）
async function checkUserRegistration(email: string): Promise<boolean> {
	// ここで実際のユーザー登録確認のロジックを実装
	// データベースの確認などの処理
	//
	return true; // 仮の値として false を返す
}
