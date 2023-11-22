<script lang="ts">
    import { remsToPixels } from "$lib/utils";
    import Carousel from "../Carousel.svelte";
    import DashTitle from "../DashTitle.svelte";
    import IntersectingCircles from "../IntersectingCircles.svg.svelte";
    import ServicesCarouselElement from "../ServicesCarouselElement.svelte";
	type Service = { domain: string; skills: string[] };

	let _services: Service[] = [
		{
			domain: "visuals",
			skills: [
				"branding",
				"2D animation",
				"3D animation",
				"motion design",
				"video editing",
				"character design",
				"3D modeling",
			],
		},
		{
			domain: "sound",
			skills: [
				"branding",
				"2D animation",
				"3D animation",
				"motion design",
				"video editing",
				"character design",
				"3D modeling",
			],
		},
		{
			domain: "video0",
			skills: [
				"branding",
				"2D animation",
				"3D animation",
				"motion design",
				"video editing",
				"character design",
				"3D modeling",
			],
		},
	];

	function completeFullTurn<T>(arr: T[]) {
		if (arr.length >= 7) return arr;
		let newarr: T[] = [];
		for (let i = arr.length; i < 7; i++) {
			newarr.push(
				JSON.parse(JSON.stringify(arr[(i - arr.length) % arr.length]))
			);
		}
		return [...arr, ...newarr];
	}

	$: services = completeFullTurn(_services);

	let carousel: HTMLElement;
	// let carouselScroll = 0;

	let data = _services;

</script>

<section class="w-full -min-h-[calc(100svh-5rem)] flex flex-col items-center justify-start">
<div class="flex flex-col w-full gap-12 items-center">
	<DashTitle words={["Our", "Services"]} class="px-2 max-w-[calc(0.8*64rem)] --max-w-5xl --max-w-[80%] self-center"/>
	<Carousel bind:carousel={carousel} {data} component={ServicesCarouselElement} itemsVisible={3} scrollAmount={remsToPixels(20)}/>
	<div class="-spacer"></div>
</div>
</section>

<!-- <div class="card-container s-UyWNFZfOJ9vg middle">
	<div class="card flex-column flex-gap20">
		<div class="title flex-ai-cr flex-gap15">
			<div class="icon">
				<IntersectingCircles />
			</div>
			<div class="barrier" />
			<h2 class="text">
				{capitalizeSentence(service.domain)}
			</h2>
		</div>
		<ul class="skills flex-column flex-wrap flex-gap10">
			{#each service.skills as skill}
				<li class="skill">
					{capitalizeSentence(skill)}
				</li>
			{/each}
		</ul>
	</div>
</div> -->

