/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						a : {
							color: '#337ab7',
							textDecoration: 'none'
						},
						code: {
							backgroundColor: theme('colors.slate.200'),
							borderRadius: theme('borderRadius.DEFAULT'),
							paddingTop: theme('spacing.[0.5]'),
							paddingBottom: theme('spacing.[0.5]'),
							paddingLeft: theme('spacing.[1.5]'),
							paddingRight: theme('spacing.[1.5]'),
							fontWeight: 'normal',
							letterSpacing: 'normal',
						},
						'code::before': {
							content: 'none',
						},
						'code::after': {
							content: 'none',
						},
					},
				},
			}),
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
