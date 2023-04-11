import http from "http";

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
	// Res.setHeader("Content-Type", "text/plain");
	res.write("<h1>hello</h1>");
	res.write("yegor</br>");
	res.end("Hello, Yegor");
	// Res.end("Hello, Yegor");
});

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
