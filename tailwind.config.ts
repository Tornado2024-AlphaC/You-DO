import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},

				// Figmaデザイン指定色
				white: {
					primary: '#FDFDFD',
					secondary: '#333',
					tertiary: '#eee',
					quaternary: '#555',
					quinary: '#888',
				},
				red: {
					primary: '#DE4F65',
					secondary: '#FFD4DD',
					tertiary: '#BB4559',
					quaternary: '#552D34',
				},
				orange: {
					primary: '#DE654F',
					secondary: '#FFDFD5',
					tertiary: '#C35340',
					quaternary: '#55362D',
				},
				yellow: {
					primary: '#E0BA4B',
					secondary: '#FFF1D4',
					tertiary: '#C69B44',
					quaternary: '#55482D',
				},
				green: {
					primary: '#4DD463',
					secondary: '#D3FFDF',
					tertiary: '#4EAC6A',
					quaternary: '#2D553A',
				},
				sky: {
					primary: '#4DD4D2',
					secondary: '#D2FEFF',
					tertiary: '#35B0A8',
					quaternary: '#2D5554',
				},
				blue: {
					primary: '#4785E2',
					secondary: '#D4DDFF',
					tertiary: '#4E72AC',
					quaternary: '#334476',
				},
				purple: {
					primary: '#AB4BE0',
					secondary: '#EED3FF',
					tertiary: '#8A4EAC',
					quaternary: '#462D55',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
