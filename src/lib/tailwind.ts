import type { RecursiveKeyValuePair } from "tailwindcss/types/config";

type TailwindColors = RecursiveKeyValuePair<string, string>;

export const colors = {
	"torch-red": {
		base: "hsl(352, 93%, 53%)",
		50: "hsl(352, 100%, 97%)",
		100: "hsl(351, 100%, 94%)",
		200: "hsl(352, 100%, 88%)",
		300: "hsl(352, 100%, 80%)",
		400: "hsl(352, 100%, 68%)",
		500: "hsl(352, 100%, 58%)",
		600: "hsl(352, 93%, 53%)",
		700: "hsl(352, 95%, 42%)",
		800: "hsl(352, 90%, 35%)",
		900: "hsl(352, 81%, 31%)",
		950: "hsl(351, 97%, 15%)",
	},
	"cape-cod": {
		base: "hsl(187, 7%, 24%)",
		50: "hsl(180, 5%, 96%)",
		100: "hsl(168, 10%, 90%)",
		200: "hsl(180, 10%, 82%)",
		300: "hsl(180, 10%, 69%)",
		400: "hsl(180, 9%, 53%)",
		500: "hsl(180, 10%, 43%)",
		600: "hsl(183, 10%, 36%)",
		700: "hsl(184, 9%, 31%)",
		800: "hsl(186, 7%, 27%)",
		900: "hsl(187, 7%, 24%)",
		950: "hsl(190, 8%, 15%)",
	},
	white: "hsl(345, 100%, 99%)",
	black: "hsl(60, 50%, 1%)",
	current: "currentColor",
} as const satisfies TailwindColors;