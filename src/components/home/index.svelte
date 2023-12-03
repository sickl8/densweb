<script lang="ts">
	import CCreations from "./C_Creations.svelte";
	import BDescription from "./B_Description.svelte";
	import AHero from "./A_Hero.svelte";
	import DServices from "./D_Services.svelte";
	import EAboutUs from "./E_AboutUs.svelte";
</script>

<AHero />
<BDescription />
<CCreations />
<DServices />
<EAboutUs />

<!-- <Creations bind:work_section={$navElements["Our Work"]}></Creations> -->
<!-- <Services bind:services_section={$navElements["Services"]}></Services> -->
<!-- <AboutUs bind:about_section={$navElements["About Us"]}></AboutUs> -->
<!-- <SoundSpace bind:soundspace_section={$soundspace_section}></SoundSpace> -->
<!-- <ContactUs bind:contactsection={$navElements["Contact Us"]} /> -->
