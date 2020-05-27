import dotenv from "dotenv";
import { Request, Response } from "express";
import express from "express";
import { AddressInfo } from "net";
import knex from "knex";
import { v4 } from "uuid";
import { UserController } from "./controller/UserController";
import { userRouter } from "./routes/UserRouter";
import { feedRouter } from "./routes/FeedRouter";
import {followRouter} from "./routes/FollowRouter";

dotenv.config();
const app = express();
app.use(express.json());


async function main():Promise<void>{
  app.use("/users", userRouter);
  app.use("/user", feedRouter);
  app.use("/friends", followRouter);
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