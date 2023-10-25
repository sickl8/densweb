<script lang="ts">
    import { onMount } from "svelte";
	import Arrow from "./Arrow.svelte";
    import { Typewriter } from "$lib/typewriter";

	let h1: HTMLHeadingElement;
	onMount(() => {
		let tw = new Typewriter(h1, { autoStart: true, delay: 1000 / 20 });
		tw.typeString("You Imagine, ").pauseFor(1000).typeString("we create!").start();
	})
</script>
<div class="container flex-gap50 flex-jc-cr flex-ai-cr flex-column">
	<div class="top w100 flex-jc-sb flex-ai-cr">
		<div class="left flex-column flex-gap30">
			<div class="text flex-column flex-jc-cr flex-ai-fs flex-gap20">
				<p class="gimmick flex-jc-fs flex-gap10 flex-ai-cr">
					<span class="square">&nbsp;&nbsp;</span>
					<span class="zero_one">01</span>
				</p>
				<h1 bind:this={h1} class="main">You Imagine And We Create&nbsp;!</h1>
				<h2 class="desc">
					Enhancing your digital appearance to make
					your business stand out from the crowd.
				</h2>
			</div>
			<div class="buttons flex-jc-fs flex-ai-cr flex-gap10">
				<button class="contact">
					Contact&nbsp;Us
				</button>
				<button class="about flex-jc-cr flex-ai-cr flex-gap20">
					<span> About&nbsp;us </span>
					<div class="arrow-container flex-jc-fe flex-ai-cr">
						<span class="arrow">
							<Arrow class="svg" />
						</span>
						<span class="arrow">
							<Arrow class="svg" />
						</span>
					</div>
				</button>
			</div>
		</div>
		<div class="right" />
	</div>
	<div class="scroll-dash">scroll <span>———</span></div>
</div>