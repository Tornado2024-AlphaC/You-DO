'use client'

import { signInWithGoogle } from "@/libs/firebase/index"; // index.tsから関数をインポート
import { useRouter } from 'next/navigation'
import { useState } from "react";


export default function Home() {
	const router = useRouter()
	const [loading, setLoading] = useState(false); // ローディング状態を管理
	
	// Googleログイン処理
	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
		const user = await signInWithGoogle();
	
		if (!user) return;
	
		// ここでユーザーが登録済みかどうかを確認する処理
		const isUserRegistered = await checkUserRegistration(user.email as string);
	
		if (isUserRegistered) {
			router.push("/login-after"); // ログイン後のページに遷移
		} else {
			router.push("/input-info"); // 初回登録情報入力ページに遷移
		}
		} catch (error) {
		console.error("Google Sign-In Error:", error);
		} finally {
		setLoading(false);
		}
	};
	
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
		{/* ロゴセクション */}
		<div className="mb-8">
			<img
			src="/path/to/your/logo.png" // ロゴのパス
			alt="Logo"
			className="w-32 h-32"
			/>
		</div>
	
		{/* Googleログインボタン */}
		<button
			onClick={handleGoogleSignIn}
			disabled={loading} // ローディング中はボタンを無効化
			className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 disabled:opacity-50"
		>
			<img
			src="/path/to/google-icon.png" // Googleアイコンのパス
			alt="Google"
			className="w-6 h-6 mr-2"
			/>
			<span className="text-gray-700">
			{loading ? "ログイン中..." : "Googleでログイン"}
			</span>
		</button>
		</div>
	);
};
// ユーザー登録確認関数（例）
async function checkUserRegistration(email: string): Promise<boolean> {
  // ここで実際のユーザー登録確認のロジックを実装
  // データベースの確認などの処理
  return false; // 仮の値として false を返す
}
