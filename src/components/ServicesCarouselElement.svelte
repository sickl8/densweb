<script lang="ts">
	type Service = { domain: string; skills: string[] };
	export let data: Service;

    import IntersectingCircles from "./IntersectingCircles.svg.svelte";

	function capitalizeWord(word: string) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}

	function capitalizeSentence(sentence: string) {
		return sentence
			.split(" ")
			.map((word) => capitalizeWord(word))
			.join(" ");
	}
</script>

<li class="-card-container -items --snap-center scale-100" data-scroll-snap-align="center">
	<div class="-card w-[20rem]">
		<div class="-title">
			<div class="icon">
				<IntersectingCircles />
			</div>
			<div class="-barrier" />
			<h2 class="-text">
				{capitalizeSentence(data.domain)}
			</h2>
		</div>
		<ul class="-skills">
			{#each data.skills as skill}
				<li class="-skill">
					{capitalizeSentence(skill)}
				</li>
			{/each}
		</ul>
	</div>
</li>
