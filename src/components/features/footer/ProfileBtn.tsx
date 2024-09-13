import { Button } from '@/components/ui/button';
import { Profile } from '@/constants/routing';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProfileBtn = () => {
	const router = useRouter();

	const handleRoute = () => {
		router.push(Profile);
	};

	return (
		<Button size={'icon'} onClick={handleRoute}>
			<Image src={'/icons/profile.svg'} width={36} height={36} alt="profile" />
		</Button>
	);
};

export default ProfileBtn;
