import express from "express";
import cors from "cors";

const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const todos = [
	{ id: "1", title: "html", completed: true },
	{ id: "2", title: "css", completed: false },
	{ id: "3", title: "js", completed: false },
];

const port = process.env.port || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.static("public"));

app.get("/api_v1/todos", (req, res) => {
	res.send(todos);
});

app.get("/api_v1/todos/:todoId", (req, res) => {
	const { todoId } = req.params;
	const requestedTodo = todos.find((todo) => todo.id === todoId);

	if (!requestedTodo) {
		res.sendStatus(404);
		return;
	}

	res.send(requestedTodo);
});

app.use("/", (_req, res) => {
	res.sendStatus(404);
});

app.listen(port, () =>
	console.log(`server is running on http://localhost:${port}`)
);
