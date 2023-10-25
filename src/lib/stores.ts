import { writable } from "svelte/store";

export let sideBarIsOn = writable(false);
export let navData = writable(
	[
		{ text: "Our Work", path: "/", selector: "#work" },
		{ text: "Services", path: "/", selector: "#services" },
		{ text: "About Us", path: "/", selector: "#about" },
		{ text: "Contact Us", path: "/", selector: "#contact" },
	]
)