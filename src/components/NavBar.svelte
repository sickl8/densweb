<script lang="ts">
	import { navData, sideBarIsOn } from "$lib/stores";
	import BurgerMenu from "./BurgerMenu.svelte";
	import Logo from "./Logo.svelte";
	import SideBar from "./SideBar.svelte";
</script>

<header class="w-full h-20 sticky z-10 top-0 flex flex-col items-center bg-gradient-to-b from-black/90 from-10% via-black/70 via-40% to-transparent to-100%">
	<nav class="w-full max-w-[67.5rem] h-full">
		<ul class="h-full w-full flex justify-between items-center">
			<li class="h-full aspect-square flex justify-center items-center">
				<a class="p-1 w-[65%] h-[65%]" href="/#">
					<Logo class="h-full w-full"/>
				</a>
			</li>
			<li class="h-full">
				<div class="bm-sb-wrapper sm:hidden h-full flex justify-center items-center">
					<button class="h-[80%]" on:click={() => { sideBarIsOn.update((x) => !x); }}>
						<BurgerMenu />
					</button>
					<SideBar />
				</div>
				<div class="h-full w-full hidden sm:flex flex-col justify-center gap-0.5 px-4">
					<div class="underscore h-0.5 w-full" style="" />
					<ul class="-nav-list flex justify-center items-center gap-8">
						{#each $navData as el}
							<li class="lidots transition-colors">
								<a class="no-underline text-current" href={el.path + el.selector}>
									{el.text}
								</a>
							</li>
						{/each}
					</ul>
					<div class="underscore h-0.5 w-8 bg-torch-red-base" style="" />
				</div>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	.-nav-list {
		&:hover {
			@apply text-white/50;
		}
		.lidots {
			&:hover {
				@apply text-white;
			}
			&:first-child::marker {
				content: none;
			}
			&::marker {
				content: ".   ";
			}
		}
	}
</style>