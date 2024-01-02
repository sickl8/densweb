import Lenis from "@studio-freight/lenis";
import { writable } from "svelte/store";

export let sideBarIsOn = writable(false);
export let navData = writable([
	{ text: "Our Work", path: "/", hash: "#work" },
	{ text: "Services", path: "/", hash: "#services" },
	{ text: "About Us", path: "/", hash: "#about" },
	{ text: "Contact Us", path: "/", hash: "#contact" },
]);
export let scrollVelocity = writable(0);
export let windowSmoothScroll = writable<Lenis>();

export const serviceCardWidthInRemsDefault = 30;
export let serviceCardWidthInRems = writable<number>(serviceCardWidthInRemsDefault);