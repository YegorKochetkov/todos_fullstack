import http from "http";
import {} from "stream";

const server = new http.Server();

// process.stdin.pipe(process.stdout);
// process.stdin.pipe(fs.createWriteStream("./src/copy.txt"));
process.stdin.on("data", (chunk) => {
	setTimeout(() => {
		process.stdout.write("data stream in console with timeout - " + chunk);
	}, 1000);
});

server.on("request", (req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.write("<h1>Streams</h1>");

	for (let i = 5; i > 0; i--) {
		setTimeout(() => {
			res.write(`<p>${i}</p>`);
		}, (5 - i) * 1000);
	}

	setTimeout(() => {
		res.end("<p>Done!</p>");
	}, 5000);
});

server.on("error", (error) => {
	console.error(`Error: ${error}`);
});

server.listen(3000, () =>
	console.log("server is running on http://localhost:3000")
);
