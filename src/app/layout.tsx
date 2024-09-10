import type { Metadata } from 'next';
import { M_PLUS_1p } from 'next/font/google';
import './globals.css';

const mplus1p = M_PLUS_1p({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'You-DO',
	description: '"今"やるべきことが分かるタスク管理アプリ',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/pwa/manifest.json" />
				<link rel="apple-touch-icon" href="/pwa/icon512_maskable.png"></link>
				<meta name="theme-color" content="#ED5E59" />
			</head>
			<body className={mplus1p.className}>{children}</body>
		</html>
	);
}
