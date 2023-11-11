<script lang="ts">
	import Particles from "../components/Particles.svelte";
	import Navbar from "../components/NavBar.svelte";
	import { scrollVelocity, windowSmoothScroll } from "$lib/stores";
	import { onMount } from "svelte";
	import Lenis from "@studio-freight/lenis";


	onMount(() => {
		if ("ontouchstart" in window === false) {
			const lenis = new Lenis({
				// smoothTouch: true,
				// touchMultiplier: 4,
				// touchInertiaMultiplier: 0,
			});
			windowSmoothScroll.set(lenis);
			lenis.on("scroll", (e: any) => {
				// console.log("v = " + e.velocity.toString());
				scrollVelocity.set(e.velocity);
			});
			function raf(time: number) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}
			requestAnimationFrame(raf);
		}
	});
	let lastSet = performance.now();
	let lastScrollY = 0;
	let scrollY = 0;
	$: {
		if ("ontouchstart" in window) {
			let now = performance.now();
			let velocity = now === lastSet ? 0 : (scrollY - lastScrollY) / (now - lastSet);
			lastScrollY = scrollY;
			// console.log("v = " + velocity.toString());
			// scrollVelocity.set()
			lastSet = performance.now();
		}
	}
</script>

<svelte:window bind:scrollY={scrollY}></svelte:window>

<div class="-global-wrapper overflow-hidden">
	<Particles />
	<Navbar />
	<main class="w-full h-full">
		<slot />
	</main>
</div>