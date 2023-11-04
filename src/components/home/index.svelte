<script lang="ts">
	import DashTitle from "../DashTitle.svelte";
    import Creations from "./Creations.svelte";
	import Description from "./Description.svelte";
	import Hero from "./Hero.svelte";

</script>

<section class="relative w-full min-h-[calc(100svh-5rem)] px-2 flex flex-col items-center justify-center">
	<Hero />
</section>
<section class="w-full --min-h-[calc(100svh-5rem)] px-2 flex flex-col items-center justify-center py-32">
	<Description />
</section>
<section class="w-full min-h-[calc(100svh-5rem)] px-2 flex flex-col items-center justify-start">
	<div class="flex flex-col w-full max-w-5xl">
		<DashTitle words={["Our", "Creations"]} class="max-w-[80%] self-center"/>
		<Creations/>
	</div>
</section>





<!-- <Creations bind:work_section={$navElements["Our Work"]}></Creations> -->
<!-- <Services bind:services_section={$navElements["Services"]}></Services> -->
<!-- <AboutUs bind:about_section={$navElements["About Us"]}></AboutUs> -->
<!-- <SoundSpace bind:soundspace_section={$soundspace_section}></SoundSpace> -->
<!-- <ContactUs bind:contactsection={$navElements["Contact Us"]} /> -->
