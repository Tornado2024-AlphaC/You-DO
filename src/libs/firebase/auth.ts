import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from './index';

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	try {
		await signInWithPopup(auth, provider);
	} catch (e) {
		console.log(e);
	}
};

export const logout = (): Promise<void> => {
	return signOut(auth);
};

// uid を取得する（非同期関数を呼ぶので、Promiseで囲っている）
export const getUID = async () => {
	return new Promise((resolve, reject) => {
		auth.onAuthStateChanged(user => {
			if (user) {
				resolve(user.uid);
			} else {
				reject('No user is logged in');
			}
		});
	});
};

// 表示名 を取得する（非同期関数を呼ぶので、Promiseで囲っている）
export const getDisplayName = async () => {
	return new Promise((resolve, reject) => {
		auth.onAuthStateChanged(user => {
			if (user) {
				resolve(user.displayName);
			} else {
				reject('No user is logged in');
			}
		});
	});
};
