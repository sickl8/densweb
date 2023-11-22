
export const assetsDir = "/assets";

export const remsToPixels = (rems: number) => {
	return rems * parseFloat(getComputedStyle(document.documentElement).fontSize);
}