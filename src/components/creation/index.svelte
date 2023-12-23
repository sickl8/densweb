<script lang="ts">
    import type { CreationData } from "$lib/utils";
    import AHero from "./A_Hero.svelte";
	export let creation: CreationData;
</script>

<AHero {creation}/>