<script lang="ts">
	export let word1 = "word1";
	export let word2 = "word2";
</script>

<div class="container dashtitle flex-column flex flex-col">
	<div class="lineone flex-gap10 flex-ai-cr">
		<div class="dash"></div>
		<div class="word word1">{word1}</div>
	</div>
	<div class="word word2">{word2}</div>
</div>

<style lang="postcss">
	.dash {
		width: 40px;
		height: 4px;
		background-color: var(--torch_red);
		 /* border-radius: 2px; */
	}
	.word {
		user-select: none;
		font-weight: 500;
	}
	.word1 {
		font-size: 20px;	
		font-weight: 400;
	}
	.word2 {
		font-size: 50px;
	}
</style>