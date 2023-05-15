import todoService from "../services/todos.js";

export async function getAll(_req, res) {
	const todos = await todoService.getAll();

	res.send(todos.map(todoService.normalize));
}

export async function getOne(req, res) {
	const { todoId } = req.params;
	const todo = await todoService.getById(todoId);

	if (!todo) {
		res.sendStatus(404);
		return;
	}

	res.send(todoService.normalize(todo));
}

export async function add(req, res) {
	const { title } = req.body;

	if (!title) {
		res.sendStatus(422);
		return;
	}

	const newTodo = await todoService.create(title);

	res.statusCode = 201;
	res.send(todoService.normalize(newTodo));
}

export async function remove(req, res) {
	const { todoId } = req.params;

	const todoToRemove = await todoService.getById(todoId);

	if (!todoToRemove) {
		res.sendStatus(404);
		return;
	}

	await todoService.remove(todoId);
	res.sendStatus(204);
}

export async function update(req, res) {
	const { todoId } = req.params;
	const foundTodo = await todoService.getById(todoId);

	if (!foundTodo) {
		res.sendStatus(404);
		return;
	}

	const { title, completed } = req.body;

	if (typeof title !== "string" || typeof completed !== "boolean") {
		res.sendStatus(422);
		return;
	}

	await todoService.update({
		id: todoId,
		title,
		completed,
	});

	const updatedTodo = await todoService.getById(todoId);

	res.send(todoService.normalize(updatedTodo));
}

export async function updateSeveral(req, res) {
	const { items } = req.body;

	if (!Array.isArray(items)) {
		res.sendStatus(422);
		return;
	}

	try {
		await todoService.updateSeveral(items);
	} catch (error) {
		res.statusCode = 400;
		res.statusMessage = error.message;

		res.end();
		return;
	}

	res.sendStatus(204);
}

export async function removeSeveral(req, res) {
	const { ids } = req.body;

	if (!Array.isArray(ids)) {
		res.sendStatus(422);
		return;
	}

	try {
		await todoService.removeSeveral(ids);
	} catch (error) {
		res.statusCode = 400;
		res.statusMessage = error.message;

		res.end();
		return;
	}

	res.sendStatus(204);
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
