<script lang="ts">
    import path from "path-browserify";
    import DashTitle from "../DashTitle.svelte";
    import { assetsDir } from "$lib/utils";


</script>

<section class="w-full min-h-[calc(100svh)] pt-[5rem] flex flex-col items-center justify-start" id="about">
	<div class="px-4 flex flex-col w-full gap-12 items-center">
		<DashTitle words={["", "about us"]} class="max-w-[67.5rem] --max-w-5xl --max-w-[80%] self-center"/>
		<div class="-container relative max-w-[67.5rem] flex gap-4 [@media(max-width:900px)]:block [&>_*]:basis-0 [&>_*]:grow ">
			<div class="-why_den flex flex-col gap-4">
				<h2 class="uppercase text-torch-red-base font-bold">WHY DEN</h2>
				<p class="uppercase font-light">
					THESE BRAND GUIDELINES PROVIDE INFORMATION ABOUT
					THE OVERALL BRAND FRAMEWORK, BASIC ELEMENTS AND
					MESSAGING. THE "DEN" BASIC ELEMENTS COVER THE BRAND
					MARK, COLOUR, TYPOGRAPHY, IMAGERY, SUPPORTING
					GRAPHIC DEVICES AND COMPOSITION. THEY DESCRIBE
					HOW THESE ELEMENTS COME TOGETHER TO CREATE A LOOK
					AND FEEL THAT IS UNIQUELY DEN. THE GUIDELINES ARE
					AN IMPORTANT TOOL IN ENSURING THAT DEN BRAND IS
					PRESENTED AND EXPRESSED CORRECTLY AND CONSISTENTLY
					ACROSS APPLICATIONS. YOUR HELP DOING THIS IS
					INVALUABLE AND WILL HELP BUILD AN EVEN STRONGER
					DEN BRAND NOW AND FOR THE FUTURE.
				</p>
			</div>
			<div class="-image self-center [@media(max-width:900px)]:absolute [@media(max-width:900px)]:blur-[3px] [@media(max-width:900px)]:brightness-[25%] -z-10 w-full top-0 left-0 ">
				<div class="-decor m-auto flex w-fit text-5xl font-bold py-[0.5ch] pr-[1ch]">
					<div class="-plus self-start relative z-10 basis-0 grow-0 text-5xl font-bold text-white">
						<div class="w-[0.5ch] h-0 leading-[0]">+</div>
					</div>
					<img class="-img relative h-full" src={path.join(assetsDir, "img", "double_u.png")} alt="">
					<div class="-plus self-end relative z-10 basis-0 grow-0 text-5xl font-bold text-torch-red-base">
						<div class="w-[0.5ch] h-0 leading-[0]" dir="rtl">+</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>