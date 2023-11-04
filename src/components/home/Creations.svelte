<script lang="ts">
    import { assetsDir } from "$lib/utils";
	import path from "path-browserify";
	import creationsData from "src/routes/creations/creations.json";
	import { onMount } from "svelte";
	import Lenis from "@studio-freight/lenis";

	let scrollContainer: HTMLDivElement, scrollContent: HTMLDivElement;
	let scroll = 0;

	$: console.log("scroll = " + scroll.toString())

	onMount(() => {
		// const lenis = new Lenis({
		// 	smoothTouch: true,
		// 	touchMultiplier: 4,
		// 	touchInertiaMultiplier: 0,
		// 	wrapper: scrollContainer,
		// 	content: scrollContent,
		// 	orientation: "horizontal",
		// });
	
		// lenis.on("scroll", (e: any) => {
		// });
		// function raf(time: number) {
		// 	lenis.raf(time);
		// 	requestAnimationFrame(raf);
		// }
		// requestAnimationFrame(raf);
	});

	let data = creationsData.map(el => ({
		url: path.join("/creations", el.name),
		img: path.join(assetsDir, "creations", el.name, el.img)
	}))

	let carouselIndex = 0;
	let currentData: typeof data = [];
	const itemsVisible = 5;

	$: {
		carouselIndex = (carouselIndex + data.length) % data.length;
		currentData = [];
		for (let i = 0; i < (itemsVisible + 2); i++) {
			let index = (carouselIndex + i) % data.length;
			currentData.push(data[index]);
		}
	}
</script>

<button on:click={() => { carouselIndex++}}>+</button>
<button on:click={() => { carouselIndex--}}>-</button>
<div class="-container overflow-scroll w-[1000px] max-w-full" data-lenis-prevent bind:this={scrollContainer} on:scroll={(e) => {
	console.log("blaaaaaaaaa")
	scroll = e.currentTarget.scrollLeft
	// if (scroll > 1300) {
	// 	e.currentTarget.scrollTo({left: 0});
	// }
}} on:wheel={(e) => {
	console.log({e});
}}>
	<div class="-carousel inline-flex gap-12 overflow-scroll scroll-smooth" bind:this={scrollContent}>
		{#each currentData as el, index}
			<a href={el.url} class="-creation-{index} -creation-pos-{Math.abs(index - ((currentData.length - 1) / 2))}">
				<div class="-picture w-[18rem] max-w-[85vw] aspect-[2/3] bg-center bg-no-repeat bg-cover" style="background-image: url({el.img});">
				</div>
			</a>
		{/each}
	</div>
</div>

