<script lang="ts">
	import Particles from "../components/Particles.svelte";
	import Navbar from "../components/NavBar.svelte";
	import { scrollVelocity, windowSmoothScroll } from "$lib/stores";
	import { onMount } from "svelte";
	import Lenis from "@studio-freight/lenis";
    import { roundingFunc } from "$lib/utils";
	import _ from "lodash";
    // import { load } from ".routify/components/[...404].svelte";
	function median(values: number[]): number {
		if (values.length === 0) {
			throw new Error('Input array is empty');
		}

		// Sorting values, preventing original array
		// from being mutated.
		values = [...values].sort((a, b) => a - b);

		const half = Math.floor(values.length / 2);

		return (values.length % 2
			? values[half]
			: (values[half - 1] + values[half]) / 2
		);

	}
	let velocity = 0;
	let evelocity = 0;
	onMount(() => {
		console.log("should only run once");
		// if ("ontouchstart" in window === false) return
		const lenis = new Lenis({
			// smoothTouch: true,
			// touchMultiplier: 4,
			// touchInertiaMultiplier: 0,
		});
		windowSmoothScroll.set(lenis);
		// @ts-ignore
		window.__lenis = lenis;
		console.log({..._.pick(lenis, "dimensions")})
		let lastScrollY = 0;
		let scrollY = 0;
		let ltime = 0;
		let ctime = 0;
		lenis.on("scroll", (e: any) => {
			evelocity = e.velocity;
		});
		function raf(time: number) {
			lenis.raf(time);
			ctime = time;
			scrollY = _scrollY;
			const ratio = 15.07;
			velocity = (scrollY - lastScrollY) / (ctime - ltime) * ratio;
			ltime = ctime;
			lastScrollY = scrollY;
			scrollVelocity.set(evelocity || velocity);
			// console.log("v =", evelocity || velocity);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		// console.log({..._.pick(location, ["href"])})
		// if (location.href.match(/#.*$/)) {
		// 	let tmp = location.hash;
		// 	// console.log({tmp});
		// 	// location.href = location.href.replace(/#.*$/, "");
		// 	// console.log({tmp});
		// 	location.hash = "";
		// 	setTimeout(() => {
		// 		location.hash = tmp;
		// 	}, 1000);
		// }
	});
	let _scrollY = 0;
</script>

<svelte:window bind:scrollY={_scrollY}></svelte:window>

<!-- <a href="/#services" on:click={(e) => {
	console.log(
		"clicked new", e,
		", defaultPrevented: ", e.defaultPrevented,
		", bubbles: ", e.bubbles,
		", cp:", e.composedPath()[1],
	);
	console.log(e.composedPath()[1])
	e.stopPropagation()
}}>go to services</a> -->
<Particles />
<Navbar />
<div class="-global-wrapper overflow-hidden">
	<main class="w-full h-full">
		<slot />
	</main>
</div>