<script lang="ts">
	import { assetsDir, type CreationData } from "$lib/utils";
    import path from "path-browserify";

	export let creation: CreationData;
</script>

<section class="relative overflow-visible w-full min-h-[calc(100svh-5rem)] flex flex-col items-center justify-center" id="home">
	<div class="-top w-full grow">

	</div>
	<div class="-bot w-full grow bg-torch-red-base scale-y-125 translate-y-[4rem]">
		
	</div>
	<div class="-mid w-min absolute">
		<h1 class="font-[600] text-[calc(min(13vw,10rem))] leading-[0.9] [letter-spacing:1vw]">
			{creation.display_name.toUpperCase()}
		</h1>
		<div class="-img h-0 max-w-full flex flex-col justify-center items-center">
			<img class="w-[60%]" src={path.join(assetsDir, "creations", creation.name, creation.hero_img)} alt="hero">
		</div>
		<h2 class="font-[600] text-[calc(min(13vw,10rem))] leading-[0.9] [letter-spacing:1vw] text-transparent stroke">
			{creation.display_name.toUpperCase()}
		</h2>
	</div>
</section>

<style lang="postcss">
	.stroke {
		-webkit-text-stroke: 0.20vw white;
	}
	.-bot {
		mask-image: linear-gradient(to bottom, black, black, black, transparent);
	}
</style>