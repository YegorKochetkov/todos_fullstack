import http from "http";
import fs from "fs";
import url from "url";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
	const normalizeUrl = new url.URL(req.url, `http://${req.headers.host}`);
	console.log(req.url);
	console.log(normalizeUrl.searchParams.age);
	console.log(normalizeUrl.searchParams.get("age"));
	console.log(normalizeUrl.searchParams.getAll("age"));

	const params = Object.fromEntries(normalizeUrl.searchParams.entries());
	console.log("🚀 ~ file: app.js:15 ~ params:", params);
	// const fileName = req.url.slice(1) || "index.html";
	// const fileName = req.url.slice(1).replace(/\.\.\//g, "") || "index.html";
	const fileName = normalizeUrl.pathname.slice(1) || "index.html";

	fs.readFile(`./public/${fileName}`, (error, data) => {
		if (error) {
			res.statusCode = 404;
			res.write("Not found. 404");
			res.end();
		} else {
			res.end(data);
		}
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
