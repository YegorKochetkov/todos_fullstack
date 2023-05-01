import { randomUUID } from "crypto";

let todos = [
	{ id: "1", title: "html", completed: true },
	{ id: "2", title: "css", completed: false },
	{ id: "3", title: "js", completed: false },
];

export function getAll() {
	return todos;
}

export function getById(todoId) {
	const requestedTodo = todos.find((todo) => todo.id === todoId);

	return requestedTodo || null;
}

export function create(title) {
	const newTodo = {
		id: randomUUID(),
		title,
		completed: false,
	};

	todos.push(newTodo);

	return newTodo;
}

export function remove(todoId) {
	todos = todos.filter((todo) => todo.id !== todoId);
}

export function update({ id, title, completed }) {
	const todo = getById(id);

	Object.assign(todo, { title, completed });

	return todo;
}

export function removeSeveral(ids) {
	if (!ids.every(getById)) {
		throw new Error("Some todos not found");
	}

	todos = todos.filter((todo) => !ids.includes(todo.id));
}

const todoService = {
	getAll,
	getById,
	create,
	remove,
	update,
	removeSeveral,
};

export default todoService;
