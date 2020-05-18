import dotenv from "dotenv";
import { Request, Response } from "express";
import express from "express";
import { AddressInfo } from "net";
import knex from "knex";
import { v4 } from "uuid";
import { UserController } from "./controller/UserController";
import { userRouter } from "./routes/UserRouter";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/users/", userRouter);

async function main():Promise<void>{
  app.use("/users/", userRouter);
}
main()

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});