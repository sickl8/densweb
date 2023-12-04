<script lang="ts">
	export let paused = true;
	let Class = "";
	export { Class as class };
	let play = [
		"M 211.0 176.5 L 258.0 203.1 C 265.5 208.0 265.0 207.0 265.0 213.9 L 266.4 288.6 C 266.1 297.0 266.6 295.7 259.7 300.6 L 210.5 331.6 C 209.0 332.6 196.6 336.2 196.6 323.5 L 196.0 185.4 C 196.0 178.5 200.2 170.6 211.0 176.5 Z",
		"M 253.8 200.7 L 318.7 239.1 C 323.6 242.2 328.0 245.2 328.1 251.1 L 328.1 251.5 C 328.0 256.1 325.4 258.2 318.9 262.6 L 255.0 303.4 C 248.1 303.4 245.3 300.5 245.3 293.6 L 245.3 210.5 C 245.3 203.6 246.9 200.7 253.8 200.7 Z",
	]
	let pause = [
		"M 194.7 171.8 L 219.7 171.8 C 226.6 171.8 232.2 177.3 232.2 184.3 L 232.2 319.3 C 232.2 326.2 226.6 331.8 219.7 331.8 L 194.7 331.8 C 187.8 331.8 182.2 326.2 182.2 319.3 L 182.2 184.3 C 182.2 177.3 187.8 171.8 194.7 171.8 Z",
		"M 276.8 171.7 L 301.8 171.8 C 308.7 171.7 314.3 177.3 314.3 184.3 L 314.3 319.3 C 314.3 326.1 308.7 331.7 301.8 331.8 L 276.8 331.8 C 269.9 331.7 264.3 326.1 264.3 319.3 L 264.3 184.3 C 264.3 177.3 269.9 171.7 276.8 171.8 Z",
	]
	$: d = paused ? play : pause;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500" class={Class}>
	<circle class="fill-transparent stroke-torch-red-base stroke-[40px]" cx="250" cy="250" r="230"/>
	<path class="fill-white transition-[d] duration-[0.2s]" style='transform-origin: 231.241px 253.678px; d: path("{d[0]}")'/>
	<path class="fill-white transition-[d] duration-[0.2s]" style='transform-origin: 286.761px 252.112px; d: path("{d[1]}")'/>
</svg>

<style lang="postcss">
</style>