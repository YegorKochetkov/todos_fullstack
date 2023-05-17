import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { router as todosRouter } from "./routes/todo.js";
import { testConnection } from "./models/Todo.js";

testConnection();

dotenv.config();

const origin = process.env.NODE_ENV === "local" ? "http://localhost:5173" : "*";
const corsOptions = {
	origin,
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const port = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/api/v1/todos", express.json(), todosRouter);

app.use("/", (_req, res) => {
	res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
	res.sendStatus(404);
});

if (process.env.NODE_ENV === "local") {
	app.listen(port, () =>
		console.log(`Express server is running on http://localhost:${port}`)
	);
}

export default app;
