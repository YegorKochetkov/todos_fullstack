import express from "express";
import cors from "cors";
import { router as todosRouter } from "./routes/todo.js";

const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const port = process.env.port || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/api/v1/todos", express.json(), todosRouter);

app.use("/", (_req, res) => {
	res.sendStatus(404);
});

app.listen(port, () =>
	console.log(`server is running on http://localhost:${port}`)
);
