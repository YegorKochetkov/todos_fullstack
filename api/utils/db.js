import Sequelize from "sequelize";
import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

let dialectOptions = {
	ssl: {
		require: true,
	},
};

if (process.env.NODE_ENV === "local") {
	dialectOptions = {};
}

export const sequelize = new Sequelize(
	process.env.POSTGRES_DATABASE,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASSWORD,
	{
		host: process.env.POSTGRES_HOST,
		dialectModule: pg,
		dialect: "postgres",
		dialectOptions,
	}
);
