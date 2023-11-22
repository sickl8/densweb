<script lang="ts">
	import { assetsDir } from "$lib/utils";
	import path from "path-browserify";
	import creationsData from "src/routes/creations/creations.json";
	// import DashTitle from "../DashTitle.svelte";
	import { SvelteComponent, onMount } from "svelte";
	import _ from "lodash";
	import gsap from "gsap-trial";
    import normalizeWheel from "normalize-wheel";
    import { SmoothScroll } from "$lib/smoothScrollTo";
    // import { ScrollSnap } from "$lib/scrollSnap";

	export let carousel: HTMLElement;
	export let component: any;
	export let scrollAmount: number;
	console.log({scrollAmount})
	// let carouselScroll = 0;

	export let data: any[] = [];

	let currentData: typeof data = [];
	export let itemsVisible = 5;

	$: {
		for (let i = 0; i < (itemsVisible + data.length); i++) {
			currentData.push(data[i % data.length]);
		}
	}

	function handleWheel(event: WheelEvent) {
		let norm = normalizeWheel(event);
		// console.log(norm, _.pick(event, ["deltaX", "deltaY"]));
		if (!event.shiftKey) {
			// event.
			window.dispatchEvent(new WheelEvent("wheel", _.pick(event, ["deltaX", "deltaY", "deltaMode", "deltaZ"])));
		}
	}
	let ll = 0;
	function handleScroll(event: Event) {
		if (!carousel) return;
		let scroll = carousel.scrollLeft;
		// console.log({scroll, delta: scroll - ll})
		// ll = scroll;
		// let scrollTo: ScrollToOptions = { left: 0 };
		// if (scroll < (minScroll - 2)) {
		// 	scrollTo = {left: maxScroll - (minScroll - scroll)};
		// 	carousel.scrollTo(scrollTo)
		// }
		// else if (scroll > (maxScroll + 2)) {
		// 	scrollTo = {left: minScroll + (scroll - maxScroll)};
		// 	carousel.scrollTo(scrollTo)
		// }
	}

	let maxScroll = 0;
	let minScroll = 0;
	
	let content: HTMLElement;
	let lastCarouselScroll = -1;
	function animateElements() {
		if (!carousel) return;
		let carouselScroll = carousel.scrollLeft;
		if (carouselScroll !== lastCarouselScroll) {
			let visibleElements = carouselElements.filter(el => {
				let offsetFromParentVP = el.offsetLeft - carouselScroll;
				return (offsetFromParentVP + 1 < carousel.offsetWidth && offsetFromParentVP + el.offsetWidth > 1);
			});
			let calcs = visibleElements.map(li => {
				let img = li.children[0].children[0];
				let redImg = img.children[0];
				let offsetFromParentVP = li.offsetLeft - carouselScroll;
				let offsetMiddle = offsetFromParentVP + li.offsetWidth / 2 - carousel.offsetWidth / 2;
				return { img, redImg, li, offsetMiddle, offset: offsetMiddle };
			});
			let correction = calcs.map(i => i.offsetMiddle).filter(i => i > -1 && i < 1);
			calcs = calcs.map((calc) => {
				let { offsetMiddle } = calc;
				return { ...calc, offset: Math.abs(offsetMiddle - (correction[0] || 0)) };
			})
			let scaleData = [1, 0.8, 0.8, 0.8];
			let opacityData = [0, 1, 1, 1];
			calcs.forEach(calc => {
				let {offset, img, redImg, li} = calc;
				const itemWidth = carouselElements[0].offsetWidth;
				for (let i = 0; i < scaleData.length - 1; i++) {
					if (offset < (i + 1) * itemWidth) {
						const getPropertyValueFromOffset = (ar: number[]) => {
							return ar[i] * (1 - (offset % itemWidth) / itemWidth) + ar[i + 1] * ((offset % itemWidth) / itemWidth)
						}
						let scale = getPropertyValueFromOffset(scaleData);
						let opacity = getPropertyValueFromOffset(opacityData);
						let ease = "power4.out", duration = 0;
						gsap.to(img, {
							scale,
							duration,
							ease,
						})
						gsap.to(redImg, {
							opacity,
							duration,
							ease,
						})
						break;
					}
				}
			})
			lastCarouselScroll = carouselScroll;
		}
		requestAnimationFrame(animateElements);
	}
	let smooth: SmoothScroll;
	onMount(() => {
		smooth = new SmoothScroll({
			scrollable: carousel,
			direction: "horizontal",
			scrollAmount,
		})
		// smooth.onScroll(({velocity, scroll}) => {
		// 	// console.log(d);
		// 	if (velocity === 0) {
		// 		const itemWidth = carouselElements[0].offsetWidth;
		// 		let closestOffset = Math.round(scroll / itemWidth) * itemWidth;
		// 		console.log({closestOffset, scroll, delta: closestOffset - scroll});
		// 		// smooth.scrollTo(closestOffset);
		// 	}
		// })
		minScroll = 0;
		maxScroll = carousel.scrollWidth;
		console.log({minScroll, maxScroll})
		animateElements();
	})
	
	let carouselElements: HTMLElement[] = [];

</script>

<div class="relative w-full flex flex-col items-center">
	{#each [">", "<"] as d, i}
	<button class="bg-white text-black p-2 absolute z-10 {i ? "left-0" : "right-0"} [@media(min-width:500px)]:mx-[5%] top-0 -[50%] h-full opacity-100 [@media(hover:none)]:inline-block hidden drop-shadow-[0px_0px_20px_white]" on:click={() => {
		smooth.scrollTo(-scrollAmount * (i * 2 - 1));
	}}>{d}</button>
	{/each}
	<div class="-wrapper relative w-full --max-w-7xl overflow-x-hidden flex justify-center" style="max-width: {scrollAmount * itemsVisible}px;">
		<div class="-carousel-container -wr w-fit">
			<ul class="-carousel relative overflow-x-scroll --w-[80rem] flex" style="width: {scrollAmount * itemsVisible}px"
			bind:this={carousel}
			data-lenis-prevent
			on:scroll={handleScroll}
			on:wheel={handleWheel}
			>
				<!-- data-lenis-prevent -->
				{#each currentData as el, index}
					<svelte:component this={component} data={el} {index} {carouselElements}></svelte:component>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="postcss">
	.-carousel {
		touch-action: pan-y;
	}
	.-wrapper {
		--cr-msk-inline-shade: 10%;
		--cr-msk-inline-trsprt: 10%;
		mask-image: linear-gradient(
				90deg,
				transparent				calc(0% + var(--cr-msk-inline-shade)),
				rgba(0, 0, 0, 1) calc(var(--cr-msk-inline-shade) + var(--cr-msk-inline-trsprt)),
				rgba(0, 0, 0, 1) calc(100% - (var(--cr-msk-inline-shade) + var(--cr-msk-inline-trsprt))),
				transparent				calc(100% - var(--cr-msk-inline-shade))
			);
	}
</style>