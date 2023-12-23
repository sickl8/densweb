<script lang="ts">
	import { windowSmoothScroll } from "$lib/stores";
	import { remsToPixels } from "$lib/utils";
    import { goto } from "@roxi/routify";
    import Lenis from "@studio-freight/lenis";
    import _ from "lodash";
    import type { HTMLAnchorAttributes } from "svelte/elements";

	export let href: string;
	export let el: HTMLElement | null = null;
	export let click = (e: Event) => {};

	interface $$Props extends Omit<HTMLAnchorAttributes, "href"> {
		href: string;
		el?: HTMLElement | null;
		click?: (e: Event) => any;
	}

	function onClick(e: Event) {
		click(e);
		e.stopPropagation();
		// e.preventDefault();
		// let url = new URL(href, location.href);
		// // if (url.pathname === location.pathname && !el) {
		// // 	console.log("url.pathname === location.pathname && !el:", true, `url.hash.replace("#", ""):`, url.hash.replace("#", ""))
		// // }
		// if (url.pathname !== location.pathname) {
		// 	$goto(url.pathname);
		// }
		// setTimeout(() => {
		// 	if (!el)
		// 		el = document.getElementById(url.hash.replace("#", "") || "home");
		// 	if (el) {
		// 		// console.log("test", {el, sa: { offset: remsToPixels(5) }})
		// 		console.log({el})
		// 		// $windowSmoothScroll.destroy();
		// 		// let lenis = new Lenis({});
		// 		// lenis.resize();
				
		// 		console.log({..._.pick($windowSmoothScroll, "dimensions")})
		// 		// $windowSmoothScroll.resize();
		// 		// $windowSmoothScroll.destroy();
		// 		// setTimeout(() => {
		// 			// $windowSmoothScroll = new Lenis({});
		// 			// console.log({$windowSmoothScroll})
		// 			// setTimeout(() => {
				
		// 		// $windowSmoothScroll.scrollTo(el.offsetTop);
		// 		// debugger
		// 		// @ts-ignore
		// 		window.__lenis.scrollTo(el.offsetTop);
		// 		// 	}, 100);
		// 		// }, 100)
		// 	}
		// }, 100)
	}
</script>

<a {...$$restProps} {href} on:click={onClick} on:mouseenter on:mouseleave>
	<slot/>
</a>