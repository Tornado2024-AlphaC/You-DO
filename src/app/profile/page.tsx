'use client';
import React from 'react';

const Profile = () => {
	return (
		<main>
			<button onClick={() => window.history.back()} className="text-blue-500">
				戻る
			</button>
			<h1>Profile</h1>
		</main>
	);
};

export default Profile;
