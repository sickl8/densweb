<script lang="ts">
    import { twMerge } from "tailwind-merge";
	let Class = "";
	export { Class as class };
	export let words: [string, string] = [ "word1", "word2" ];
	console.log(twMerge("flex flex-col w-full", Class))
</script>

<div class="{twMerge("flex flex-col w-full", Class)}">
	<div class="flex items-center gap-2.5">
		<div class="w-10 h-1 bg-torch-red-base"></div>
		<div class="select-none font-normal text-xl">{words[0]}</div>
	</div>
	<div class="select-none font-medium text-5xl">{words[1]}</div>
</div>

<style lang="postcss">
</style>