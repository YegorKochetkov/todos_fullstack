import { sequelize } from "../utils/db.js";
import { DataTypes } from "sequelize";

export const Todo = sequelize.define(
	"Todo",
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		tableName: "todos",
	}
);
