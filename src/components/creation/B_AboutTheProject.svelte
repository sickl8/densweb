<script lang="ts">
    import { assetsDir, type CreationData } from "$lib/utils";
    import path from "path-browserify";
    import DashTitle from "../DashTitle.svelte";

	export let creation: CreationData;
</script>

<section class="relative overflow-visible w-full min-h-[calc(100svh)] pt-[5rem] flex flex-col items-center justify-center [&>*]:max-w-[calc(min(100%,67.5rem))] [&>*]:px-4 gap-8">
	<DashTitle words={["about", "the project"]}/>
	<div class="-inner flex flex-col gap-4">
		<p class="text-xl">{creation.about_the_project}</p>
		<img class="" src={path.join(assetsDir, "creations", creation.name, creation.about_img)} alt="about the project">
	</div>
</section>