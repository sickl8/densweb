<script lang="ts">
    import type { CreationData } from "$lib/utils";
    import AHero from "./A_Hero.svelte";
    import BAboutTheProject from "./B_AboutTheProject.svelte";
    import CSocialMedia from "./C_SocialMedia.svelte";
	export let creation: CreationData;
</script>

<AHero {creation}/>
<div class="spacer"></div>
<BAboutTheProject {creation} />
<CSocialMedia {creation} />

<style lang="postcss">
	.spacer {
		height: 4rem;
	}
</style>