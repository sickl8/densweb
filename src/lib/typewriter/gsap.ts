import gsap from "gsap-trial";
import TextPlugin from "gsap-trial/TextPlugin";

gsap.registerPlugin(TextPlugin);

class GsapTypeWriter {
	tl: gsap.core.Timeline;
	targets: gsap.TweenTarget = "";
	constructor(tVars?: gsap.TimelineVars | undefined) {
		this.tl = gsap.timeline(tVars);
	}
	to(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
		this.targets = targets;
		if (!vars.text) return;
		let text: TextPlugin.Vars = {
			value: "",
		}
		if (typeof vars.text === "string") {
			text.value = vars.text;
			text.speed = 1;
			text.type = "diff";
		}
		else {
			text = vars.text;
			if (!vars.te)
			text.type = "diff";
		}
		let ret = this.tl.to(targets, {
			ease: "linear",
			...vars,
			text
		})
		return this;
	}
	pauseFor(duration: number) {
		this.tl.to(this.targets, { duration });
		return this;
	}
}

export const tw = {
	to: (targets: gsap.TweenTarget, vars: gsap.TweenVars = {}, tVars?: gsap.TimelineVars | undefined) => new GsapTypeWriter(tVars).to(targets, vars)
}