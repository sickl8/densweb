<script lang="ts">
    import type { CreationData } from "$lib/utils";
    import FContactUs from "../home/G_ContactUs.svelte";
    import AHero from "./A_Hero.svelte";
    import BAboutTheProject from "./B_AboutTheProject.svelte";
    import CSocialMedia from "./C_SocialMedia.svelte";
    import DBanner from "./D_Banner.svelte";
    import EGallery from "./E_Gallery.svelte";
	export let creation: CreationData;
</script>

<AHero {creation}/>
<div class="h-16"></div>
<BAboutTheProject {creation} />
<CSocialMedia {creation} />
<DBanner {creation} />
<EGallery {creation} />
<FContactUs />