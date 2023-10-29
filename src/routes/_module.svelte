<script lang="ts">
	import Particles from "../components/Particles.svelte";
	import Navbar from "../components/NavBar.svelte";
	import { onMount } from "svelte";
	import Lenis from "@studio-freight/lenis";
	import { scrollVelocity } from "$lib/stores";

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

	onMount(() => {});
</script>

<Particles />
<Navbar />
<main class="w-full h-full">
	<slot />
</main>