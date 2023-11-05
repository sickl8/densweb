<script lang="ts">
	import { assetsDir } from "$lib/utils";
	import path from "path-browserify";
	import creationsData from "src/routes/creations/creations.json";
	import { windowSmoothScroll } from "$lib/stores";
	import DashTitle from "../DashTitle.svelte";

	let scrollContainer: HTMLDivElement, scrollContent: HTMLDivElement;

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

	function handleWheel(event: WheelEvent) {
		if (!event.shiftKey) {
			let wheelEvent = new WheelEvent("wheel", {
				deltaX: event.deltaX,
				deltaY: event.deltaY,
			})
			window.dispatchEvent(wheelEvent);
		}
	}
</script>

<section class="w-full min-h-[calc(100svh-5rem)] px-2 flex flex-col items-center justify-start">
	<div class="flex flex-col w-full max-w-5xl">
		<DashTitle words={["Our", "Creations"]} class="max-w-[80%] self-center"/>
		<button on:click={() => { carouselIndex++}}>+</button>
		<button on:click={() => { carouselIndex--}}>-</button>
		<div class="-container overflow-x-scroll w-[1000px] max-w-full" data-lenis-prevent bind:this={scrollContainer} on:wheel={handleWheel}>
			<div class="-carousel inline-flex gap-12 overflow-x-scroll" bind:this={scrollContent}>
				{#each currentData as el, index}
					<a href={el.url} class="-creation-{index} -creation-pos-{Math.abs(index - ((currentData.length - 1) / 2))}">
						<div class="-picture w-[12rem] max-w-[85vw] aspect-[2/3] bg-center bg-no-repeat bg-cover rounded-[4px]" style="background-image: url({el.img});">
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

