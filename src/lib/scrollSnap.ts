// <script lang="ts">
// 	import { assetsDir } from "$lib/utils";
// 	import path from "path-browserify";
// 	import creationsData from "src/routes/creations/creations.json";
// 	import DashTitle from "../DashTitle.svelte";
// 	import { onMount } from "svelte";
// 	import _ from "lodash";
// 	import gsap from "gsap-trial";
//     import Lenis from "@studio-freight/lenis";
//     import { colors } from "$lib/tailwind";
//     import { ScrollSnap } from "$lib/scrollSnap";

// 	let carousel: HTMLElement;
// 	// let carouselScroll = 0;

// 	let data = creationsData.map(el => ({
// 		url: path.join("/creations", el.name),
// 		img: path.join(assetsDir, "creations", el.name, el.img)
// 	}))

// 	let currentData: typeof data = [];
// 	const itemsVisible = 5;

// 	$: {
// 		for (let i = 0; i < (itemsVisible + data.length); i++) {
// 			currentData.push(data[i % data.length]);
// 		}
// 	}

// 	function handleWheel(event: WheelEvent) {
// 		if (!event.shiftKey) {
// 			window.dispatchEvent(new WheelEvent("wheel", _.pick(event, ["deltaX", "deltaY"])));
// 		}
// 	}
// 	function handleScroll(event: Event) {
// 		if (!carousel) return;
// 		let scroll = carousel.scrollLeft;
// 		let scrollTo: ScrollToOptions = { left: 0 };
// 		if (scroll < (minScroll - 2)) {
// 			scrollTo = {left: maxScroll - (minScroll - scroll)};
// 			carousel.scrollTo(scrollTo)
// 		}
// 		else if (scroll > (maxScroll + 2)) {
// 			scrollTo = {left: minScroll + (scroll - maxScroll)};
// 			carousel.scrollTo(scrollTo)
// 		}
// 	}

// 	let maxScroll = 0;
// 	let minScroll = 0;
	
// 	let content: HTMLElement;
// 	let lastCarouselScroll = -1;
// 	function animateElements() {
// 		if (!carousel) return;
// 		let carouselScroll = carousel.scrollLeft;
// 		if (carouselScroll !== lastCarouselScroll
// 		&& carouselScroll
// 		) {
// 			let visibleElements = carouselElements.filter(el => {
// 				let offsetFromParentVP = el.offsetLeft - carouselScroll;
// 				return (offsetFromParentVP + 1 < carousel.offsetWidth && offsetFromParentVP + el.offsetWidth > 1);
// 			});
// 			let calcs = visibleElements.map(li => {
// 				let img = li.children[0].children[0];
// 				let redImg = img.children[0];
// 				let offsetFromParentVP = li.offsetLeft - carouselScroll;
// 				let offsetMiddle = offsetFromParentVP + li.offsetWidth / 2 - carousel.offsetWidth / 2;
// 				return { img, redImg, li, offsetMiddle, offset: offsetMiddle };
// 			});
// 			let correction = calcs.map(i => i.offsetMiddle).filter(i => i > -1 && i < 1);
// 			calcs = calcs.map((calc) => {
// 				let { offsetMiddle } = calc;
// 				return { ...calc, offset: Math.abs(offsetMiddle - (correction[0] || 0)) };
// 			})
// 			let scaleData = [1, 0.8, 0.8, 0.8];
// 			let opacityData = [0, 1, 1, 1];
// 			calcs.forEach(calc => {
// 				let {offset, img, redImg, li} = calc;
// 				const itemWidth = carouselElements[0].offsetWidth;
// 				for (let i = 0; i < scaleData.length - 1; i++) {
// 					if (offset < (i + 1) * itemWidth) {
// 						const getPropertyValueFromOffset = (ar: number[]) => {
// 							return ar[i] * (1 - (offset % itemWidth) / itemWidth) + ar[i + 1] * ((offset % itemWidth) / itemWidth)
// 						}
// 						let scale = getPropertyValueFromOffset(scaleData);
// 						let opacity = getPropertyValueFromOffset(opacityData);
// 						let ease = "power4.out", duration = 0;
// 						gsap.to(img, {
// 							scale,
// 							duration,
// 							ease,
// 						})
// 						gsap.to(redImg, {
// 							opacity,
// 							duration,
// 							ease,
// 						})
// 						break;
// 					}
// 				}
// 			})
// 			lastCarouselScroll = carouselScroll;
// 		}
// 		requestAnimationFrame(animateElements);
// 	}
// 	onMount(() => {
// 		const lenis = new Lenis({
// 			orientation: "horizontal",
// 			gestureOrientation: "horizontal",
// 			wrapper: carousel,
// 			content,
// 			infinite: true,
// 		});

// 		function raf(time: number) {
// 			lenis.raf(time)
// 			requestAnimationFrame(raf)
// 		}

// 		requestAnimationFrame(raf)

// 		lenis.on("scroll", (e: any) => {
// 			const itemWidth = carouselElements[0].offsetWidth;
// 			if (e.velocity === 0 && e.animatedScroll % itemWidth) {
// 				// console.log(JSON.stringify(e, undefined, 4));
// 				console.log(e);
// 				let opt = { offset: Math.round((e.animatedScroll % e.dimensions.width) / itemWidth) * itemWidth };
// 				let sAmount = itemWidth - (Math.round((e.animatedScroll % e.dimensions.width) / itemWidth) * itemWidth) - e.animatedScroll
// 				console.log({newOffset: opt.offset, animatedScroll: e.animatedScroll,});
// 				lenis.scrollTo("left", opt);
// 				// console.log(sAmount, {a: e.animatedScroll + sAmount});
// 				// lenis.scrollTo(e.animatedScroll + (Math.round(e.animatedScroll / itemWidth) * itemWidth - (itemWidth / 2)))
// 				// lenis.scrollTo(sAmount)
// 			}
// 		})
// 		// new ScrollSnap(lenis, {snapType: "mandatory"});

// 		// let offset = 6;
// 		// minScroll = carouselElements[offset].offsetLeft + (carouselElements[offset].offsetWidth - carousel.offsetWidth) / 2;
// 		// maxScroll = minScroll + data.length * carouselElements[0].offsetWidth;
// 		minScroll = 0;
// 		maxScroll = carousel.scrollWidth;
// 		console.log({minScroll, maxScroll})
// 		// handleScroll(new Event("scroll"));
// 		// animateElements();
// 	})
	
// 	let carouselElements: HTMLElement[] = [];
// </script>

// <section class="w-full min-h-[calc(100svh-5rem)] flex flex-col items-center justify-start">
// 	<div class="flex flex-col w-full gap-12 items-center">
// 		<DashTitle words={["Our", "Creations"]} class="px-2 max-w-[67.5rem] --max-w-5xl --max-w-[80%] self-center"/>
// 		<div class="-wrapper -carousel relative overflow-x-scroll max-w-7xl w-full"
// 			bind:this={carousel}
// 		>
// 			<ul class="--carousel  --overflow-x-scroll --w-full min-w-fit --max-w-7xl --gap-12 flex"
// 			bind:this={content}
// 			>
// 			<!-- data-lenis-prevent -->
// 				<!-- on:wheel={handleWheel}
// 				on:scroll={handleScroll} -->
// 				<!-- data-lenis-prevent -->
// 				{#each currentData as el, index}
// 					<li class="-items --snap-center scale-100 i{index % 2}" data-scroll-snap-align="center" bind:this={carouselElements[index]}>
// 						<a href={el.url} class="-creation-link">
// 							<div class="-picture overflow-hidden relative w-[16rem] max-w-[85vw] aspect-[2/3] bg-center bg-no-repeat bg-cover rounded-[4px]" style="background-image: url({el.img});">
// 								<div class="-picture-red overflow-hidden w-full h-full rounded-[4px] bg-torch-red-base" style="mix-blend-mode: darken;">
// 								</div>
// 							</div>
// 						</a>
// 					</li>
// 				{/each}
// 			</ul>
// 		</div>
// 		<div class="-spacer"></div>
// 	</div>
// </section>

// <style lang="postcss">
// 	.-carousel {
// 		/* touch-action: pan-y; */
// 		--cr-msk-inline-shade: 10%;
// 		--cr-msk-inline-trsprt: 10%;
// 		/* mask-image: linear-gradient(
// 				90deg,
// 				transparent				calc(0% + var(--cr-msk-inline-shade)),
// 				rgba(0, 0, 0, 1) calc(var(--cr-msk-inline-shade) + var(--cr-msk-inline-trsprt)),
// 				rgba(0, 0, 0, 1) calc(100% - (var(--cr-msk-inline-shade) + var(--cr-msk-inline-trsprt))),
// 				transparent				calc(100% - var(--cr-msk-inline-shade))
// 			); */
// 	}
// </style>
