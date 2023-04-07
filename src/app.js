import common from "../someFolder/common.cjs";

function add(...numbers) {
	let sum = 0;

	for (const n of numbers) {
		sum += n;
	}

	return sum;
}

console.log(add(1, 2, 3));
console.log(common);

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
