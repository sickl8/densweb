<script lang="ts">
	import Fa from "svelte-fa";
	import Anchor from "../Anchor.svelte"
	import {
		faInstagram,
		faBehance,
		faPinterest,
		faDeviantart,
		faDribbble,
		faInstagramSquare,
        faFacebook,
        faLinkedin,
        faVimeo,
	} from "@fortawesome/free-brands-svg-icons";
    // import Anchor from "./anchor.svelte";

	let workRef, servicesRef, aboutRef, contactRef;
	let links = {
		"Facebook": "https://www.facebook.com/dendigitals",
		"Instagram": "https://www.instagram.com/dendigitals/",
		"Linkedin": "https://www.linkedin.com/company/dendigitals",
		"Behance": "https://www.behance.net/dendigitals",
		"Vimeo": "https://vimeo.com/dendigitals",
	}
</script>

<section class="w-full min-h-[calc(max(100svh,36rem))] pt-[5rem] flex flex-col items-center justify-between bg-gradient-to-t from-torch-red-base/30 to-50%" id="contact">
	<div class="-upper"></div>
	<div class="-mid text-center flex flex-col">
		<h3 class="-we text-[calc(max(min(2.3vw,1.5rem),1rem))] leading-10 text-gray-200">we would love to hear from you</h3>
		<h2 class="-email text-[calc(min(8vw,4.5rem))] font-medium leading-[4rem]">hello@dendigitals.com</h2>
	</div>
	<footer class="-contacts self-stretch flex justify-between items-center px-2 pb-2 [@media(max-width:500px)]:flex-col-reverse [@media(max-width:500px)]:gap-4">
		<div class="-copyright -cont basis-0 grow [@media(max-width:500px)]:text-sm">
			© 2024 DEN Digitals - All Rights Reserved
		</div>
		<div class="-icons -cont flex justify-center gap-2.5 basis-0">
			<a href={links["Facebook"]}><Fa icon={faFacebook} /></a>
			<a href={links["Instagram"]}><Fa icon={faInstagram} /></a>
			<a href={links["Linkedin"]}><Fa icon={faLinkedin} /></a>
			<a href={links["Behance"]}><Fa icon={faBehance} /></a>
			<a href={links["Vimeo"]}><Fa icon={faVimeo} /></a>
			<!-- fb/insta/linkdIn/behance/Vemio -->
		</div>
		<div class="-nav -cont flex justify-end [@media(max-width:980px)]:hidden basis-0 grow">
			<ul class="-locations flex justify-center items-center gap-5">
				<li
					class="first location"
					id="work_location"
					bind:this={workRef}
				>
					<Anchor href="/#work">Our Work</Anchor>
				</li>
				<li
					class="location"
					id="services_location"
					bind:this={servicesRef}
				>
					<Anchor href="/#services">Services</Anchor>
				</li>
				<li
					class="location"
					id="about_location"
					bind:this={aboutRef}
				>
					<Anchor href="/#about">About Us</Anchor>
				</li>
				<li
					class="location"
					id="contact_location"
					bind:this={contactRef}
				>
					<Anchor href="/#contact">Contact Us</Anchor>
				</li>
			</ul>
		</div>
	</footer>
</section>

<style lang="postcss">

</style>