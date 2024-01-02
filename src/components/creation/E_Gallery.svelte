<script lang="ts">
    import type { CreationData } from "$lib/utils";

	export let creation: CreationData;
</script>

<section class="relative overflow-visible w-full --min-h-[calc(100svh)] pt-[5rem] flex flex-col items-center justify-center">
	{#each creation.misc as img}
		<img src={img} alt="gallery entry">
	{/each}
</section>