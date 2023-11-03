<script lang="ts">
	import Description from "./Description.svelte";
	import Hero from "./Hero.svelte";
</script>

<section class="w-full min-h-[calc(100svh-5rem)] px-2 flex flex-col items-center justify-center">
	<Hero />
</section>
<section class="w-full --min-h-[calc(100svh-5rem)] px-2 flex flex-col items-center justify-center py-32">
	<Description />
</section>
<section class="w-full min-h-[calc(100svh-5rem)] px-2 flex flex-col items-center justify-center">
	
</section>
<!-- <Creations bind:work_section={$navElements["Our Work"]}></Creations>
<Services bind:services_section={$navElements["Services"]}></Services>
<AboutUs bind:about_section={$navElements["About Us"]}></AboutUs>
<SoundSpace bind:soundspace_section={$soundspace_section}></SoundSpace>
<ContactUs bind:contactsection={$navElements["Contact Us"]} /> -->
