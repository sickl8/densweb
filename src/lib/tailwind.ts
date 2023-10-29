import type { RecursiveKeyValuePair } from "tailwindcss/types/config";
import * as tColors from "tailwindcss/colors";
import type { DefaultColors } from "tailwindcss/types/generated/colors";

type TailwindColors = RecursiveKeyValuePair<string, string>;

Object.keys(tColors).forEach((key) => {
	if (key.match(/[a-z]+[A-Z][a-z]+/)) {
		delete tColors[key as keyof DefaultColors];
	}
})

export const colors = {
	...tColors,
	"torch-red": {
		base: "hsla(352, 93%, 53%, 1)",
		50: "hsla(352, 100%, 97%, 1)",
		100: "hsla(351, 100%, 94%, 1)",
		200: "hsla(352, 100%, 88%, 1)",
		300: "hsla(352, 100%, 80%, 1)",
		400: "hsla(352, 100%, 68%, 1)",
		500: "hsla(352, 100%, 58%, 1)",
		600: "hsla(352, 93%, 53%, 1)",
		700: "hsla(352, 95%, 42%, 1)",
		800: "hsla(352, 90%, 35%, 1)",
		900: "hsla(352, 81%, 31%, 1)",
		950: "hsla(351, 97%, 15%, 1)",
	},
	"cape-cod": {
		base: "hsla(187, 7%, 24%, 1)",
		50: "hsla(180, 5%, 96%, 1)",
		100: "hsla(168, 10%, 90%, 1)",
		200: "hsla(180, 10%, 82%, 1)",
		300: "hsla(180, 10%, 69%, 1)",
		400: "hsla(180, 9%, 53%, 1)",
		500: "hsla(180, 10%, 43%, 1)",
		600: "hsla(183, 10%, 36%, 1)",
		700: "hsla(184, 9%, 31%, 1)",
		800: "hsla(186, 7%, 27%, 1)",
		900: "hsla(187, 7%, 24%, 1)",
		950: "hsla(190, 8%, 15%, 1)",
	},
	white: "hsla(345, 100%, 99%, 1)",
	black: "hsla(60, 50%, 1%, 1)",
	current: "currentColor",
} as const satisfies TailwindColors;