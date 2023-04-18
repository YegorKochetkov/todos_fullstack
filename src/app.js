import http from "http";
import fs from "fs";
import path from "path";
import zlib from "zlib";
// import { pipeline } from "stream";

const server = new http.Server();

server.on("request", (req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const fileName = url.pathname.slice(1) || "index.html";
	const filePath = path.resolve("public", fileName);

	if (!fs.existsSync(filePath)) {
		res.statusCode = 404;
		res.end("File does not exist");
		return;
	}

	res.setHeader("Content-Encoding", "gzip");

	const file = fs.createReadStream(filePath);
	const gzip = zlib.createGzip();

	file
		.on("error", (error) => {
			console.error("Something went wrong on file reading ", error);
		})
		.pipe(gzip)
		.on("error", (error) => {
			console.error("Something went wrong on compressing ", error);
		})
		.pipe(res)
		.on("error", (error) => {
			console.error("Something went wrong on server", error);
		});

	// pipeline(file, gzip, res, (error) => {
	// 	if (error) {
	// 		console.error("Something went wrong on pipeline ", error);
	// 	}
	// });

	file.on("error", (error) => {
		console.error(error);
		res.statusCode = 500;
		res.end("Something went wrong");
	});

	res.on("close", () => {
		file.destroy();
	});
});

server.on("error", (error) => {
	console.error(error);
});

server.listen(3000, () =>
	console.log("server is running on http://localhost:3000")
);
