import http from "http";
import fs from "fs";

const server = new http.Server();

server.on("request", (req, res) => {
	if (req.url === "/favicon.ico") {
		res.end();
		return;
	}

	const filename = req.url === "/" ? "package-lock.json" : "wrong_file_name";
	const filePackage = fs.createReadStream(filename);

	filePackage.on("open", () => {
		console.log("open");
		res.setHeader("Content-Type", "text/json");
	});

	filePackage.on("error", (error) => {
		res.statusCode = 404;
		res.write(`Wrong file name: ${error}`);
		res.end();
	});

	res.on("close", () => {
		filePackage.destroy();
	});

	filePackage.on("close", () => {
		console.log("close");
	});

	// filePackage.pipe(res);
	filePackage.on("data", (chunk) => {
		const canProceed = res.write(chunk);

		if (canProceed) {
			return;
		}

		filePackage.pause();

		res.once("drain", () => {
			filePackage.resume();
		});
	});

	filePackage.on("end", () => {
		res.end();
	});
});

server.on("error", (error) => {
	console.error(error);
});

server.listen(3000, () =>
	console.log("server is running on http://localhost:3000")
);
