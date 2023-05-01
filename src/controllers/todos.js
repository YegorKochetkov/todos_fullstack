import todoService from "../services/todos.js";

export function getAll(_req, res) {
	const todos = todoService.getAll();

	res.send(todos);
}

export function getOne(req, res) {
	const { todoId } = req.params;
	const todo = todoService.getById(todoId);

	if (!todo) {
		res.sendStatus(404);
		return;
	}

	res.send(todo);
}

export function add(req, res) {
	const { title } = req.body;

	if (!title) {
		res.sendStatus(422);
		return;
	}

	const newTodo = todoService.create(title);

	res.statusCode = 201;
	res.send(newTodo);
}

export function remove(req, res) {
	const { todoId } = req.params;

	const todoToRemove = todoService.getById(todoId);

	if (!todoToRemove) {
		res.sendStatus(404);
		return;
	}

	todoService.remove(todoId);
	res.sendStatus(204);
}

export function update(req, res) {
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
}

export function removeSeveral(req, res) {
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
}

export function updateSeveral(req, res) {
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
}

const todoController = {
	getAll,
	getOne,
	add,
	remove,
	update,
	removeSeveral,
	updateSeveral,
};

export default todoController;
