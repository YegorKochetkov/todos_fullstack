import http from "http";
import fs from "fs";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	const fileName = req.url.slice(1) || "index.html";

	fs.readFile(`./public/${fileName}`, (error, data) => {
		if (!error) {
			res.end(data);
		}

		if (error) {
			res.statusCode = 404;
			res.write("Not found. 404");
		}

		res.end();
	});
	// Res.setHeader("Content-Type", "text/plain");
	console.log(req.url);
	// Res.write("<h1>hello</h1>");
	// res.write("yegor</br>");
	// res.end("Hello, Yegor");
	// Res.end("Hello, Yegor");
});

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
