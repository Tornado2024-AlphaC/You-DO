import { Button } from '@/components/ui/button';
import React from 'react';
import NewTaskBtn from './NewTaskBtn';
import ProfileBtn from './FooterBtns';

const Footer = () => {
	return (
		<div className="z-30 absolute bottom-0 wOrigin">
			<div className="flex justify-center items-center bg-white py-4">
				<ProfileBtn />
				<NewTaskBtn />
			</div>
		</div>
	);
};

export default Footer;
