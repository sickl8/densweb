<script lang="ts">
	import DashTitle from "../DashTitle.svelte";
	import PausePlayButton from "../PausePlayButton.svelte";
	import path from "path-browserify";
	import { assetsDir, roundingFunc } from "src/lib/utils";
	import { onDestroy, onMount } from "svelte";
	import AudioMotionAnalyzer, { type AnalyzerBarData, type ConstructorOptions } from "audiomotion-analyzer";
	import Spline from 'typescript-cubic-spline';
	import * as _gsap from "gsap-trial";

	let player: HTMLAudioElement | undefined;
	let vizWidth: number = 0;
	let vizHeight: number = 0;
	let isPaused: boolean = true;
	let mainCanvas: HTMLCanvasElement;

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
	const maxDec = -25, minDec = -80;
	let vizData: VizData[] = fillStyles.map(color => ({color, maxDec, minDec}));
	vizData[VizDataEnum.Blue].maxDec = -40;
	vizData[VizDataEnum.Green].maxDec = -35;
	vizData[VizDataEnum.Cyan].maxDec = -30;
	const lim = 5;
	const minFreq = 1000, maxFreq = 2000, freqStep = 128, useStep = true;
	let data: AnalyzerBarData[] = [];
	let audioMotion: AudioMotionAnalyzer;
	onMount(() => {
		let options: ConstructorOptions = {
			source: player,
			connectSpeakers: true,
			frequencyScale: "linear",
			maxDecibels: maxDec,
			minDecibels: minDec,
			maxFreq: minFreq + lim * freqStep,
			minFreq: minFreq,
			mode: 10,
			onCanvasResize: undefined,
			smoothing: 0.8,
			useCanvas: false,
			volume: 1,
			weightingFilter: "",
			onCanvasDraw: (instance: AudioMotionAnalyzer) => {
				data = instance.getBars();
			},
		}
		audioMotion = new AudioMotionAnalyzer(undefined, options);
	})
	let tid = -1;
	onMount(() => {
		let ctx = mainCanvas.getContext("2d")!;
		function draw() {
			tid = requestAnimationFrame(draw);
			const dpr = devicePixelRatio;
			const dim = {w: vizWidth * dpr, h: vizHeight * dpr};
			ctx.resetTransform();
			ctx.scale(dpr, dpr);
			ctx.clearRect(0, 0, dim.w, dim.h);
			mainCanvas.width = dim.w;
			mainCanvas.height = dim.h;
			for (let i = 0; i < lim; i++) {
				try {
				let bars = data.slice(i * data.length / lim, (i + 1) * data.length / lim);
				let barX = [...Array.from(Array(bars.length).keys()), bars.length, bars.length + 1];
				let barY = [0, ...bars.map(bar => bar.value[0] * ((maxDec - minDec) / (vizData[i].maxDec - vizData[i].minDec))), 0];
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
		}
		draw();
	})
	onDestroy(() => {
		audioMotion.destroy();
		cancelAnimationFrame(tid);
	})
</script>

<section class="w-full min-h-[calc(100svh)] pt-[5rem] flex flex-col items-center justify-start">
	<div class="-shell flex flex-col w-full grow">
		<div class="pb-1.5">
			<div class="-redribon h-2 bg-torch-red-base"></div>
		</div>
		<div class="-blueshade bg-gradient-to-b from-[rgba(0,85,255,0.34)] basis-32"></div>
		<div class="px-4 relative w-full self-center max-w-[67.5rem] flex items-center gap-6 h-fit --grow [&_>*]:grow [&_>*]:basis-0">
			<div class="-left [@media(max-width:855px)]:py-8 flex flex-col gap-8 font-light h-fit">
				<DashTitle words={["sound", "space"]} class="max-w-[67.5rem] --max-w-5xl --max-w-[80%] self-center"/>
				<h3 class="-desc">
					Our in-house sound team will provide you with the best sonic experience.
				</h3>
				<div class="-player flex gap-2 items-stretch min-h-fit -h-24">
					<audio controls={false} src={path.join(assetsDir, "audio", "den_soundspace.wav")} id="music" bind:this={player} bind:paused={isPaused}></audio>
					<div class="-buttons flex flex-col h-fit self-center">
						<button class="-playpause w-20 h-20 basis-20 rounded-full cursor-default" on:click={() => { isPaused = !isPaused;}}>
							<PausePlayButton class="w-full h-full [&_>*]:cursor-pointer" paused={isPaused}></PausePlayButton>
						</button>
					</div>
					<div class="-visualizer relative grow h-32" bind:clientWidth={vizWidth} bind:clientHeight={vizHeight}>
						<canvas class="-vizcanvas absolute top-0 left-0 dim-full [mix-blend-mode:screen]" width="{vizWidth * devicePixelRatio}px" height="{vizHeight * devicePixelRatio}px" style="translate: 0 {vizHeight * 0}px; width: {vizWidth}px; height: {vizHeight}px" bind:this={mainCanvas}></canvas>
					</div>
				</div>
			</div>
			<div class="-right [@media(max-width:855px)]:absolute [@media(max-width:690px)]:hidden top-0 left-0 -z-10 [@media(max-width:855px)]:opacity-30">
				<img src={path.join(assetsDir, "img", "soundspacethumb.jpg")} alt="">
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.-redribon {
		background: linear-gradient(90deg, rgb(226, 23, 23) 0%, rgb(200, 24, 26) 5%, rgb(53, 30, 43) 20%, rgb(53, 30, 43) 30%, rgb(223, 22, 22) 45%, rgb(207, 23, 24) 55%, rgb(53, 30, 43) 70%, rgb(53, 30, 43) 80%, rgb(205, 23, 25) 95%, rgb(230, 22, 22) 100%);
	}
</style>