import express from "express";
// import path from "path";

const port = process.env.port || 3000;
const app = express();

app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

app.post("/api", express.json(), (req, res) => {
	console.log(req.body);
	res.end("Done!");
});
// app.post("/api", express.urlencoded({ extended: true }), (req, res) => {
// 	console.log(req.body);
// 	res.end("Done!");
// });

app.use("/", (_req, res) => {
	res.sendStatus(404);
});

// app.use("/", (req, res) => {
// 	const pathFile = path.resolve("public", "index.html");
// 	console.log("🚀 ~ file: app.js:9 ~ pathFile:", pathFile);
// 	res.sendFile(pathFile);

// res.send("Express lessons");
// res.sendStatus(505);
// res.setHeader("Content-Type", "text/html");
// res.end("Express lessons");
// });

// app.use("/", async (req, res, next) => {
// 	res.write("<h1>Use request</h1>");
// 	next();
// });

// app.get("/123", async (req, res) => {
// 	res.end("<h1>Get request more strict</h1>");
// });

app.listen(port, () =>
	console.log(`server is running on http://localhost:${port}`)
);
