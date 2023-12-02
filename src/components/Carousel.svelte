<script lang="ts">
	import { assetsDir } from "$lib/utils";
	import path from "path-browserify";
	import creationsData from "src/routes/creations/creations.json";
	// import DashTitle from "../DashTitle.svelte";
	import { SvelteComponent, onMount } from "svelte";
	import _ from "lodash";
	import gsap from "gsap-trial";
    import normalizeWheel from "normalize-wheel";
    import { SmoothScroll, type SmoothScrollOptions } from "$lib/smoothScrollTo";
    import { twMerge } from "tailwind-merge";
    // import { ScrollSnap } from "$lib/scrollSnap";

	let Class = "";
	export { Class as class }
	let carousel: HTMLElement;
	let carouselElements: HTMLElement[];
	export let component: any;
	export let carouselParts: {
		carousel: HTMLElement[];
		carouselElements: HTMLElement[];
	} = {
		carousel: [],
		carouselElements: [],
	}

	export let data: any[] = [];
	export let options: Omit<Partial<SmoothScrollOptions>, "scrollable"> & { scrollAmount: number };

	let currentData: typeof data = [];
	export let maxItemsVisible = 5;

	$: {
		for (let i = 0; i < (maxItemsVisible + data.length); i++) {
			currentData.push(data[i % data.length]);
		}
	}

	function handleWheel(event: WheelEvent) {
		// let norm = normalizeWheel(event);
		// console.log(norm, _.pick(event, ["deltaX", "deltaY"]));
		if (!event.shiftKey) {
			// event.
			window.dispatchEvent(new WheelEvent("wheel", _.pick(event, ["deltaX", "deltaY", "deltaMode", "deltaZ"])));
		}
	}
	
	function handleScroll(event: Event) {
		if (!carousel) return;
		let scroll = carousel.scrollLeft;
	}

	let maxScroll = 0;
	let minScroll = 0;
	
	let content: HTMLElement;

	export let animateElements: (carousel: HTMLElement, carouselElements: HTMLElement[], lastCarouselScroll: number) => void = () => {};
	export let maskImageElementIndex = 2;
	
	let smooth: SmoothScroll;
	onMount(() => {
		carousel = carouselParts.carousel[0];
		carouselElements = carouselParts.carouselElements;
		carouselParts.carousel[maskImageElementIndex].classList.add("__mask-image");
		smooth = new SmoothScroll({
			scrollable: carousel,
			direction: "horizontal",
			...options
		})
		// @ts-ignore
		carousel.__smooth = smooth;
		minScroll = 0;
		maxScroll = carousel.scrollWidth;
		console.log({minScroll, maxScroll})
		animateElements(carousel, carouselElements, -1);
	})

</script>

<div bind:this={carouselParts.carousel[3]} class="-root relative w-full flex flex-col items-center {Class} []">
	<!-- {#each [">", "<"] as d, i}
	<button class="rounded bg-white text-black p-2 absolute z-10 {i ? "left-0" : "right-0"} [@media(min-width:500px)]:mx-[5%] top-0 -[50%] h-full opacity-100 [@media(hover:none)]:inline-block hidden drop-shadow-[0px_0px_20px_white]" on:click={() => {
		smooth.scrollTo(-options.scrollAmount * (i * 2 - 1));
	}}>{d}</button>
	{/each} -->
	<div bind:this={carouselParts.carousel[2]} class="-wrapper relative w-full --max-w-7xl overflow-x-hidden flex justify-center" style="max-width: {options.scrollAmount * maxItemsVisible}px;">
		<div bind:this={carouselParts.carousel[1]} class="-carousel-container -wr w-fit">
			<ul class="-carousel relative overflow-x-scroll --w-[80rem] flex" style="width: {options.scrollAmount * maxItemsVisible}px"
			bind:this={carouselParts.carousel[0]}
			on:scroll={handleScroll}
			on:wheel={handleWheel}
			data-lenis-prevent
			>
				<!-- data-lenis-prevent -->
				{#each currentData as el, index}
					<svelte:component this={component} data={el} {index} carouselElements={carouselParts.carouselElements}></svelte:component>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="postcss">
	.-carousel {
		touch-action: pan-y;
	}
	:global(.__mask-image) {
		--mskshade: var(--msk-shade, 10%);
		--msktrprt: var(--msk-transparent, 10%);
		mask-image: linear-gradient(
				90deg,
				transparent				calc(0% + var(--mskshade)),
				rgba(0, 0, 0, 1) calc(var(--mskshade) + var(--msktrprt)),
				rgba(0, 0, 0, 1) calc(100% - (var(--mskshade) + var(--msktrprt))),
				transparent				calc(100% - var(--mskshade))
			);
	}
</style>