<script lang="ts">
	import { assetsDir, remsToPixels } from "$lib/utils";
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

	let data = creationsData.map(el => ({
		url: path.join("/creations", el.name),
		img: path.join(assetsDir, "creations", el.name, el.img)
	}))

	let visibleElements: HTMLElement[] = []
	let offsetsFromMiddle: {
		img: Element;
		redImg: Element;
		li: HTMLElement;
		offsetMiddle: number;
		offset: number;
		xOffsetMiddle: number;
	}[] = [];
	function animateElements(carousel: HTMLElement, carouselElements: HTMLElement[], lastCarouselScroll: number) {
		try {
		if (!carousel) return;
		let carouselScroll = carousel.scrollLeft;
		if (carouselScroll !== lastCarouselScroll) {
			visibleElements = carouselElements.filter(el => {
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
			const itemWidth = carouselElements[0].offsetWidth;
			calcs = calcs.map((calc) => {
				let { offsetMiddle } = calc;
				return { ...calc, offset: Math.abs(offsetMiddle - (correction[0] || 0)) };
			})
			offsetsFromMiddle = calcs.map(x => ({...x, xOffsetMiddle: (x.offsetMiddle - (correction[0] || 0)) / itemWidth }));
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
		} catch {}
		requestAnimationFrame(() => { animateElements(carousel, carouselElements, lastCarouselScroll) });
	}

	let carouselParts: {
		carousel: HTMLElement[];
		carouselElements: HTMLElement[];
	} = {
		carousel: [],
		carouselElements: [],
	}

	$: {
		// console.log({offsetsFromMiddle})
	}

	onMount(() => {
		try {
			console.log({carouselParts});
			// @ts-ignore
			let smooth: SmoothScroll = carouselParts.carousel[0].__smooth;
			carouselParts.carouselElements.forEach(el => {
				el.firstChild?.firstChild?.addEventListener("click", (e) => {
					let idx = visibleElements.indexOf(el);
					if (idx !== -1) {
						let { xOffsetMiddle } = offsetsFromMiddle[idx];
						let ntimes = Math.round(xOffsetMiddle);
						if (ntimes)
							e.preventDefault();
						smooth.scrollNtimes(ntimes);
					}
				})
			})
		} catch {}
	})

</script>

<section class="w-full min-h-[calc(100svh)] pt-[5rem] flex flex-col items-center justify-start" id="work">
	<div class="flex flex-col w-full gap-12 items-center">
		<DashTitle words={["Our", "Creations"]} class="px-4 max-w-[67.5rem] --max-w-5xl --max-w-[80%] self-center"/>
		<Carousel {carouselParts} animateElements={animateElements} {data} component={CreationsCarouselElement} options={{scrollAmount: remsToPixels(16)}}/>
		<div class="-spacer"></div>
	</div>
</section>
