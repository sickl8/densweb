<script lang="ts">
	import DashTitle from "../DashTitle.svelte";
	import PausePlayButton from "../PausePlayButton.svelte";
	import path from "path-browserify";
	import { assetsDir } from "src/lib/utils";
	import { onMount } from "svelte";
	import AudioMotionAnalyzer, { type AnalyzerBarData, type ConstructorOptions } from "./audiomotion";
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
	let timePerCanvasFrame = 0;
	let data: AnalyzerBarData[] = [];
	let dataArray: Float32Array[] = []
	let audioMotion: AudioMotionAnalyzer;
	onMount(() => {
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
				data = instance.getBars();
				if (!isPaused)
					dataArray.push(new Float32Array(data.map(d => d.value[0])));
				randomValueFrame = data[Math.round(Math.random() * (data.length - 1))].value[0];
				let now = performance.now();
				audioRendersPs = nAudioRenders / ((now - audioStartTime) / 1000);
				nAudioRenders++;
			},
		}
		audioMotion = new AudioMotionAnalyzer(undefined, options);
	})
	let fps = 0;
	let frame = 0;
	onMount(() => {
		let fpsCounter = 0;
		let ctx = mainCanvas.getContext("2d")!;
		setInterval(() => {
			fps = fpsCounter * 2;
			fpsCounter = 0;
		}, 500)
		function draw() {
			fpsCounter++;
			requestAnimationFrame(draw)
			// const dpr = Math.max(devicePixelRatio, 1);
			const dpr = devicePixelRatio;
			const dim = {w: vizWidth * dpr, h: vizHeight * dpr};
			ctx.resetTransform();
			ctx.scale(dpr, dpr);
			ctx.clearRect(0, 0, dim.w, dim.h);
			// if (mainCanvas.width !== dim.w)
			mainCanvas.width = dim.w;
			// if (mainCanvas.height !== dim.h)
			mainCanvas.height = dim.h;
			timePerCanvasFrame = performance.now();
			let thisData = dataArray[frame];
			// console.log({frame, thisData, "dataArray.length": dataArray.length});
			// try { console.log({thisData0: thisData[0].value[0]})} catch {}
			for (let i = 0; i < lim; i++) {
				try {
				let bars = thisData.slice(i * thisData.length / lim, (i + 1) * thisData.length / lim);
				let barX = [...Array.from(Array(bars.length).keys()), bars.length, bars.length + 1];
				let barY = [0, ...bars.map(bar => bar), 0];
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
				// ctx.globalCompositeOperation = "screen";
				ctx.beginPath();
				ctx.moveTo(...points[0]);
				points.forEach((point) => {
					ctx.lineTo(...point);
				})
				ctx.fillStyle = fillStyles[i];
				ctx.shadowColor = fillStyles[i] + "7F";
				// ctx.shadowBlur = 20;
				ctx.closePath();
				ctx.fill();
				} catch {}
			}
			timePerCanvasFrame = performance.now() - timePerCanvasFrame;
			if (frame < dataArray.length && !isPaused2) {
				console.log("frame++")
				frame++;
			}
			else {
				frame = 0;
				isPaused2 = true;
			}
		}
		draw();
	})
</script>

<section class="w-full min-h-[calc((100svh-5rem)*2)] flex flex-col items-center justify-start">
	<div class="-shell flex flex-col w-full grow">
		<div class="pb-1.5">
			<div class="-redribon h-2 bg-torch-red-base"></div>
		</div>
		<div class="-blueshade bg-gradient-to-b from-[rgba(0,85,255,0.34)] basis-32"></div>
		<div class="px-4 w-full self-center max-w-[67.5rem] flex [@media(max-width:600px)]:flex-col gap-12 grow [&_>*]:grow [&_>*]:basis-0">
			<div class="-left flex flex-col gap-8 font-light h-fit">
				<DashTitle words={["sound", "space"]} class="max-w-[67.5rem] --max-w-5xl --max-w-[80%] self-center"/>
				<h3 class="-desc">
					Our in-house sound team will provide you with the best sonic experience.
				</h3>
				<div class="-stats">
					audioRendersPs: {audioRendersPs.toFixed(2)}<br/>
					randomValueFrame: {randomValueFrame.toFixed(2)}<br/>
					timePerCanvasFrame: {timePerCanvasFrame.toFixed(2)}ms<br/>
					canvasPossibleFramesPs: {(1000 / timePerCanvasFrame).toFixed(2)}<br/>
					canvasFramesPs: {fps.toFixed(2)}<br/>
					frame: {frame}<br/>
				</div>
				<div class="-player flex gap-2 items-stretch h-24">
					<audio controls={false} src={path.join(assetsDir, "audio", "den_soundspace.wav")} id="music" bind:this={player} bind:paused={isPaused}></audio>
					<div class="-buttons flex flex-col h-fit">
						<button class="bg-gray-300 text-black text-sm p-2 rounded border border-gray-700" on:click={() => { audioMotion.destroy(); }}>destroy analyser</button>
						<button class="bg-gray-300 text-black text-sm p-2 rounded border border-gray-700" on:click={() => {
							let anchor = document.createElement("a");
							anchor.href = URL.createObjectURL(new Blob(dataArray, {type: 'application/octet-stream'}));
							anchor.download = 'data.bin'
							anchor.click();
						}}>dump data array</button>
						<button class="-playpause w-20 h-20 basis-20 rounded-full cursor-default self-center" on:click={() => { isPaused = !isPaused;}}>
							<PausePlayButton class="w-full h-full [&_>*]:cursor-pointer" paused={isPaused}></PausePlayButton>
						</button>
						<button class="-playpause w-20 h-20 basis-20 rounded-full cursor-default self-center" on:click={() => { isPaused2 = !isPaused2;}}>
							<PausePlayButton class="w-full h-full [&_>*]:cursor-pointer" paused={isPaused2}></PausePlayButton>
						</button>
					</div>
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