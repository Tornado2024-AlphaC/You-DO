/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
	dest: 'public',
	register: true,
	skipWaiting: true,

	// 開発中のみ非表示
	disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
	reactStrictMode: true,
});

export default nextConfig;
