<script lang="ts">
	import DashTitle from "../DashTitle.svelte";
	import PausePlayButton from "../PausePlayButton.svelte";
	import path from "path-browserify";
	import { assetsDir } from "src/lib/utils";
	import { onMount } from "svelte";
	import AudioMotionAnalyzer, { type ConstructorOptions } from "./audiomotion";
	import Spline from 'typescript-cubic-spline';
	import gsap from "gsap-trial";
	import * as _gsap from "gsap-trial";

	let player: HTMLAudioElement | undefined;
	let vizRef: HTMLDivElement | undefined;
	let vizWidth: number = 0;
	let vizHeight: number = 0;
	let isPaused: boolean = true;
	let isPaused2: boolean = true;
	let mainCanvas: HTMLCanvasElement;
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
	const lim = 5;
	const minFreq = 1000, maxFreq = 2000, freqStep = 128, useStep = true;
	function roundingFunc(num: number, by = 4) {
		return Math.round(num * by) / by;
	}
	let audioRendersPs = 0;
	let randomValueFrame = 0;
	onMount(() => {
		let ctx = mainCanvas.getContext("2d")!;
		let nAudioRenders = 0;
		let audioStartTime = performance.now();
		let options: ConstructorOptions = {
			source: player,
			connectSpeakers: true,
			frequencyScale: "linear",
			maxDecibels: vizData[0].maxDec,
			minDecibels: vizData[0].minDec,
			maxFreq: minFreq + lim * freqStep,
			minFreq: minFreq,
			mode: 10,
			// fftSize: Math.pow(2, 10),
			onCanvasResize: undefined,
			smoothing: 0.8,
			useCanvas: false,
			volume: 1,
			weightingFilter: "",
			onCanvasDraw: (instance: AudioMotionAnalyzer) => {
				// const dpr = Math.max(devicePixelRatio, 1);
				const dpr = devicePixelRatio;
				const dim = {w: vizWidth * dpr, h: vizHeight * dpr};
				ctx.resetTransform();
				ctx.scale(dpr, dpr);
				ctx.clearRect(0, 0, dim.w, dim.h);
				mainCanvas.width = dim.w;
				mainCanvas.height = dim.h;
				let data = instance.getBars();
				randomValueFrame = data[Math.round(Math.random() * (data.length - 1))].value[0];
				let now = performance.now();
				audioRendersPs = nAudioRenders / ((now - audioStartTime) / 1000);
				nAudioRenders++;

				for (let i = 0; i < lim; i++) {
					try {
					let bars = data.slice(i * data.length / lim, (i + 1) * data.length / lim);
					let barX = [...Array.from(Array(bars.length).keys()), bars.length, bars.length + 1];
					let barY = [0, ...bars.map(bar => bar.value[0]), 0];
					let spline = new Spline(barX, barY);
					let barSpace = dim.w / (bars.length + 3);
					let minSideSpacesWidth = 20;
					let pathStart = {x: Math.max(barSpace, minSideSpacesWidth), y: dim.h / 2};
					let pathEnd = {x: dim.w - Math.max(barSpace, minSideSpacesWidth), y: dim.h / 2};
					let vizLineWidth = pathEnd.x - pathStart.x;
					let yOffsets: number[] = [];
					for (let x = 0; x < vizLineWidth; x++) {
						yOffsets.push(spline.at((x * (bars.length + 1)) / vizLineWidth));
					}
					let vizMinHeight = 1;
					let halfCanvasHeight = dim.h / 2;
					let straight: [number, number][] = yOffsets	.map((val, index) => [pathStart.x + index, (halfCanvasHeight - Math.max(val * 0.8 * halfCanvasHeight, Math.ceil(vizMinHeight / 2)))])
					let reverse: [number, number][] = yOffsets.reverse()
											.map((val, index) => [pathEnd.x   - index, (halfCanvasHeight + Math.max(val * 0.8 * halfCanvasHeight, Math.floor(vizMinHeight / 2)))]);
					let points = [...straight, ...reverse];
					let roundTo = 4;
					points = points.map(point => { return [roundingFunc(point[0], Math.pow(2, roundTo)), roundingFunc(point[1], Math.pow(2, roundTo))] });
					// // canvas
					ctx.globalCompositeOperation = "screen";
					ctx.beginPath();
					ctx.moveTo(...points[0]);
					points.forEach((point) => {
						ctx.lineTo(...point);
					})
					ctx.fillStyle = fillStyles[i];
					ctx.shadowColor = fillStyles[i] + "7F";
					ctx.shadowBlur = 20;
					ctx.closePath();
					ctx.fill();
					} catch {}
				}
			},
		}
		let audioMotion = new AudioMotionAnalyzer(undefined, options);
	})
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
				<div class="-stats">
					audioRendersPs: {audioRendersPs} <br/>
					randomValueFrame: {randomValueFrame}
				</div>
				<div class="-player flex gap-2 items-stretch h-24">
					<audio controls={false} src={path.join(assetsDir, "audio", "den_soundspace.wav")} id="music" bind:this={player} bind:paused={isPaused}></audio>
					<button class="-playpause w-20 h-20 rounded-full cursor-default self-center" on:click={() => { isPaused = !isPaused;}}>
						<PausePlayButton class="w-full h-full [&_>*]:cursor-pointer" paused={isPaused}></PausePlayButton>
					</button>
					<div class="-visualizer relative grow" bind:clientWidth={vizWidth} bind:clientHeight={vizHeight}>
						<canvas class="-vizcanvas absolute top-0 left-0 dim-full [mix-blend-mode:screen]" width="{vizWidth * devicePixelRatio}px" height="{vizHeight * devicePixelRatio}px" style="translate: 0 {vizHeight * 0}px; width: {vizWidth}px; height: {vizHeight}px" bind:this={mainCanvas}></canvas>
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