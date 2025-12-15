/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				l: {
					bg: '#fafafa',
					text: '#595959',
					from: '#f5f7fa',
					to: '#e4eaf5'
				},
				d: {
					asd: '#39424d', // 注意：在 Tailwind 中直接使用 'dark' 前缀可能不会生效，因为 Tailwind 处理暗黑模式的方式与 UnoCSS 不同。
					text: '#fff',
					from: '#1D2129',
					to: '#2c3e50'
				}
			},
		},
	},
	darkMode: "class",
}

