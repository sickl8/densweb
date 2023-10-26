<script lang="ts">
	import { onMount } from "svelte";
	import Arrow from "../Arrow.svelte";
	import { Typewriter } from "$lib/typewriter";
	import { animate } from "motion";
	import gsap from "gsap-trial";
	import { colors } from "$lib/tailwind";

	let h1: HTMLHeadingElement;
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
				filter: [...Array(3).keys()].map(i => `drop-shadow(${values[i][0]} 0 0 ${values[i][1]}px)`).join(" "),
				color: colors.white,
				duration: 2,
				webkitTextStrokeColor: colors.white,
				delay: 1.5,
				ease: "power4.easeOut",
				onComplete() {
					gsap.timeline({ repeat: -1, repeatDelay: 2 })
					.to('.-scroll-dash', {
						y: 20,
						duration: 0.8,
						repeat: 1,
						yoyo: true,
						ease: 'sin.inOut'
					});
				}
			}
		)
	})
</script>

<div class="-container max-w-5xl h-full flex flex-col justify-center items-center gap-12">
	<div class="-top w-full flex justify-between items-center">
		<div class="-left max-w-[45%] flex flex-col gap-8">
			<div class="-text flex flex-col justify-center items-start gap-5">
				<p class="-gimmick flex items-center gap-2">
					<span class="-square select-none text-xs bg-torch-red-base">&nbsp;&nbsp;</span>
					<span class="-zero_one select-none text-sm">01</span>
				</p>
				<h1 class="-main font-semibold text-4xl" bind:this={h1}>
					<span class="-visible">You Imagine, we create!</span>
					<span class="-invisible"></span>
				</h1>
				<h2 class="-desc text-cape-cod-400 font-extralight bg-black">
					Enhancing your digital appearance to make
					your business <span id="hero-stand-out" class="-stand-out te-">stand out</span> from the crowd.
				</h2>
				<!-- <p>Some normal text, Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa omnis soluta officiis nulla illum! Eos excepturi libero doloremque a voluptatum quod, quaerat ut dolores alias sed sunt nam! Id, explicabo?</p> -->
			</div>
			<div class="-buttons flex items-center gap-2">
				<button class="-contact border border-torch-red-base hover:bg-torch-red-base hover:text-black transition-colors px-8 py-3 rounded-full duration-300 ">
					Contact&nbsp;Us
				</button>
				<button class="-about flex justify-center items-center gap-5 px-8 py-3 rounded-full duration-300 hover:text-black hover:bg-white border border-transparent hover:border-white transition-colors">
					<span class="text-current"> About&nbsp;us </span>
					<span>
						<Arrow class="svg fill-current w-8 h-fit" />
					</span>
				</button>
			</div>
		</div>
		<div class="-right" />
	</div>
	<div class="-scroll-dash select-none text-sm text-cape-cod-400">scroll <span class="tracking-[-0.2rem] text-2xl">——</span></div>
</div>

<style lang="postcss">
	.-stand-out {
		/* will-change: filter; */
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: transparent;
	}
	.-scroll-dash {
		/* transform: translate(0,0);
		will-change: transform; */
		writing-mode: vertical-rl;
	}
</style>