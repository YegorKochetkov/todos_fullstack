import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";

const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

let todos = [
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

app.post("/api_v1/todos", express.json(), (req, res) => {
	const { title } = req.body;

	if (!title) {
		res.sendStatus(422);
		return;
	}

	const newTodo = {
		id: randomUUID(),
		title,
		completed: false,
	};

	todos.push(newTodo);

	res.statusCode = 201;
	res.send(newTodo);
});

app.delete("/api_v1/todos/:todoId", (req, res) => {
	const { todoId } = req.params;

	const updatedTodos = todos.filter((todo) => todo.id !== todoId);

	if (updatedTodos.length === todos.length) {
		res.sendStatus(404);
		return;
	}

	todos = updatedTodos;
	res.sendStatus(204);
});

app.use("/", (_req, res) => {
	res.sendStatus(404);
});

app.listen(port, () =>
	console.log(`server is running on http://localhost:${port}`)
);
