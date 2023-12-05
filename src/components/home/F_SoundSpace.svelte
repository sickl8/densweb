<script lang="ts">
	import DashTitle from "../DashTitle.svelte";
	import PausePlayButton from "../PausePlayButton.svelte";
	import path from "path-browserify";
	import { assetsDir } from "src/lib/utils";
	import { onMount } from "svelte";
	import AudioMotionAnalyzer, { type ConstructorOptions } from "audiomotion-analyzer";
	import Spline from 'typescript-cubic-spline';
	import gsap from "gsap-trial";
	import * as _gsap from "gsap-trial";

	let player: HTMLAudioElement | undefined;
	let vizRef: HTMLDivElement | undefined;
	let vizWidth: number = 0;
	let vizHeight: number = 0;
	let isPaused: boolean = true;
	let canvases: HTMLCanvasElement[] = [];
	let polygons: SVGPolygonElement[] = [];

	type VizData = {
		color: string;
		maxDec: number;
		minDec: number;
	}
	enum VizDataEnum {
		Red,
		Yellow,
		Green,
		Cyan,
		Blue,
	}
	let fillStyles = [
		"#ff3452", // red
		"#ebe534", // yellow
		"#34eb59", // green
		"#34ebc3", // cyan
		"#344ffc", // blue
	] as const;
	let vizData: VizData[] = fillStyles.map(color => ({color, maxDec: -25, minDec: -80}));
	vizData[VizDataEnum.Blue].maxDec = -40;
	vizData[VizDataEnum.Green].maxDec = -35;
	vizData[VizDataEnum.Cyan].maxDec = -30;
	const lim = 1;
	const minFreq = 1000, maxFreq = 2000, freqStep = 128, useStep = true;
	function roundingFunc(num: number, by = 4) {
		return Math.round(num * by) / by;
	}
	let pointsForEachCanvas: [number, number][][] = new Array(lim).map(() => {
		return [];
	});
	let updateData = 0;
	setInterval(() => {
		console.log({updateData});
		updateData = 0;
	}, 1000)
	onMount(() => {
		let audioMotion: AudioMotionAnalyzer[] = [];
		let connectSpeakers = true;
		let ctx: CanvasRenderingContext2D;
		let contexts = canvases.map((canvas) => {
			return canvas.getContext("2d")!
		});
		for (let i = 0; i < lim; i++) {
			let options: ConstructorOptions = {
				source: !i ? player : audioMotion[0].connectedSources[0],
				connectSpeakers,
				frequencyScale: "linear",
				maxDecibels: vizData[i].maxDec,
				minDecibels: vizData[i].minDec,
				maxFreq: useStep ? minFreq + (i + 1) * freqStep : minFreq + (i + 1) * (maxFreq - minFreq) / (lim + 1),
				minFreq: useStep ? minFreq + i * freqStep : minFreq + i * (maxFreq - minFreq) / (lim + 1),
				mode: 10,
				onCanvasDraw: (instance: AudioMotionAnalyzer) => {
					if (i === 0) {
						updateData++;
					}
					try {
					let bars = instance.getBars();
					let barX = [...Array.from(Array(bars.length).keys()), bars.length, bars.length + 1];
					let barY = [0, ...bars.map(bar => bar.value[0]), 0];
					let spline = new Spline(barX, barY);
					let dim = {width: vizWidth, height: vizHeight};
					let barSpace = dim.width / (bars.length + 3);
					let minSideSpacesWidth = 10;
					let pathStart = {x: Math.max(barSpace, minSideSpacesWidth), y: dim.height / 2};
					let pathEnd = {x: dim.width - Math.max(barSpace, minSideSpacesWidth), y: dim.height / 2};
					let vizLineWidth = pathEnd.x - pathStart.x;
					let yOffsets: number[] = [];
					for (let x = 0; x < vizLineWidth; x++) {
						yOffsets.push(spline.at((x * (bars.length + 1)) / vizLineWidth));
					}
					let vizMinHeight = 1;
					let halfCanvasHeight = dim.height / 2;
					let straight: [number, number][] = yOffsets	.map((val, index) => [pathStart.x + index, (halfCanvasHeight - Math.max(val * 0.8 * halfCanvasHeight, Math.ceil(vizMinHeight / 2)))])
					let reverse: [number, number][] = yOffsets.reverse()
											.map((val, index) => [pathEnd.x   - index, (halfCanvasHeight + Math.max(val * 0.8 * halfCanvasHeight, Math.floor(vizMinHeight / 2)))]);
					let points = [...straight, ...reverse];
					let roundTo = 4;
					pointsForEachCanvas[i] = points.map(point => { return [roundingFunc(point[0], Math.pow(2, roundTo)), roundingFunc(point[1], Math.pow(2, roundTo))] });
					// if (isPaused)
					// 	return;

					// // poly

					// polygons[i].setAttribute("points", points.map(p => `${p[0]},${p[1]}`).join(" "));

					// // canvas
					// ctx = contexts[i];
					// ctx.clearRect(0,0,dim.width, dim.height)
					// ctx.beginPath();
					// ctx.moveTo(...straight[0]);
					// points.map(([x, y]) => {
					// 	ctx.lineTo(x,y);
					// })
					// ctx.fillStyle = fillStyles[i];
					// ctx.shadowColor = fillStyles[i] + "7F";
					// ctx.shadowBlur = 20;
					// ctx.closePath();
					// ctx.fill();
					} catch {}
				},
				onCanvasResize: undefined,
				smoothing: 0.8,
				useCanvas: false,
				volume: 1,
				weightingFilter: "",
			}
			connectSpeakers = false;
			audioMotion.push(new AudioMotionAnalyzer(null!, options));
		}
		function draw() {
			for (let i = 0; i < lim; i++) {
				let points = pointsForEachCanvas[i];
				let dim = {width: vizWidth, height: vizHeight};
				
				{
					polygons[i].setAttribute("points", points.map(p => `${p[0]},${p[1]}`).join(" "));
				}
				{
					ctx = contexts[i];
					ctx.clearRect(0,0,dim.width, dim.height)
					ctx.beginPath();
					ctx.moveTo(...points[0]);
					points.map(([x, y]) => {
						ctx.lineTo(x,y);
					})
					ctx.fillStyle = fillStyles[i];
					ctx.shadowColor = fillStyles[i] + "7F";
					ctx.shadowBlur = 20;
					ctx.closePath();
					ctx.fill();
				}
			}
			requestAnimationFrame(draw);
		}
		requestAnimationFrame(draw)
	})

	$: {
		console.log({vizHeight, vizWidth})
	}
</script>

<section class="w-full min-h-[calc(100svh-5rem)] flex flex-col items-center justify-start">
	<div class="-shell flex flex-col w-full grow">
		<div class="pb-1.5">
			<div class="-redribon h-2 bg-torch-red-base"></div>
		</div>
		<div class="-blueshade bg-gradient-to-b from-[rgba(0,85,255,0.34)] basis-32"></div>
		<div class="px-4 w-full self-center max-w-[67.5rem] flex [@media(max-width:600px)]:flex-col gap-12 grow [&_>*]:grow [&_>*]:basis-0">
			<div class="-left flex flex-col gap-8 font-light">
				<DashTitle words={["sound", "space"]} class="max-w-[67.5rem] --max-w-5xl --max-w-[80%] self-center"/>
				<h3 class="-desc">
					Our in-house sound team will provide you with the best sonic experience.
				</h3>
				<div class="-player flex gap-2 items-stretch h-24">
					<audio controls={false} src={path.join(assetsDir, "audio", "den_soundspace.wav")} id="music" bind:this={player} bind:paused={isPaused}></audio>
					<button class="-playpause w-20 h-20 rounded-full cursor-default self-center" on:click={() => { isPaused = !isPaused;}}>
						<PausePlayButton class="w-full h-full [&_>*]:cursor-pointer" paused={isPaused}></PausePlayButton>
					</button>
					<div class="-visualizer relative grow" bind:clientWidth={vizWidth} bind:clientHeight={vizHeight}>
						{#each {length: lim} as _, i}
							<canvas class="-vizcanvas absolute top-0 left-0 dim-full [mix-blend-mode:screen]" width="{vizWidth}px" height="{vizHeight}px" style="translate: 0 {vizHeight * 0}px; width: {vizWidth}px; height: {vizHeight}px" bind:this={canvases[i]}></canvas>
						{/each}
						<svg class="absolute top-0 left-0 w-full" style={`translate: 0 ${vizHeight * 1}px`}>
							{#each {length: lim} as _, i}
								<polygon class="-vizpoly  max-w-full " style={`mix-blend-mode: screen; filter: drop-shadow(0px 0px 10px ${fillStyles[i]}${Math.floor(0.5 * 255).toString(16)})`} bind:this={polygons[i]} fill={fillStyles[i]}></polygon>
							{/each}
						</svg>
					</div>
				</div>
			</div>
			<div class="-right"></div>
		</div>
	</div>
</section>

<style lang="postcss">
	.-redribon {
		background: linear-gradient(90deg, rgb(226, 23, 23) 0%, rgb(200, 24, 26) 5%, rgb(53, 30, 43) 20%, rgb(53, 30, 43) 30%, rgb(223, 22, 22) 45%, rgb(207, 23, 24) 55%, rgb(53, 30, 43) 70%, rgb(53, 30, 43) 80%, rgb(205, 23, 25) 95%, rgb(230, 22, 22) 100%);
	}
</style>