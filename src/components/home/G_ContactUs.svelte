<script lang="ts">
	import Fa from "svelte-fa";
	// import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons/index.es';
	import { cubicInOut } from 'svelte/easing';
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
    import { url } from "@roxi/routify";
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

<section class="w-full min-h-[calc(100svh-5rem)] mt-[5rem] flex flex-col items-center justify-between bg-gradient-to-t from-torch-red-base/30 to-50%">
	<div class="-upper"></div>
	<div class="-mid text-center flex flex-col gap-4">
		<h3 class="-we text-2xl leading-10 text-gray-200">we would love to hear from you</h3>
		<h2 class="-email text-7xl font-medium">hello@dendigitals.com</h2>
	</div>
	<footer class="-contacts self-stretch flex justify-between items-center px-2 pb-2 flex-wrap-reverse">
		<div class="-copyright -cont basis-0 grow">
			© 2023 DEN Digitals - All Rights Reserved
		</div>
		<div class="-icons -cont flex justify-center gap-2.5 basis-0 grow">
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
					<a href="/#creations">Our Work</a>
				</li>
				<li
					class="location"
					id="services_location"
					bind:this={servicesRef}
				>
					<a href="/#services">Services</a>
				</li>
				<li
					class="location"
					id="about_location"
					bind:this={aboutRef}
				>
					<a href="/#about">About Us</a>
				</li>
				<li
					class="location"
					id="contact_location"
					bind:this={contactRef}
				>
					<a href="/#contact">Contact Us</a>
				</li>
			</ul>
		</div>
	</footer>
</section>

<style lang="postcss">

</style>