import { cubicInOut } from 'svelte/easing';

function noop() { }

function now() { return performance.now() }

type ScrollOptions = {
	offset: number;
	duration: number;
	easing: (t: number) => number;
}

const globalOptions = {
	offset: 0,
	duration: 500,
	easing: cubicInOut,
	onStart: noop,
	onDone: noop
}

interface SmoothOptions {
	start: number;
	end: number;
	duration: number;
	easing: (t: number) => number;
}

const currentPosition = (start: number, end: number, elapsed: number, duration: number, easing: (ease: number) => number) => {
	if (elapsed > duration)
		return end;
	return start + (end - start) * easing(elapsed / duration);
};

const smoothScroll = async (options: SmoothOptions, callback: (pos: number) => void): Promise<void> => {
	return new Promise(resolve => {
		const { start, end, duration, easing } = options;
		const clock = now();
		const step = () => {
			const elapsed = now() - clock;
			const position = currentPosition(start, end, elapsed, duration, easing);
			callback(position);
			if (elapsed > duration)
				return resolve();
			window.requestAnimationFrame(step);
		};
		window.requestAnimationFrame(step);
	});
};

const scrollTo = async (to: number | HTMLElement | string, opts: Partial<ScrollOptions> = {}) => {
	const { duration, easing, offset } = Object.assign(globalOptions, opts);
	const start = window.scrollY;
	let endPosition = 0;
	switch (typeof to) {
		case "number":
			endPosition = to;
			break;
		case "string": {
			let el = document.querySelector(to) as HTMLElement;
			if (!el) return;
			endPosition = el.offsetTop;
			break;
		}
		default:
			endPosition = to.offsetTop
	}
	const end = endPosition + offset;
	await smoothScroll({ start, end, duration, easing }, (position) => {
		window.scroll(0, position);
	});
};