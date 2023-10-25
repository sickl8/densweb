<script lang="ts">
	import { sideBarIsOn } from "$lib/stores";
	import { twMerge } from "tailwind-merge";

	let Class = "";
	export { Class as class };
</script>

<svg
	class={twMerge("fill-torch-red-base stroke-none", Class)}
	class:on={$sideBarIsOn}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="-15.079 7.841 930.397 1074.331"
	width="930.397"
	height="1074.331"
>
	<g
		id="g10"
		transform="matrix(1.333333, 0, 0, -1.333333, -216.546448, 1211.672852)"
	>
		<g id="g12" transform="translate(732.5996,768.5825)">
			<path
				d="m 0,0 -348.595,-201.613 -116.604,67.321 348.899,201.438 -116.3,67.145 -348.899,-201.437 v -135.115 l 232.293,-133.486 0.307,-134.309 -232.6,133.661 V -470.019 L -232.6,-671.457 v 402.874 l 348.899,201.437 z"
				class="path fill-inherit"
				id="path14"
			/>
		</g>
		<g id="g16" transform="translate(616.2998,164.2715)">
			<path
				d="M 0,0 116.3,67.146 V 335.1 L 0,268.86 Z"
				class="path fill-inherit"
				id="path18"
			/>
		</g>
	</g>
</svg>
