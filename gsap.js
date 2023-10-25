#!/usr/bin/env node
const fs = require("fs");
const { argv } = require("process");
const beautify = require("js-beautify/js").js;

let pathToFile = argv[2]
if (typeof pathToFile === "string") {
	let text = fs.readFileSync(pathToFile).toString();
	text = beautify(text, { indent_size: 4, indent_char: "\t" });
	text = text.replace(/v\(([0-9]+(\s*,\s*[0-9]+)*,?)\)/gm, (substring, ...args) => {
		if (Array.isArray(args) && typeof args[0] === "string")
			return JSON.stringify(String.fromCharCode.apply(null, args[0].split(",").map(n => parseInt(n))));
		return substring;
	})
	text = text.replace('"codepen.io", ', '"codepen.io", "stage.dendigitals.com", ');
	console.log(text);
}
else {
	console.log("usage: gsap.js <file_path>")
}