// Import { appendFile, existsSync, readFile, writeFile } from "fs";
// import { existsSync } from "fs";
import { appendFile, readFile, writeFile } from "fs/promises";

// WriteFile("src/text.txt", "some cool text", (err) => {
// 	if (err) {
// 		console.log(err);
// 	}
// });

await writeFile("src/text.txt", "some cool text");
appendFile("src/text.txt", "\nanother cool text");

// Const exists = existsSync("src/text.txt");

// if (exists) {
// 	appendFile("src/text.txt", "\nanother cool text");
// }

readFile("src/text.txt", { encoding: "utf-8" })
	.then((data) => console.log(data))
	.catch((err) => {
		if (err?.code === "ENOENT") {
			console.log("File doesn't exist");
			return;
		}

		if (err?.code === "EISDIR") {
			console.log("You try to read a folder");
		}
	});

// If (exists) {
// 	appendFile("src/text.txt", "\nanother cool text", (err) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 	});
// }

// readFile("src/text.txt", { encoding: "utf-8" }, (err, data) => {
// 	if (err?.code === "ENOENT") {
// 		console.log("File doesn't exist");
// 		return;
// 	}

// 	if (err?.code === "EISDIR") {
// 		console.log("You try to read a folder");
// 		return;
// 	}

// 	console.log(data);
// });

// Import readline from "readline";

// const terminal = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// });

// terminal.question("Ваше имя? ", (name) => {
// 	console.log(`Привет, ${name}`);
// 	terminal.close();
// });

// Import dotenv from "dotenv";
// import minimist from "minimist";

// dotenv.config();

// Console.log(process.argv.slice(2));
// console.log(minimist(process.argv.slice(2))); // Run node src/app.js --x=1 -y=2 -z 3 --t

// Import common from "../someFolder/common.cjs";

// function add(...numbers) {
// 	let sum = 0;

// 	for (const n of numbers) {
// 		sum += n;
// 	}

// 	return sum;
// }

// console.log(add(1, 2, 3));
// console.log(common);

// Import { add, subtract } from './actions.js';
// import os from 'os';
// import path from 'path';
// import _ from 'lodash';
// const common = require('./someFolder/common');

// delete require.cache[ require.resolve('./someFolder/common.js') ];
// require.cache[ 'os' ] = { exports: 'test' };
// const os = require('os');
// const realOs = require('node:os');
// const common2 = require('./someFolder/common');
// const common = require('./someFolder/common');
// const es = import('./someFolder/es.mjs');

// (async () => {
// 	const common = await import('./someFolder/common.js');
// 	const es = await import('./someFolder/es.mjs');

// 	console.log(common);
// 	console.log(es);
// })();

// console.log(__filename);
// console.log(__dirname);
// console.log(
// 	os,
// 	realOs
// common === common2,
// require.cache[ require.resolve('./someFolder/common.js') ]
// );
// console.log(module);
// console.log(exports);
// console.log(common);
