import type { RecursiveKeyValuePair } from "tailwindcss/types/config";
import * as tColors from "tailwindcss/colors";
import type { DefaultColors } from "tailwindcss/types/generated/colors";

type TailwindColors = RecursiveKeyValuePair<string, string>;

export const colors = {
	...Object.keys(tColors)
	.filter(key => !key.match(/[a-z]+[A-Z][a-z]+/))
	.reduce((cur, key) => Object.assign(cur, {[key]: tColors[key as keyof DefaultColors]}), {}) as DefaultColors,
	"torch-red": {
		hex: "#F71835",
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
		hex: "#394041",
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
	'blue-violet': {
		hex: '#4d4def',
		base: 'hsla(240, 84%, 62%, 1)',
		50: 'hsla(223, 100%, 96%, 1)',
		100: 'hsla(222, 100%, 94%, 1)',
		200: 'hsla(224, 100%, 88%, 1)',
		300: 'hsla(225, 100%, 81%, 1)',
		400: 'hsla(231, 100%, 74%, 1)',
		500: 'hsla(235, 93%, 67%, 1)',
		600: 'hsla(240, 84%, 62%, 1)',
		700: 'hsla(241, 65%, 51%, 1)',
		800: 'hsla(240, 61%, 41%, 1)',
		900: 'hsla(238, 53%, 34%, 1)',
		950: 'hsla(240, 53%, 20%, 1)',
	},
	'malachite': {
		hex: '#00c753',
		base: 'hsla(145, 100%, 39%, 1)',
		50: 'hsla(141, 100%, 97%, 1)',
		100: 'hsla(144, 100%, 92%, 1)',
		200: 'hsla(143, 100%, 85%, 1)',
		300: 'hsla(144, 100%, 73%, 1)',
		400: 'hsla(144, 91%, 58%, 1)',
		500: 'hsla(145, 92%, 45%, 1)',
		600: 'hsla(145, 100%, 39%, 1)',
		700: 'hsla(145, 95%, 29%, 1)',
		800: 'hsla(145, 84%, 24%, 1)',
		900: 'hsla(146, 81%, 20%, 1)',
		950: 'hsla(147, 100%, 10%, 1)',
	},
	white: "hsla(345, 100%, 99%, 1)",
	black: "hsla(60, 50%, 1%, 1)",
	current: "currentColor",
} as const satisfies TailwindColors;