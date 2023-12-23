<script lang="ts">
	import { navData, sideBarIsOn } from "$lib/stores";
	import { twMerge } from "tailwind-merge";
	import Anchor from "./Anchor.svelte";

</script>

<div class="z-10 fixed top-0 h-screen -right-80 w-80 [&.toggled]:w-full [&.toggled]:right-0 transition-all duration-300 flex" class:toggled={$sideBarIsOn}>
	<button class="relative -remainder --hidden h-full border-none w-[calc(100%-20rem)] bg-gradient-to-l from-black/60 [&.toggled]:block" class:toggled={$sideBarIsOn} on:click={() => { $sideBarIsOn = !$sideBarIsOn }}/>
	<nav class="relative box-border py-20 px-5 max-w-7xl w-full h-full bg-torch-red-base">
		<ul class="flex flex-col justify-center items-center h-full gap-8">
			{#each $navData as el}
				<li class="font-semibold text-lg text-black border-b-black border-b-[0.2rem]"><Anchor href={el.path + el.hash} click={() => { $sideBarIsOn = !$sideBarIsOn }}>{el.text}</Anchor></li>
			{/each}
		</ul>
	</nav>
</div>

<style lang="postcss">
</style>
