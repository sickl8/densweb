<script lang="ts">
    import type { CreationData } from "$lib/utils";
    import { params, goto } from "@roxi/routify";
	import Index from "src/components/creation/index.svelte";
	import _creationsJson from "src/routes/creations/creations.json";
    import Fallback from "../_fallback.svelte";
	
	const creationsJson = _creationsJson;

	let { creation } = $params;
	// creation[creation.length - 1] = "s";
	let a = [..."123"];
	a[1] = "4";
	console.log(a.join(""));
	// params.subscribe((v) => {
	// 	creation = v.creation;
	// })
	// export const load = (ctx: any) => {
	// 	console.log({ctx: JSON.stringify(ctx)})
	// }
	let creationData: CreationData | null;
	let lookup = creationsJson.filter((el) => el.name === creation);
	console.log({lookup, creationsJson, creation});
	if (lookup.length) {
		creationData = lookup[0]; 
	}
	else {
		creationData = null;
		// location.href = "/404";
		// $goto("/404", undefined, { mode: "replace" });
		// return {
		// 	redirect: '/404'
		// }
	}


</script>

{#if creationData}
	<Index creation={creationData}/>
{:else}
	<Fallback></Fallback>
{/if}