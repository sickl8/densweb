import { type Config } from "tailwindcss";
import { colors } from "./src/lib/tailwind";

export default {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./index.html"
	],
	theme: {
		extend: {
			colors
		}
	},
	plugins: [],
} satisfies Config;