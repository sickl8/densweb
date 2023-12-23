
export const assetsDir = "/assets";

export const remsToPixels = (rems: number) => {
	return rems * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function roundingFunc(num: number, by = 4) {
	return Math.round(num * by) / by;
}

export type CreationData = {
	name: string
	display_name: string
	img: string
	hero_img: string;
	about_the_project: string;
	about_img: string;
	sm_left_img: string;
	sm_middle_img: string;
	sm_right_img: string;
	banner_img: string;
	misc: string[];
}