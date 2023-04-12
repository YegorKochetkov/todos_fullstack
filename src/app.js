import http from "http";
import fs from "fs";

const server = new http.Server();

server.on("request", (req, res) => {
	if (req.url === "/download") {
		const videoStream = fs.createReadStream("src/video.mp4");

		videoStream.pipe(res);

		videoStream.on("open", () => {
			res.setHeader("Content-Type", "video/mp4");
			res.setHeader(
				"Content-Disposition",
				"attachment; filename=mate-video.mp4"
			);
		});

		videoStream.on("end", () => {
			console.log(process.memoryUsage().external);
		});

		videoStream.on("error", (error) => {
			console.error(error);
			res.statusCode = 500;
			res.write(`Server error: ${error}`);
			res.end();
		});

		// fs.readFile("src/video.mp4", (error, content) => {
		// 	if (error) {
		// 		console.error(error);
		// 		res.statusCode = 500;
		// 		res.end("Server error");

		// 		return;
		// 	}

		// 	if (content) {
		// 		res.setHeader("Content-Type", "video/mp4");
		// 		res.setHeader(
		// 			"Content-Disposition",
		// 			"attachment; filename=mate-video.mp4"
		// 		);
		// 		res.end(content);
		// 	}
		// });
	}

	if (req.url === "/") {
		res.setHeader("Content-Type", "text/html");
		res.end(`
			<a href="/download" target="_blanc">
				Download file
			</a>
		`);
	}
});

server.on("error", (error) => {
	console.error(error);
});

server.listen(3000, () => console.log("server is running on localhost:3000"));
