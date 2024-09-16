import Image from 'next/image';
import React from 'react';

// アイコン名を取得する
interface IconProps {
	iconRoute?: string;
	iconName: string;
	size: number;
}
const Icon = ({ iconRoute, iconName, size }: IconProps) => {
	return (
		// アイコン名を取得してImageタグでアイコンを出力するコンポーネント
		<div>
			<Image
				src={iconRoute ? `/${iconRoute}/${iconName}.svg` : `/${iconName}.svg`}
				alt={iconName}
				width={size}
				height={size}
				className="m-2"
			/>
		</div>
	);
};

export default Icon;
