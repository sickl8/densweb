<script lang="ts">
    import { serviceCardWidthInRems, serviceCardWidthInRemsDefault } from "$lib/stores";
    import { remsToPixels } from "$lib/utils";
    import Carousel from "../Carousel.svelte";
    import DashTitle from "../DashTitle.svelte";
    import IntersectingCircles from "../IntersectingCircles.svg.svelte";
	import gsap from "gsap-trial";
    import ServicesCarouselElement from "../ServicesCarouselElement.svelte";
    import { onMount } from "svelte";
    import type { SmoothScroll } from "$lib/smoothScrollTo";
	type Service = { domain: string; skills: string[] };
	import servicesJson from "./services.json";

	let _services: Service[] = servicesJson;
	// [
	// 	{
	// 		domain: "visuals",
	// 		skills: [
	// 			"branding",
	// 			"2D animation",
	// 			"3D animation",
	// 			"motion design",
	// 			"video editing",
	// 			"character design",
	// 			"3D modeling",
	// 		],
	// 	},
	// 	{
	// 		domain: "sound",
	// 		skills: [
	// 			"branding",
	// 			"2D animation",
	// 			"3D animation",
	// 			"motion design",
	// 			"video editing",
	// 			"character design",
	// 			"3D modeling",
	// 		],
	// 	},
	// 	{
	// 		domain: "video0",
	// 		skills: [
	// 			"branding",
	// 			"2D animation",
	// 			"3D animation",
	// 			"motion design",
	// 			"video editing",
	// 			"character design",
	// 			"3D modeling",
	// 		],
	// 	},
	// ];

	let data = _services;

	let visibleElements: HTMLElement[] = [];

	function animateElements(carousel: HTMLElement, carouselElements: HTMLElement[], lastCarouselScroll: number) {
		if (!carousel) return;
		let carouselScroll = carousel.scrollLeft;
		if (carouselScroll !== lastCarouselScroll) {
			// console.log({carousel, carouselElements});
			visibleElements = carouselElements.filter(el => {
				let offsetFromParentVP = el.offsetLeft - carouselScroll;
				return (offsetFromParentVP + 1 < carousel.offsetWidth && offsetFromParentVP + el.offsetWidth > 1);
			});
			let calcs = visibleElements.map(li => {
				let offsetFromParentVP = li.offsetLeft - carouselScroll;
				let offsetMiddle = offsetFromParentVP + li.offsetWidth / 2 - carousel.offsetWidth / 2;
				return { li, offsetMiddle, offset: offsetMiddle };
			});
			let correction = calcs.map(i => i.offsetMiddle).filter(i => i > -1 && i < 1);
			calcs = calcs.map((calc) => {
				let { offsetMiddle } = calc;
				return { ...calc, offset: Math.abs(offsetMiddle - (correction[0] || 0)) };
			})
			let scaleData = [1, 0.8, 0.8, 0.8];
			let blurData = [0, 3, 3, 3];
			calcs.forEach(calc => {
				let { offset, li } = calc;
				const itemWidth = carouselElements[0].offsetWidth;
				for (let i = 0; i < scaleData.length - 1; i++) {
					if (offset < (i + 1) * itemWidth) {
						const getPropertyValueFromOffset = (ar: number[]) => {
							return ar[i] * (1 - (offset % itemWidth) / itemWidth) + ar[i + 1] * ((offset % itemWidth) / itemWidth)
						}
						let scale = getPropertyValueFromOffset(scaleData);
						let blur = getPropertyValueFromOffset(blurData);
						let ease = "power4.out", duration = 0;
						gsap.to(li, {
							scale,
							filter: `blur(${blur}px)`,
							duration,
							ease,
						})
						break;
					}
				}
			})
			lastCarouselScroll = carouselScroll;
		}
		requestAnimationFrame(() => animateElements(carousel, carouselElements, lastCarouselScroll));
	}
	let carouselParts: { carousel: HTMLElement[], carouselElements: HTMLElement[] } = {
		carouselElements: [],
		carousel: [],
	}

	onMount(() => {
		// @ts-ignore
		let smooth: SmoothScroll = carouselParts.carousel[0].__smooth;
		let outer = carouselParts.carousel[carouselParts.carousel.length - 1];
		outer.addEventListener("click", (e) => {
			if (e.clientX < outer.clientWidth / 2) {
				smooth.scrollRight();
			}
			else {
				smooth.scrollLeft();
			}
		})
	})
	let width = 0;
	$: {
		console.log({width})
		if (width < 610) {
			$serviceCardWidthInRems = 18
		}
		else {
			$serviceCardWidthInRems = serviceCardWidthInRemsDefault;
		}
	}
</script>

<section class="w-full min-h-[calc(100svh)] pt-[5rem] flex flex-col items-center justify-start" bind:clientWidth={width} id="services">
<div class="flex flex-col w-full gap-12 items-center">
	<DashTitle words={["Our", "Services"]} class="px-4 max-w-[67.5rem] --max-w-5xl --max-w-[80%] self-center"/>
	<Carousel class="[--msk-shade:15%] [--msk-transparent:10%]" maskImageElementIndex={1} {carouselParts} animateElements={animateElements} {data} component={ServicesCarouselElement} maxItemsVisible={3} options={{scrollAmount: remsToPixels($serviceCardWidthInRems), ease: "power2.inOut", duration: 1}}/>
	<div class="-spacer"></div>
</div>
</section>
