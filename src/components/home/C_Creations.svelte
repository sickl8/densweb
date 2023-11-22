<script lang="ts">
	import { assetsDir } from "$lib/utils";
	import path from "path-browserify";
	import creationsData from "src/routes/creations/creations.json";
	import DashTitle from "../DashTitle.svelte";
	import { onMount } from "svelte";
	import _ from "lodash";
	import gsap from "gsap-trial";
    import normalizeWheel from "normalize-wheel";
    import { SmoothScroll } from "$lib/smoothScrollTo";
    import Carousel from "../Carousel.svelte";
    import CreationsCarouselElement from "../CreationsCarouselElement.svelte";
    // import { ScrollSnap } from "$lib/scrollSnap";

	let carousel: HTMLElement;
	// let carouselScroll = 0;

	let data = creationsData.map(el => ({
		url: path.join("/creations", el.name),
		img: path.join(assetsDir, "creations", el.name, el.img)
	}))

</script>

<section class="w-full -min-h-[calc(100svh-5rem)] flex flex-col items-center justify-start">
	<div class="flex flex-col w-full gap-12 items-center">
		<DashTitle words={["Our", "Creations"]} class="px-2 max-w-[calc(0.8*64rem)] --max-w-5xl --max-w-[80%] self-center"/>
		<Carousel bind:carousel={carousel} {data} component={CreationsCarouselElement} scrollAmount={256}/>
		<div class="-spacer"></div>
	</div>
</section>
