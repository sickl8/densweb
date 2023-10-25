<script lang="ts">
	import { sideBarIsOn } from "$lib/stores";

	let canvasHeight = 500;
	let height_spacing = 55;
	let width = 200;
	let height = 18;
	let y1 = canvasHeight / 2 - height_spacing - height / 2;
	let y2 = canvasHeight / 2 + height_spacing - height / 2;
	let canvasWidth = 500;
	let x1 = canvasWidth / 2 - width / 2;
	let x2 = canvasWidth / 2 - width / 2;

	let a = [
		"M 150 186 L 350 186 L 350 204 L 150 204 L 150 186 Z",
		"M 150 296 L 350 296 L 350 314 L 150 314 L 150 296 Z",
	], b = [
		"M 185.453 173.323 L 327.132 314.762 L 314.379 326.512 L 172.445 185.572 L 185.453 173.323 Z",
		"M 172.908 314.365 L 314.365 172.904 L 327.096 185.656 L 185.645 327.103 L 172.908 314.365 Z",
	];
</script>

<svg class="burger-menu-svg h-full w-full" viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg">
	<path class="fill-white stroke-0 transition-all" style='d: path("{!$sideBarIsOn ? a[0] : b[0]}"); paint-order: stroke;'/>
	<path class="fill-white stroke-0 transition-all" style='d: path("{!$sideBarIsOn ? a[1] : b[1]}"); paint-order: stroke;'/>
</svg>

<style lang="postcss">
</style>
