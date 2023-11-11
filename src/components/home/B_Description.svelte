<script lang="ts">
    import { hover } from "$lib/hoverAction";
	import gsap from "gsap-trial";

	function handleMouseEvent(event: MouseEvent | FocusEvent) {
		const circleSizeInRems = 6;
		const borderSizeInPxs = 1;
		const remsToPixels = (rems: number) => {
			return rems * parseFloat(getComputedStyle(document.documentElement).fontSize);
		}
		let mousePos = {x: -1, y: -1};
		let e: MouseEvent & { target: HTMLHeadingElement };
		let dim = {x: 0, y: 0};
		if (event.type !== "focus") {
			e = event as MouseEvent & { target: HTMLHeadingElement };
			mousePos = { x: e.offsetX, y: e.offsetY };
			const bb = e.target.getBoundingClientRect();
			dim = { x: bb.right - bb.left, y: bb.bottom - bb.top };
			if (event.type === "mousemove") {
				gsap.to("#desc .-h2-container", {
					clipPath: `circle(${circleSizeInRems}rem at ${mousePos.x}px ${mousePos.y}px)`
				})
				gsap.to("#desc .-border-container", {
					clipPath: `circle(${remsToPixels(circleSizeInRems) + borderSizeInPxs}px at ${mousePos.x}px ${mousePos.y}px)`
				})
				gsap.to("#desc .-h2-container h2", {
					x: dim.x / 2 - mousePos.x,
					y: dim.y / 2 - mousePos.y,
				})
			}
			else {
				let duration = 0.5 * (+ (event.type === "mouseleave")) // 0 if mouseover
				gsap.to("#desc .-h2-container", {
					clipPath: `circle(${0}rem at ${mousePos.x}px ${mousePos.y}px)`,
					duration
				})
				gsap.to("#desc .-border-container", {
					clipPath: `circle(${0}px at ${mousePos.x}px ${mousePos.y}px)`,
					duration
				})
			}
		}
	}
</script>

<section class="w-full --min-h-[calc(100svh-5rem)] flex flex-col items-center justify-center py-32">
	<div id="desc" class="-container relative w-full max-w-5xl h-full flex flex-col justify-center items-center [@media(max-width:500px)]:text-[60%] [@media(max-width:500px)]:leading-[2.5rem]">
		<h2 class="-white [@media(max-width:500px)]:before:hidden text-[300%] font-semibold leading-[inherit] text-center before:pointer-events-none after:pointer-events-none before:inline-block before:-translate-x-12 before:leading-[0] before:text-[200%] before:content-[open-quote] before:w-0 before:h-0 before:font-bold before:text-torch-red-base after:inline-block after:translate-y-20 after:leading-[0] after:text-[200%] after:content-[close-quote] after:w-0 after:h-0 after:font-bold after:text-torch-red-base px-12 py-8 [@media(max-width:500px)]:px-6"
		use:hover={{callback: handleMouseEvent, listenToMouseMove: true}}>
			DEN is a group of creative people from different industries gathered to
			bring your most dreamy ideas into reality
		</h2>
		<div class="-border-container [@media(max-width:500px)]:hidden absolute top-0 left-0 w-full h-full pointer-events-none" style="clip-path: circle(0%);">
			<div class="-border bg-torch-red-base scale-[200%] w-full h-full"></div>
		</div>
		<div class="-h2-container [@media(max-width:500px)]:hidden absolute w-full h-full top-0 left-0 pointer-events-none px-12 py-8" style="clip-path: circle(0%);">
			<div class="-bg absolute w-full h-full top-0 left-0 pointer-events-none bg-black scale-[200%]"></div>
			<h2 class="-red text-[300%] font-semibold leading-[inherit] text-center before:inline-block before:-translate-x-12 before:leading-[0] before:text-[200%] before:content-[open-quote] before:w-0 before:h-0 before:font-bold before:text-torch-red-base after:inline-block after:translate-y-20 after:leading-[0] after:text-[200%] after:content-[close-quote] after:w-0 after:h-0 after:font-bold after:text-torch-red-base text-torch-red-base scale-[200%]" >
				DEN is a group of creative people from different industries gathered to
				bring your most dreamy ideas into reality
			</h2>
		</div>
	</div>
</section>

<style lang="postcss">
</style>