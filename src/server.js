import express from "express";
import cors from "cors";
import todoService from "./services/todos.js";

const corsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const port = process.env.port || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(express.static("public"));

// Get all todos
app.get("/api/v1/todos", (_req, res) => {
	const todos = todoService.getAll();

	res.send(todos);
});

// Get todo
app.get("/api/v1/todos/:todoId", (req, res) => {
	const { todoId } = req.params;
	const todo = todoService.getById(todoId);

	if (!todo) {
		res.sendStatus(404);
		return;
	}

	res.send(todo);
});

// Update todo
app.put("/api/v1/todos/:todoId", express.json(), (req, res) => {
	const { todoId } = req.params;
	const foundTodo = todoService.getById(todoId);

	if (!foundTodo) {
		res.sendStatus(404);
		return;
	}

	const { title, completed } = req.body;

	if (typeof title !== "string" || typeof completed !== "boolean") {
		res.sendStatus(422);
		return;
	}

	const updatedTodo = todoService.update({ id: todoId, title, completed });
	res.send(updatedTodo);
});

// Add todo
app.post("/api/v1/todos", express.json(), (req, res) => {
	const { title } = req.body;

	if (!title) {
		res.sendStatus(422);
		return;
	}

	const newTodo = todoService.create(title);

	res.statusCode = 201;
	res.send(newTodo);
});

// Delete todo
app.delete("/api/v1/todos/:todoId", (req, res) => {
	const { todoId } = req.params;

	const todoToRemove = todoService.getById(todoId);

	if (!todoToRemove) {
		res.sendStatus(404);
		return;
	}

	todoService.remove(todoId);
	res.sendStatus(204);
});

// Update\delete several todos
app.patch("/api/v1/todos", express.json(), (req, res) => {
	const { action } = req.query;

	if (action === "delete") {
		const { ids } = req.body;

		if (!Array.isArray(ids)) {
			res.sendStatus(422);
			return;
		}

		try {
			todoService.removeSeveral(ids);
		} catch (error) {
			res.statusCode = 422;
			res.statusMessage = error.message;

			res.end();
			return;
		}

		res.sendStatus(204);
		return;
	}

	if (action === "update") {
		const { items } = req.body;

		if (!Array.isArray(items)) {
			res.sendStatus(422);
			return;
		}

		const errors = [];

		for (const { id, title, completed } of items) {
			const foundTodo = todoService.getById(id);

			if (foundTodo) {
				todoService.update({ id, title, completed });
			} else {
				errors.push({ id, status: "NOT FOUND" });
			}
		}

		res.send({ errors });
		return;
	}

	res.sendStatus(400);
});

app.use("/", (_req, res) => {
	res.sendStatus(404);
});

app.listen(port, () =>
	console.log(`server is running on http://localhost:${port}`)
);
