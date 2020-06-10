import dotenv from "dotenv";
dotenv.config();
import knex from "knex";
import Knex from "knex";

export abstract class BaseDataBase{
    getConnection(): Knex{
        return knex({
            client: "mysql",
            connection: {
              host: process.env.DB_HOST,
              port: Number(process.env.PORT || "3000"),
              user: process.env.DB_USER,
              password: process.env.DB_PASS,
              database: process.env.DB_DATABASE_NAME
            }
          })
    }
}