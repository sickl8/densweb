<script lang="ts">
    import { assetsDir } from "$lib/utils";
    import path from "path-browserify";
    import { twMerge } from "tailwind-merge";

	let Class = "";
	export let src: string;
	export { Class as class };
</script>

<div class={twMerge("-container relative max-w-[25vw] --bg-white overflow-hidden", Class)}>
	<div class="-padding absolute top-0 left-0 z-[-1] w-full h-full px-[5%] py-[4%]">
		<div class="w-full h-full rounded-[12%/7%]" style="background-size: cover; background-position: 50%; background-repeat: no-repeat; background-; background-image: url({src});"></div>
	</div>
	<img class="w-full" src={path.join(assetsDir, "img", "phone_frame.png")} alt="phone frame">
</div>