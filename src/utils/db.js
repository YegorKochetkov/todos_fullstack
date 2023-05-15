import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
	"postgres",
	"postgres",
	"Postgresqlpassword1",
	{
		host: "localhost",
		dialect: "postgres",
	}
);
