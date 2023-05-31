import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "imobiliaria", "root", "", {
        dialect: "mysql",
        host: "localhost",
        port: 3306
      });
