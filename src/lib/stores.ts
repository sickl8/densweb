import Lenis from "@studio-freight/lenis";
import { writable } from "svelte/store";

export let sideBarIsOn = writable(false);
export let navData = writable([
	{ text: "Our Work", path: "/", selector: "#work" },
	{ text: "Services", path: "/", selector: "#services" },
	{ text: "About Us", path: "/", selector: "#about" },
	{ text: "Contact Us", path: "/", selector: "#contact" },
]);
export let scrollVelocity = writable(0);
export let windowSmoothScroll = writable<Lenis>();

export let serviceCardWidthInRems = writable<number>(30);