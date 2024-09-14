'use client'

import { auth, signInWithGoogle } from "@/libs/firebase/index"; // index.tsから関数をインポート
import { useRouter } from 'next/navigation'
import { useState } from "react";

import Image from 'next/image';
import youDoLog from '../../public/google_login/AlphaC_Googleligin_image.svg';
import { getUID } from "@/libs/firebase/auth";
import { userAgent } from "next/server";

import { getDisplayName } from "@/libs/firebase/auth";


export default function Home() {
	// APIgetの関数
	const get_user_data = async (uid:string) => {
		return new Promise((resolve, reject) => {
		// console.log("関数内の"+uid)
		const url = `api/user/${uid}`;
		// console.log("送るリクエスト"+url)
		try {
		  fetch(url, {
			method: "GET",
			headers: {
			  "Content-Type": "application/json",
			},
		  }).then(async (res) => {
			const contentType = res.headers.get("content-type");
			if (!res.ok) {
			  const statusCode = res.status;
			  if (!contentType || !contentType.includes("application/json")) {
				throw new Error("Oops, we haven't got JSON!");
			  }
			  switch (statusCode) {
				case 400:
				  console.log("400のエラーが出ました。")
				  throw new Error("Bad Request");
				case 401:
				  console.log("401のエラーが出ました。")
				  throw new Error("Unauthorized");
				case 404:
				  console.log("404のエラーが出ました。")
				  throw new Error("Not Found");
				case 500:
				  console.log("500のエラーが出ました。")
				  throw new Error("Internal Server Error");
				default:
				  console.log("その他のエラーが出ました。")
				  throw new Error("Unknown Error");
			  }
			}
			const data = await res.json();
			console.log("このユーザーのuserid"+data.user.id)
			resolve(data.user);
		  });
		} catch (error) {
		  alert("P1ユーザー情報取得中に、エラーが発生しました。");
		  console.log(error);
		  reject(null);
		}
	  });
	}

	// API_post
	const post_user_data = async (uuid:string,name:string) => {
		return new Promise((resolve, reject) => {
			const url = `api/user/`;
			//TODO: userNameとformNameを渡せるようにAPIを変更する
			const obj = {
			"uuid": uuid,
			"name": name,
			"gender": "m",
			"birthday": "2000-01-01T00:00:00.000Z"
			};
		
			try {
			fetch(url, {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(obj),
			}).then(async (res) => {
				if (!res.ok) {
				const statusCode = res.status;
				switch (statusCode) {
					case 400:
					throw new Error("Bad Request");
					case 500:
					throw new Error("Internal Server Error");
					default:
					throw new Error("Unknown Error");
				}
				}
				const data = await res.json();//okだった時の処理
				console.log("このユーザーのuserid"+data.user.id)
				resolve(data.user);
			});
			} catch (error) {
			alert("エラーが発生しました。");
			console.log(error);
			reject(null);
			}
	  });
	}



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
			// console.log("isUserRegistered == True")
			// ユーザー登録を行うAPI
			console.log("新規登録")
			const user_uid = await getUID();
			const display_name = await getDisplayName();
			if (typeof user_uid === "string" && typeof display_name === "string") {
				// API呼び出し
				const user_data = await post_user_data(user_uid, display_name); 
				if (!user_data){
					alert("P3ユーザー情報の取得に失敗しました。")
					console.log(user_data)
					return
				}
				// const user_data = await get_user_data(user_uid); あとで実装
				// console.log("user_uidは、"+user_uid)
				router.push("/top-task"); // 初回登録情報入力ページに遷移
				// ここに次の処理を書ける
			  } else {
				alert("P2ユーザー情報の取得に失敗しました。");
				return
			}

		} else {
			// console.log("isUserRegistered == Folse")
			// ユーザー情報を取得するAPI
			console.log("ログイン")
			const user_uid = await getUID();
			if (typeof user_uid === 'string') {
				// uidがstring型の場合のみ次の処理に進む
				// console.log("user_uidは、"+user_uid)
				// API呼び出し
				const user_data = await get_user_data(user_uid);
				if (!user_data){
					alert("P3ユーザー情報の取得に失敗しました。")
					// console.log(user_data)
					return
				}
				// console.log("userのnameは、"+JSON.stringify(user_data))
				router.push("/top-task"); // 初回登録情報入力ページに遷移
				// ここに次の処理を書ける
			  } else {
				alert("P4ユーザー情報の取得に失敗しました。");
				return
			}
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
			<Image src={youDoLog} alt="Logo" className="w-32 h-32" />
		</div>
	
		{/* Googleログインボタン */}
		<button
			onClick={handleGoogleSignIn}
			disabled={loading} // ローディング中はボタンを無効化
			className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 disabled:opacity-50"
		>

			<span className="text-gray-700">
			{loading ? "ログイン中..." : "Googleログイン"}
			</span>
		</button>
		</div>
	);
};
// ユーザー登録確認関数（例）
async function checkUserRegistration(email: string): Promise<boolean> {
  // ここで実際のユーザー登録確認のロジックを実装
  // データベースの確認などの処理
//   
  return true; // 仮の値として false を返す
}
