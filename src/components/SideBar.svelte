<script lang="ts">
	import { navData, sideBarIsOn } from "$lib/stores";
	import { twMerge } from "tailwind-merge";

</script>

<div class="z-10 fixed top-0 h-screen -right-80 w-80 [&.toggled]:w-full [&.toggled]:right-0 transition-all duration-300" class:toggled={$sideBarIsOn}>
	<button class="remainder relative hidden h-full border-none w-[calc(100% - 20rem)] bg-gradient-to-l from-black/60 via-black/20 via-10% to-black/0 to-25% [&.toggled]:block" class:toggled={$sideBarIsOn} on:click={() => { sideBarIsOn.set(false) }}/>
	<nav class="box-border py-20 px-5 max-w-7xl w-full h-full bg-torch-red-base">
		<ul>
			{#each $navData as el}
				<li><a href={el.target}>{el.text}</a></li>
			{/each}
		</ul>
	</nav>
</div>

<style lang="postcss">
</style>
