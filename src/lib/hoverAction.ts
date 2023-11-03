import type { MouseEventHandler } from "svelte/elements";

type HoverEventWithoutTarget = (MouseEvent | FocusEvent)
type HoverEvent = HoverEventWithoutTarget & { currentTarget: HTMLElement }


export function hover(node: HTMLElement, callback: (event: HoverEvent) => void, listenToMouseMove: boolean = false) {
	function cb(event: HoverEventWithoutTarget) {
		callback(event as HoverEvent)
	}
	node.addEventListener("mouseover", cb);
	node.addEventListener("mouseleave", cb);
	node.addEventListener("focus", cb);
	listenToMouseMove &&
	node.addEventListener("mousemove", cb);
	return {
		destroy() {
			node.removeEventListener("mouseover", cb);
			node.removeEventListener("mouseleave", cb);
			node.removeEventListener("focus", cb);
			listenToMouseMove &&
			node.removeEventListener("mousemove", cb);
		}
	}
}