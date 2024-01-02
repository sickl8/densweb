<script lang="ts">
	import { assetsDir, type CreationData } from "$lib/utils";
	import path from "path-browserify";

	export let creation: CreationData;
</script>

<section class="relative overflow-visible w-full --min-h-[calc(100svh)] pt-[5rem] flex flex-col items-center justify-center">
	<img class="max-w-full" src={path.join(assetsDir, "creations", creation.name, creation.banner_img)} alt="banner">
</section>

<style lang="postcss">
	img {
		mask-image: linear-gradient(to bottom, transparent, black, black, black, black, transparent);
	}
</style>