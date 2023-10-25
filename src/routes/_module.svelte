<script lang="ts">
	import Particles from "../components/Particles.svelte";
	import Navbar from "../components/NavBar.svelte";
	import gsap from "gsap-trial";
	import ScrollTrigger from "gsap-trial/ScrollTrigger";
	import ScrollSmoother from "gsap-trial/ScrollSmoother";
	import { onMount } from "svelte";

	// @ts-ignore
	gsap.config({ trialWarn: false });
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	onMount(() => {
		ScrollSmoother.create({
			effects: true,
			smooth: 1,
		});
	});
</script>

<Particles />
<Navbar />
<div id="smooth-wrapper">
	<div id="smooth-content">
		<main class="">
			<slot />
		</main>
	</div>
</div>
