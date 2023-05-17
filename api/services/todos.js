import { Op } from "sequelize";
import { Todo, testConnection } from "../models/Todo.js";
import { sequelize } from "../utils/db.js";

export function normalize({ id, title, completed }) {
	return { id, title, completed };
}

export function getAll() {
	return Todo.findAll({
		order: [["createdAt", "ASC"]],
		logging: false,
	});
}

export function getById(todoId) {
	return Todo.findByPk(todoId);
}

export function create(title) {
	return Todo.create({ title });
}

export async function update({ id, title, completed }) {
	await testConnection();

	return Todo.update(
		{ title, completed },
		{
			where: { id },
		}
	);
}

export async function updateSeveral(todos) {
	return sequelize.transaction(async (t) => {
		const todosUpdatePromises = [];

		for (const { id, title, completed } of todos) {
			todosUpdatePromises.push(
				Todo.update(
					{ title, completed },
					{
						where: { id },
						transaction: t,
					}
				)
			);
		}

		await testConnection();
		await Promise.all(todosUpdatePromises);
	});
}

export async function remove(todoId) {
	await testConnection();

	return Todo.destroy({
		where: { id: todoId },
	});
}

export async function removeSeveral(ids) {
	await testConnection();

	// return sequelize.query("DELETE FROM todos WHERE id IN (:ids)", {
	// 	replacements: { ids },
	// 	type: QueryTypes.BULKDELETE,
	// });

	return Todo.destroy({
		where: {
			id: {
				[Op.in]: ids,
			},
		},
	});
}

const todoService = {
	getAll,
	getById,
	create,
	update,
	updateSeveral,
	remove,
	removeSeveral,
	normalize,
};

export default todoService;
