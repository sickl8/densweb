<script lang="ts">
	export let data: {
		url: string;
		img: string;
	} = { url: "", img: "" };
	export let index: number = 0;
	export let carouselElements: HTMLElement[] = [];

</script>

<li
	class="-items --snap-center scale-100"
	data-scroll-snap-align="center"
	bind:this={carouselElements[index]}
>
	<div class="-creation-link">
		<a href={data.url}
			class="-picture block overflow-hidden relative w-[16rem] max-w-[85vw] aspect-[2/3] bg-center bg-no-repeat bg-cover rounded-[4px]"
			style="background-image: url({data.img});"
		>
			<div
				class="-picture-red overflow-hidden w-full h-full rounded-[4px] bg-torch-red-base"
				style="mix-blend-mode: darken;"
			/>
		</a>
	</div>
</li>
