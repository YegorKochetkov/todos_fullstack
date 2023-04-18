import http from "http";

const url = "http://localhost:3000";
const options = { method: "post" };

const data = { x: 3, y: 4 };

const req = http.request(url, options, (res) => {
	// res.pipe(process.stdout);
	// console.log(res.statusCode);

	const chunks = [];

	res.on("data", (chunk) => {
		chunks.push(chunk);
	});

	res.on("end", () => {
		// const bodyFromServer = Buffer.concat(chunks).toString();
		// console.log(bodyFromServer);

		const bodyFromServer = Buffer.concat(chunks).toString();
		const dataFromServer = JSON.parse(bodyFromServer);
		console.log(bodyFromServer);
		console.log(dataFromServer);
		console.log(dataFromServer.x + dataFromServer.y);
	});
});

req.end(JSON.stringify(data));
