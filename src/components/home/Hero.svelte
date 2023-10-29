<script lang="ts">
	import { onMount } from "svelte";
	import Arrow from "../Arrow.svelte";
	import { Typewriter } from "$lib/typewriter";
	import gsap from "gsap-trial";
	import TextPlugin from "gsap-trial/TextPlugin";
	import { colors } from "$lib/tailwind";
	import { times } from "lodash";

	gsap.registerPlugin(TextPlugin);

	let vis: HTMLSpanElement;
	onMount(() => {
		let values = [
			[colors.white, 3],
			[colors.fuchsia[500], 10],
			[colors.cyan[500], 15]
		]
		gsap.fromTo("#hero-stand-out",
			{
				webkitTextStrokeColor: colors.white.replace("1)", "0)")
			},
			{
				filter: times(3, Number).map(i => `drop-shadow(${values[i][0]} 0 0 ${values[i][1]}px)`).join(" "),
				color: colors.white,
				duration: 2,
				webkitTextStrokeColor: colors.white,
				delay: 2,
				ease: "power4.easeOut",
				onComplete() {
					gsap.timeline({ repeat: -1, repeatDelay: 2 })
					.to('.-scroll-dash', {
						y: 30,
						duration: 0.7,
						repeat: 1,
						yoyo: true,
						ease: 'sin.inOut'
					});
				}
			}
		)
		let tw = new Typewriter(vis, { delay: 1000 / 15 });
		setTimeout(() => {
			tw
				.typeString("You\xa0Imagine, ")
				.pauseFor(1000)
				.typeString("We\xa0create!")
				.start();
		}, 100)
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
	<div class="-top w-full flex justify-between items-center">
		<div class="-left sm:max-w-[50%] flex flex-col gap-8">
			<div class="-text flex flex-col justify-center items-start gap-5">
				<p class="-gimmick flex items-center gap-2">
					<span class="-square select-none text-xs bg-torch-red-base">&nbsp;&nbsp;</span>
					<span class="-zero_one select-none text-sm">01</span>
				</p>
				<h1 class="-main font-semibold text-4xl relative w-full">
					<span bind:this={vis} class="-visible absolute top-0 left-0 leading-[3.2rem]"></span>
					<span class="-invisible text-transparent leading-[3.2rem]">You&nbsp;Imagine, We&nbsp;create!</span>
				</h1>
				<h2 class="-desc text-neutral-400 font-light bg-black">
					Enhancing your digital appearance to make
					your business <span id="hero-stand-out" class="">stand&nbsp;out</span> from the crowd.
				</h2>
			</div>
			<div class="-buttons flex items-center gap-2">
				<button class="-contact border border-torch-red-base hover:bg-torch-red-base hover:text-black [@media(hover:none)]:bg-torch-red-base [@media(hover:none)]:text-black transition-colors px-8 py-3 rounded-full duration-300 ">
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
	<div class="-scroll-dash select-none text-sm text-cape-cod-400 pb-[30px]">scroll <span class="tracking-[-0.2rem] text-2xl">——</span></div>
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
		}
	}
</style>