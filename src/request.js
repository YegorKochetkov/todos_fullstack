// import http from "http";
import axios from "axios";

const BASE = "http://localhost:3000";
const pathname = "/users/3/friends";
const search = "?sex=m&age=23&age=33";

const href = BASE + pathname + search;

axios
	.get(href)
	.then((res) => {
		console.log(res.status);
		console.log(res.data);
	})
	.catch((error) => {
		console.log(error.response.status);
		console.log(error.response.statusText);
	});

// const options = {
// 	hostname: "localhost",
// 	port: 3000,
// 	path: "/../src/app.js",
// };

// http.get(options, (res) => {
// 	res.setEncoding("utf-8");
// 	res.on("data", console.log);
// });

// const req = http.request("http://dlocalhost:3000", (res) => {
// 	console.log(res.statusCode);

// 	res.setEncoding("utf-8");

// 	res.on("data", (data) => {
// 		console.log(data);
// 	});
// });

// req.on("error", (error) => {
// 	console.error("Error: ", error.message);
// });

// req.end();
