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
	"postgres",
	"postgres",
	"Postgresqlpassword1",
	{
		host: "localhost",
		dialect: "postgres",
		dialectOptions,
	}
);
