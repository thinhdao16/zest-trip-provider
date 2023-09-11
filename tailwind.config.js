/** @type {import('tailwindcss').Config} */
export const content =[
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ]
export const theme = {
	extend: {
		fontFamily: {
			'sans': ['Ubuntu', 'sans-serif'],
		},
		colors: {
			"primary-marine-blue": '#02295a',
			'primary-purplish-blue': '#473dff',
			'primary-pastel-blue': '#adbeff',
			'primary-light-blue': '#bfe2fd',
			'primary-starberry-red': '#ed3548',
			'neutral-cool-gray': '#9699ab',
			'neutral-light-gray': '#d6d9e6',
			'neutral-magnolia': '#f0f6ff',
			'neutral-alabaster': '#fafbff'
		},
		backgroundImage: {
			'sidebar-image-mobile': "url('../public/assets/images/bg-sidebar-mobile.svg')",
			'sidebar-image-desktop': "url('../public/assets/images/bg-sidebar-desktop.svg')"
		}
	},
};
export const plugins = [];
