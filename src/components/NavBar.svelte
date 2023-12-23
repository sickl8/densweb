<script lang="ts">
	import { navData, sideBarIsOn } from "$lib/stores";
	import BurgerMenu from "./BurgerMenu.svelte";
	import Logo from "./Logo.svelte";
	import SideBar from "./SideBar.svelte";
	import Anchor from "./Anchor.svelte";

</script>

<header class="w-full h-20 sticky z-50 top-0 left-0 flex flex-col items-center bg-gradient-to-b from-black/90 from-10% via-black/70 via-40% to-transparent to-100%">
	<nav class="w-full max-w-[67.5rem] h-full">
		<ul class="h-full w-full flex justify-between items-center">
			<li class="h-full aspect-square flex justify-center items-center">
				<Anchor class="p-1 w-[65%] h-[65%]" href="/#">
					<Logo class="h-full w-full"/>
				</Anchor>
			</li>
			<li class="h-full">
				<div class="relative bm-sb-wrapper sm:hidden h-full flex justify-center items-center">
					<SideBar />
					<button class="relative z-20 h-[80%]" on:click={() => { sideBarIsOn.update((x) => !x); }}>
						<BurgerMenu />
					</button>
				</div>
				<div class="h-full w-full hidden sm:flex flex-col justify-center gap-0.5 px-4">
					<div class="underscore h-0.5 w-full" style="" />
					<ul class="-nav-list hover:text-white/50 flex justify-center items-center">
						{#each $navData as el}
							<li class="lidots group hover:text-white transition-colors pr-8 last:pr-0">
								<Anchor class="no-underline text-current" href={el.path + el.hash}>
									{el.text}
								</Anchor>
								<div class="-container flex w-12 translate-x-[1px] justify-end group-hover:justify-start">
									<div class="-underscore h-0.5 w-0 group-hover:w-full bg-torch-red-base transition-all duration-300" style="" />
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	.-nav-list {
		.lidots {
			&:first-child::marker {
				content: none;
			}
			&::marker {
				content: ".   ";
			}
		}
	}
</style>