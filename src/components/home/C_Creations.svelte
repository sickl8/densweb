<script lang="ts">
	import { assetsDir } from "$lib/utils";
	import path from "path-browserify";
	import creationsData from "src/routes/creations/creations.json";
	import DashTitle from "../DashTitle.svelte";
	import { onMount } from "svelte";
	import _ from "lodash";
	import gsap from "gsap-trial";
    import Lenis from "@studio-freight/lenis";
    import { colors } from "$lib/tailwind";

	let carousel: HTMLElement;
	// let carouselScroll = 0;

	let data = creationsData.map(el => ({
		url: path.join("/creations", el.name),
		img: path.join(assetsDir, "creations", el.name, el.img)
	}))

	let currentData: typeof data = [];
	const itemsVisible = 5;

	$: {
		for (let i = 0; i < (itemsVisible * 3) / data.length; i++) {
			currentData.push(...data);
		}
	}

	function handleWheel(event: WheelEvent) {
		if (!event.shiftKey) {
			window.dispatchEvent(new WheelEvent("wheel", _.pick(event, ["deltaX", "deltaY"])));
		}
	}
	function handleScroll(event: Event) {
		// console.log("fired handle scroll");
		if (!carousel) return;
		let scroll = carousel.scrollLeft;
		let scrollTo: ScrollToOptions = { left: 0 };
		// console.log({scroll, minScroll, maxScroll});
		if (scroll < (minScroll - 2)) {
			scrollTo = {left: maxScroll - (minScroll - scroll)};
			// console.log(`below, scrolling to ${scrollTo.left}`)
			carousel.scrollTo(scrollTo)
		}
		else if (scroll > (maxScroll + 2)) {
			scrollTo = {left: minScroll + (scroll - maxScroll)};
			// console.log(`above, scrolling to ${scrollTo.left}`)
			carousel.scrollTo(scrollTo)
		}
	}

	let maxScroll = 0;
	let minScroll = 0;
	
	
	let lastCarouselScroll = -1;
	function animateElements() {
		if (!carousel) return;
		let carouselScroll = carousel.scrollLeft;
		if (carouselScroll !== lastCarouselScroll
		&& carouselScroll
		) {
			let visibleElements = carouselElements.filter(el => {
				let offsetFromParentVP = el.offsetLeft - carouselScroll;
				return (offsetFromParentVP + 1 < carousel.offsetWidth && offsetFromParentVP + el.offsetWidth > 1);
			});
			let duration = 0;
			// let data = [{
			// 		percentage: 0.85,
			// 		offset: 0.8,
			// 	}, {
			// 		percentage: 0.75,
			// 		offset: 0.4,
			// 	}, {
			// 		percentage: 1,
			// 		offset: 0,
			// 	},
			// ];
			let carouselConstWidth = parseFloat(getComputedStyle(carousel).maxWidth);
			let calcs = visibleElements.map(li => {
				let img = li.children[0].children[0];
				let redImg = img.children[0];
				let offsetFromParentVP = li.offsetLeft - carouselScroll;
				let offsetMiddle = offsetFromParentVP + li.offsetWidth / 2 - carousel.offsetWidth / 2;
				return { img, redImg, li, offsetMiddle, offset: offsetMiddle };
			});
			let correction = calcs.map(i => i.offsetMiddle).filter(i => i > -1 && i < 1);
			// console.log("----------------")
			calcs = calcs.map((calc) => {
				let { li, img, redImg, offsetMiddle } = calc;
				// console.log({offsetMiddle, crct: offsetMiddle - (correction[0] || 0), minScroll, maxScroll, carouselScroll})
				return { ...calc, offset: Math.abs(offsetMiddle - (correction[0] || 0)) };
			})
			let scaleData = [1, 0.75, 0.85, 0.85];
			let opacityData = [0, 1, 1, 1];
			calcs.forEach(calc => {
				let {offset, img, redImg, li} = calc;
				// console.log({offset})
				const itemWidth = carouselElements[0].offsetWidth;
				for (let i = 0; i < scaleData.length - 1; i++) {
					if (offset < (i + 1) * itemWidth) { // [i * itemWidth, (i + 1) * itemWidth]
						const getPropertyValueFromOffset = (ar: number[]) => {
							return ar[i] * (1 - (offset % itemWidth) / itemWidth) + ar[i + 1] * ((offset % itemWidth) / itemWidth)
						}
						let scale = getPropertyValueFromOffset(scaleData);
						let opacity = getPropertyValueFromOffset(opacityData);
						// console.log(li);
						// console.log({scale});
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
			// console.log({visibleElements});
			lastCarouselScroll = carouselScroll;
		}
		requestAnimationFrame(animateElements);
	}
	onMount(() => {
		let offset = 6;
		minScroll = carouselElements[offset].offsetLeft + (carouselElements[offset].offsetWidth - carousel.offsetWidth) / 2;
		maxScroll = minScroll + data.length * carouselElements[0].offsetWidth;
		// console.log({minScroll, maxScroll})
		handleScroll(new Event("scroll"));
		animateElements();
	})
	let torchRedRGB = [0,0,0];
	let blueVioletRGB = [0,0,0];
	{
		let temp;
		temp = colors["torch-red"].hex.substring(1).match(/.{2}/g)?.map(n => parseInt(n, 16) / 255.0)
		if (temp) torchRedRGB = temp;
		temp = colors["blue-violet"].hex.substring(1).match(/.{2}/g)?.map(n => parseInt(n, 16) / 255.0)
		if (temp) blueVioletRGB = temp;
	}
	
	$: {
	}
	let carouselElements: HTMLElement[] = [];
</script>

<section class="w-full min-h-[calc(100svh-5rem)] flex flex-col items-center justify-start">
	<svg width="100%" height="50">
		<filter id="redify">
			<feBlend mode="multiply" in="SourceGraphic" />
			<feColorMatrix type="matrix" values=".33 .33 .33 0 0
			.33 .33 .33 0 0
			.33 .33 .33 0 0
			0   0   0  1 0">
			</feColorMatrix>
			
			<feComponentTransfer color-interpolation-filters="sRGB">
				{#each [0,1,2] as c}
				<svelte:element this={`feFunc${["R","G","B"][c]}`} type="table" tableValues="{blueVioletRGB[c] * 0.05}  {torchRedRGB[c]}" />
				{/each}
			</feComponentTransfer>
		</filter>
	</svg>
	<div class="flex flex-col w-full gap-12 items-center">
		<DashTitle words={["Our", "Creations"]} class="px-2 max-w-[calc(0.8*64rem)] --max-w-5xl --max-w-[80%] self-center"/>
		<ul class="-carousel relative overflow-x-scroll snap-normal snap-mandatory snap-x --overscroll-contain w-full max-w-7xl --gap-12 flex"
			bind:this={carousel}
			on:wheel={handleWheel}
			on:scroll={handleScroll}
			data-lenis-prevent
		>
			{#each currentData as el, index}
				<li class="-items snap-center scale-100 i{index % 2}" bind:this={carouselElements[index]}>
					<a href={el.url} class="-creation-link">
						<div class="-picture overflow-hidden relative --border-white --border w-[16rem] max-w-[85vw] aspect-[2/3] bg-center bg-no-repeat bg-cover rounded-[4px]" style="background-image: url({el.img});">
							<div class="-picture-red overflow-hidden absolute top-0 left-0 --border-white --border w-[16rem] max-w-[85vw] aspect-[2/3] bg-center bg-no-repeat bg-cover rounded-[4px]" style="background-image: url({el.img});">
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
		<div class="-spacer"></div>
	</div>
</section>

<style lang="postcss">
	.-carousel {
		touch-action: pan-y;
		--cr-msk-inline-shade: 10%;
		--cr-msk-inline-trsprt: 10%;
		mask-image: linear-gradient(
				90deg,
				transparent				calc(0% + var(--cr-msk-inline-shade)),
				rgba(0, 0, 0, 1) calc(var(--cr-msk-inline-shade) + var(--cr-msk-inline-trsprt)),
				rgba(0, 0, 0, 1) calc(100% - (var(--cr-msk-inline-shade) + var(--cr-msk-inline-trsprt))),
				transparent				calc(100% - var(--cr-msk-inline-shade))
			);
		.-items {
			.-creation-link {
				.-picture {
					.-picture-red {
						opacity: 0;
						filter:
							/* brightness(110%) */
							/* contrast(120%) */
							saturate(200%)
							url(#redify);
					}
				}
			}
		}
	}
</style>
