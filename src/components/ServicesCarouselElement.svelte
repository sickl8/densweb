<script lang="ts">
    import { serviceCardWidthInRems } from "$lib/stores";
    import { colors } from "$lib/tailwind";
	type Service = { domain: string; skills: string[] };
	export let data: Service;
	export let index: number;
	export let carouselElements: HTMLElement[];
    import IntersectingCircles from "./IntersectingCircles.svg.svelte";

	function capitalizeWord(word: string) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	function capitalizeSentence(sentence: string) {
		return sentence
			.split(" ")
			.map((word) => capitalizeWord(word))
			.join(" ");
	}
</script>

<!-- 				background: linear-gradient(
					190deg,
					rgba(var(--lavender_blush-rgb), 10%) 0%,
					rgba(var(--lavender_blush-rgb), 3%) 40%,
					rgba(var(--lavender_blush-rgb), 0%) 60%,
					rgba(var(--lavender_blush-rgb), 0%) 75%,
					rgba(var(--lavender_blush-rgb), 0%) 100% -->

<li class="-card-container cursor-pointer -items --snap-center " data-scroll-snap-align="center" bind:this={carouselElements[index]}>
	<div class="--scale-[0.95] bg-black  rounded-xl border border-[#808080] overflow-hidden" style="width: {$serviceCardWidthInRems}rem">
		<div class="-card h-64 py-6 px-8 flex flex-col gap-4" style="background: linear-gradient(190deg, {colors.white.replace("1)", "10%)")} 0%, {colors.white.replace("1)", "3%)")} 40%)">
			<div class="-title flex-shrink flex gap-4 items-center">
				<div class="icon">
					<IntersectingCircles class="w-8 h-8"/>
				</div>
				<div class="-barrier h-8 w-[1px] bg-white" />
				<h2 class="-text">
					{capitalizeSentence(data.domain)}
				</h2>
			</div>
			<ul class="-skills flex flex-col flex-wrap justify-start items-start flex-grow min-h-0 gap-2 px-8">
				{#each data.skills as skill}
					<li class="-skill marker:text-torch-red-base marker:text-base [list-style-type:square] --max-w-[50%]">
						{capitalizeSentence(skill)}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</li>

<!-- <div class="-card-container relative min-h-[302px]">
	<div class="-card">
		<ul class="-skills max-h-[70%] px-20">
			<li class="-skill list-disc list-inside">
			</li>
		</ul>
	</div>
</div> -->