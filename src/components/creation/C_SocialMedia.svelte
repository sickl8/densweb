<script lang="ts">
    import { assetsDir, type CreationData } from "$lib/utils";
    import path from "path-browserify";
    import Phoneframe from "../Phoneframe.svelte";

	export let creation: CreationData;
</script>

<section class="relative overflow-visible w-full min-h-[calc(100svh)] pt-[5rem] flex flex-col items-center justify-center">
	<h2 class="text-[calc(min(8rem,12vw))] leading-[1] text-yellow-200 font-bold">SOCIAL MEDIA</h2>
	<div class="-frames w-full flex justify-center items-center gap-16 px-8 flex-wrap [@media(max-width:800px)]:flex-col">
		{#each creation.social_media as img}
			<Phoneframe class="--max-w-[calc(max(25vw))] [@media(max-width:800px)]:max-w-none" src={path.join(assetsDir, "creations", creation.name, img)}/>
		{/each}
	</div>
</section>
