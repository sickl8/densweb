<script lang="ts">
	import Particles from "../components/Particles.svelte";
	import Navbar from "../components/NavBar.svelte";
	import { scrollVelocity } from "$lib/stores";
	import { onMount } from "svelte";
	import Lenis from "@studio-freight/lenis";


	onMount(() => {
		const lenis = new Lenis({
			smoothTouch: true,
			touchMultiplier: 4,
			touchInertiaMultiplier: 0,
		});
	
		lenis.on("scroll", (e: any) => {
			scrollVelocity.set(e.velocity);
		});
		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	});
</script>

<Particles />
<Navbar />
<main class="w-full h-full">
	<slot />
</main>