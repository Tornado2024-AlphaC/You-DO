import { useCookies } from 'react-cookie';

export const useUserData = () => {
	const [cookies, setCookie] = useCookies([
		'yodo_user_id',
		'yodo_user_name',
		'yodo_uid',
	]);

	// ユーザーデータをCookieに保存
	const setUserData = (user_id: number, user_name: string, uid: string) => {
		setCookie('yodo_user_id', user_id, { path: '/', sameSite: 'strict' });
		setCookie('yodo_user_name', user_name, { path: '/', sameSite: 'strict' });
		setCookie('yodo_uid', uid, { path: '/', sameSite: 'strict' });
	};

	// ユーザーデータをCookieから取得
	const getUserData = () => {
		return {
			user_id: cookies.yodo_user_id,
			user_name: cookies.yodo_user_name,
			uid: cookies.yodo_uid,
		};
	};

	// ユーザーデータをCookieから削除
	const removeUserData = () => {
		setCookie('yodo_user_id', '', { path: '/', maxAge: 0 });
		setCookie('yodo_user_name', '', { path: '/', maxAge: 0 });
		setCookie('yodo_uid', '', { path: '/', maxAge: 0 });
	};

	return { setUserData, getUserData, removeUserData };
};
