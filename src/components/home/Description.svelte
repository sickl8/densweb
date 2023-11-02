<script lang="ts">
	import gsap from "gsap-trial";

	function handleMouseEvent(event: MouseEvent | FocusEvent) {
		const circleSizeInRems = 5;
		const borderSizeInPxs = 2;
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

<div id="desc" class="-container relative w-full max-w-5xl h-full flex flex-col justify-center items-center">
	<h2 class="-white text-5xl font-semibold leading-[4rem] text-center before:inline-block before:-translate-x-12 before:leading-[0] before:text-8xl before:content-[open-quote] before:w-0 before:h-0 before:font-bold before:text-torch-red-base after:inline-block after:translate-y-20 after:leading-[0] after:text-8xl after:content-[close-quote] after:w-0 after:h-0 after:font-bold after:text-torch-red-base px-12 py-8"
	on:mouseover={handleMouseEvent}
	on:mousemove={handleMouseEvent}
	on:focus={handleMouseEvent}
	on:mouseleave={handleMouseEvent}>
		DEN is a group of creative people from different industries gathered to
		bring your most dreamy ideas into reality
	</h2>
	<div class="-border-container absolute top-0 left-0 w-full h-full pointer-events-none" style="clip-path: circle(0%);">
		<div class="-border bg-torch-red-base scale-[200%] w-full h-full"></div>
	</div>
	<div class="-h2-container absolute w-full h-full top-0 left-0 pointer-events-none" style="clip-path: circle(0%);">
		<div class="-bg absolute w-full h-full top-0 left-0 pointer-events-none bg-black scale-[200%]"></div>
		<h2 class="-red text-5xl font-semibold leading-[4rem] text-center before:inline-block before:-translate-x-12 before:leading-[0] before:text-8xl before:content-[open-quote] before:w-0 before:h-0 before:font-bold before:text-torch-red-base after:inline-block after:translate-y-20 after:leading-[0] after:text-8xl after:content-[close-quote] after:w-0 after:h-0 after:font-bold after:text-torch-red-base px-12 py-8 text-torch-red-base scale-[200%]" >
			DEN is a group of creative people from different industries gathered to
			bring your most dreamy ideas into reality
		</h2>
	</div>
</div>

<style lang="postcss">
	/* span {
		font-family: DEN;
		font-weight: normal;
	} */
</style>