import { sequelize } from "../utils/db.js";
import { DataTypes } from "sequelize";

export const Todo = sequelize.define("todo", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	completed: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

export const testConnection = async () => {
	try {
		await Todo.sync();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database: ", error);
	}
};
