import normalizeWheel from "normalize-wheel";
import gsap from "gsap-trial";
import _ from "lodash";
import { writable } from "svelte/store";

class Signal<T> {
	private _value: T;
	private sublist = new Set<{cb: (v: T) => void, getIdentical: boolean}>();
	constructor(initial: T) {
		this._value = initial;
	}
	get value() {
		return this._value;
	}
	set value(v) {
		let same = (this._value === v);
		this._value = v;
		this.sublist.forEach(subscriber => {
			if (!subscriber.getIdentical && same) return;
			subscriber.cb(v)
		})
	}
	sub(subscriber: (v: T) => void, getInitial: boolean = false, getIdentical: boolean = true) {
		this.sublist.add({cb: subscriber, getIdentical});
		if (getInitial)
			subscriber(this._value);
	}
}

export type SmoothScrollOptions = {
	scrollable: HTMLElement | Window;
	infinite: {
		minScroll: number;
		maxScroll: number;
	};
	wheelMultiplier: number;
	direction: "vertical" | "horizontal";
	scrollAmount: number;
	ease: string;
	duration: number;
}

export class SmoothScroll {
	opt: SmoothScrollOptions;
	velocity = new Signal(0);
	scroll = new Signal(0);
	animatedScroll = new Signal(0);
	tween: gsap.core.Tween = gsap.to({}, {});
	shift = false;
	scrollVelocityStore = writable({ velocity: 0, scroll: 0 });
	sTo: ScrollToOptions = { };
	constructor(options: Partial<SmoothScrollOptions>) {
		this.opt = {
			infinite: {
				maxScroll: 1,
				minScroll: 0,
			},
			...options,
			wheelMultiplier: Math.abs(options.wheelMultiplier ?? 10),
			scrollable: options.scrollable ?? window,
			direction: options.direction ?? "vertical",
			scrollAmount: options.scrollAmount ?? 100,
			ease: options.ease ?? "power3.out",
			duration: options.duration ?? 2,
		}
		// setInterval(() => {
		// 	this._scrollTo(10, true);
		// }, 100)
		this.opt.scrollable.addEventListener("wheel", (_e: Event) => {

			// _e.preventDefault();
			let wheelEvent = _e as WheelEvent;
			const e = normalizeWheel(_e);
			// console.log(e);
			this.shift = wheelEvent.shiftKey;
			this._scrollTo(e.spinY, true);

		})
		// this.velocity.sub((velocity) => {
		// 	if (this.opt.scrollable instanceof Window === false) {
		// 		let container = this.opt.scrollable as HTMLElement;
		// 		requestAnimationFrame(() => {
		// 			if (this.shift === (this.opt.direction === "horizontal")) {
		// 				const decimalPlaces = 1;
		// 				velocity = Math.round((velocity + Number.EPSILON) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
		// 				let idx = +(this.shift && this.opt.direction === "horizontal");
		// 				let scrollKey = (["top", "left"] as const)[idx];
		// 				let containerScrollOriginKey = (["scrollTop", "scrollLeft"] as const)[idx];
		// 				let containerScrollDimKey = (["scrollHeight", "scrollWidth"] as const)[idx];
		// 				let containerClientDimKey = (["clientHeight", "clientWidth"] as const)[idx];
		// 				let maxScroll = container[containerScrollDimKey] - container[containerClientDimKey];
		// 				let delta = container[containerScrollOriginKey] + Math.round(velocity * this.opt.wheelMultiplier);
		// 				if (this.opt.infinite) {
		// 					if (delta < 0) {
		// 						delta = maxScroll + delta % maxScroll;
		// 					}
		// 					else if (delta > maxScroll) {
		// 						delta = delta % maxScroll;
		// 					}
		// 				}
		// 				this.sTo[scrollKey] = delta;
		// 				container.scrollTo(this.sTo);
		// 				this.scrollVelocityStore.set({velocity, scroll: delta})
		// 			}
		// 		})
		// 	}
		// })
		this.scroll.sub((s) => {
			let el = this.opt.scrollable as HTMLElement;
			let ease = this.opt.ease;
			if (this.opt.ease.endsWith(".inOut") && this.tween.progress() < 0.8) {
				ease = ease.replace(".inOut", ".out");
			}
			this.tween.kill();
			this.tween = gsap.to(this.animatedScroll, {
				value: this.scroll.value,
				duration: this.opt.duration,
				ease: ease,
			})
		})
		// let ix = 0;
		this.animatedScroll.sub((animated) => {
			// console.log({animated})
			let container = this.opt.scrollable as HTMLElement;
			let idx = +(this.opt.direction === "horizontal");
			let scrollKey = (["top", "left"] as const)[idx];
			let containerScrollOriginKey = (["scrollTop", "scrollLeft"] as const)[idx];
			let containerScrollDimKey = (["scrollHeight", "scrollWidth"] as const)[idx];
			let containerClientDimKey = (["clientHeight", "clientWidth"] as const)[idx];
			let maxScroll = container[containerScrollDimKey] - container[containerClientDimKey];
			let delta = animated;
			if (this.opt.infinite) {
				if (delta < 0) {
					delta = maxScroll + delta % maxScroll;
				}
				else if (delta > maxScroll) {
					delta = delta % maxScroll;
				}
			}
			this.sTo[scrollKey] = delta;
			// console.log(ix++, this.sTo);
			container.scrollTo(this.sTo);
		})
	}
	oldValue = 0;
	scrollLeft(ntimes = 1) {
		this.scrollTo(this.opt.scrollAmount * Math.abs(ntimes));
	}
	scrollRight(ntimes = 1) {
		this.scrollTo(-this.opt.scrollAmount * Math.abs(ntimes));
	}
	scrollNtimes(ntimes: number) {
		this.scrollTo(this.opt.scrollAmount * ntimes);
	}
	private _scrollTo(to: number | HTMLElement, delta: boolean = false) {
		if (to instanceof HTMLElement) {
			
		}
		else {
			if (delta) {
				// console.log(`shift: ${this.shift}, dir: ${this.opt.direction}`)
				if (this.shift === (this.opt.direction === "horizontal")) {
					// console.log("killing?")
					// let progress = this.tween.progress();
					// this.tween.kill();
					// let maxSpeed = 10;
					// let velocity = 0;
					// // velocity = this.velocity.value;
					// let warmUpDuration = 0.1;
					// velocity = progress < warmUpDuration ? this.oldValue : this.velocity.value;
					// let newValue = (velocity * (+(velocity > 0 === to > 0)) + to);
					// newValue = Math.min(Math.max(newValue, -maxSpeed), maxSpeed);
					// this.oldValue = newValue;
					// this.tween = gsap.to(this.velocity, {
					// 	keyframes: [{
					// 		value: newValue,
					// 		duration: warmUpDuration,
					// 		ease: "power1.inOut",
					// 	}, {
					// 		value: 0,
					// 		duration: 1.5,
					// 		ease: "power2.out",
					// 		// ease: "none",
					// 	}],
					// })
					if (this.shift === (this.opt.direction === "horizontal")) {
						this.scrollTo(Math.sign(to) * this.opt.scrollAmount);
					}
				}
			}
		}
	}
	scrollTo(to: number, delta = true) {
		this.scroll.value = this.scroll.value * +delta + to;
	}
	onScroll(cb: (data: { scroll: number, velocity: number}) => void) {
		let oldV = 0;
		let oldC = 0;
		this.scrollVelocityStore.subscribe((d) => {
			if (oldV != d.velocity || oldC != d.scroll) {
				cb(d);
				oldV = d.velocity;
				oldC = d.scroll;
			}
		});
	}
}