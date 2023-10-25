<script lang="ts">
	import { type Engine, type ISourceOptions, tsParticles } from "tsparticles-engine";
	import { colors } from "$lib/tailwind";
	import Particles from "svelte-particles";
	import { loadFull } from "tsparticles";
    import { onDestroy, onMount } from "svelte";
    import { scrollVelocity } from "$lib/stores";
	type S = ISourceOptions;
	let particlesConfig: S = {
		background: {
			color: colors.black,
		},
		particles: {
			color: {
				value: colors["torch-red"].base,
			},
			move: {
				enable: true,
				speed: { min: 1, max: 1 },
				
			},
			opacity: {
				value: { min: 0.1, max: 1 },
				animation: {
					enable: true,
					speed: 0.5,
				},
			},
			size: {
				value: {
					min: 0.5,
					max: 1.2,
				},
				animation: {
					speed: 1,
				},
			},
			number: {
				value: 100,
			},
		},
	};
	let onParticlesLoaded = (event: Event) => {
		console.log({event});
	};
	let particlesInit = async (engine: Engine) => {
		await loadFull(engine)
	};
	onMount(() => {
		tsParticles.addMover("myMover", (container) => {
			console.log({container})
			return {
				init() {},
				isEnabled: () => true,
				move(particle) {
					const speedMultiplier = 2;
					particle.velocity.y = particle.initialVelocity.y - speedMultiplier * $scrollVelocity;
				},
			}
		})
	})
</script>

<Particles
	id="particles"
	class="-z-10 relative"
	options={particlesConfig}
	on:particlesLoaded={onParticlesLoaded}
	{particlesInit}
/>
