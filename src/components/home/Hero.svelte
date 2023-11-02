<script lang="ts">
	import { onMount } from "svelte";
	import Arrow from "../Arrow.svelte";
	import LogoWireframe from "../LogoWireframe.svelte";
	import { Typewriter } from "$lib/typewriter";
	import gsap from "gsap-trial";
	import TextPlugin from "gsap-trial/TextPlugin";
	import { colors } from "$lib/tailwind";
	import { times } from "lodash";

	gsap.registerPlugin(TextPlugin);

	onMount(() => {
		let breaks = 0.5
		gsap.timeline({ repeat: -1, repeatDelay: breaks })
		.to('.-scroll-dash.-hero .-flex-container', {
			justifyContent: "flex-end",
			duration: 0
		})
		.to('.-scroll-dash.-hero .-dash', {
			height: 0,
			ease: "power2.out",
			duration: breaks,
		})
		.to('.-scroll-dash.-hero .-flex-container', {
			justifyContent: "flex-start",
			duration: 0.25
		})
		.to('.-scroll-dash.-hero .-dash', {
			height: "100%",
			ease: "power2.in",
			duration: breaks,
		})
	})
	function animateArrow() {
		const totalTime = 0.25;
		gsap.timeline().to(".-nav-about-svg", {
			x: "100%",
			duration: totalTime / 2,
			ease: "power3.easeIn"
		}).to(".-nav-about-svg", {
			x: "-100%",
			duration: 0,
		}).to(".-nav-about-svg", {
			x: 0,
			duration: totalTime / 2,
			ease: "power3.easeOut",
		})
	}
</script>

<div class="-container w-full max-w-5xl h-full flex flex-col justify-center items-center gap-12 px-2">
	<LogoWireframe class="text-neutral-500/50 absolute left-[50%] h-full -z-10"/>
	<div class="-top w-full flex justify-between items-center">
		<div class="-left sm:max-w-[50%] flex flex-col gap-8">
			<div class="-text flex flex-col justify-center items-start gap-5">
				<p class="-gimmick flex items-center gap-2">
					<span class="-square select-none text-xs bg-torch-red-base">&nbsp;&nbsp;</span>
					<span class="-zero_one select-none text-sm">01</span>
				</p>
				<h1 class="-main font-semibold text-4xl relative w-full">
					<span class="-visible leading-[3.2rem]">You&nbsp;Imagine, We&nbsp;create!</span>
				</h1>
				<h2 class="-desc text-neutral-400 font-light">
					Enhancing your digital appearance to make
					your business <span id="hero-stand-out" class="">stand&nbsp;out</span> from the crowd.
				</h2>
			</div>
			<div class="-buttons flex items-center gap-2">
				<button class="-contact border border-torch-red-base hover:bg-torch-red-base hover:text-black [@media(hover:none)]:bg-torch-red-base [@media(hover:none)]:text-black transition-colors px-7 py-3 rounded-full duration-300 ">
					Contact&nbsp;Us
				</button>
				<button class="-about flex justify-center items-center gap-1 px-8 py-3 rounded-full duration-300 hover:text-black hover:bg-white border border-transparent hover:border-white [@media(hover:none)]:bg-white [@media(hover:none)]:text-black transition-colors"
				on:mouseenter={animateArrow}
				on:mouseleave={animateArrow}
				>
					<span class="text-current"> About&nbsp;us </span>
					<span class="overflow-x-hidden w-12 flex justify-center items-center [@media(max-width:360px)]:hidden">
						<Arrow class="-nav-about-svg fill-current w-8 h-fit" />
					</span>
				</button>
			</div>
		</div>
		<div class="-right" />
	</div>
	<div class="-scroll-dash -hero select-none text-sm text-neutral-400 pb-[30px] flex justify-center items-center gap-2">scroll <div class="h-8 w-[2px] flex -flex-container"><div class="-dash bg-current h-8 w-[2px]"></div></div></div>
</div>

<style lang="postcss">
	#hero-stand-out {
		will-change: filter;
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: transparent;
	}
	.-scroll-dash {
		will-change: transform;
		writing-mode: vertical-rl;
	}
	.-container {
		:global(.Typewriter__cursor) {
			font-weight: 300;
			width: 0px;
		}
	}
</style>