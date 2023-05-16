import express from "express";
import cors from "cors";
import { router as todosRouter } from "./routes/todo.js";

const corsOptions = {
	// origin: "http://localhost:5173",
	origin: "*",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const port = process.env.port || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/api/v1/todos", express.json(), todosRouter);

app.use("/", (_req, res) => {
	res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
	res.sendStatus(404);
});

app.listen(port, () =>
	console.log(`Express server is running on port ${port}`)
);
