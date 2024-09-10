import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const ProfileBtn = () => {
	return (
		<Button className="p-0 w-[78px] h-[78px]">
			<Image src={'/icons/profile.svg'} width={36} height={36} alt="profile" />
		</Button>
	);
};

export default ProfileBtn;
