import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import { userRouter } from "./routes/UserRouter";
import { feedRouter } from "./routes/FeedRouter";
import {followRouter} from "./routes/FollowRouter";

dotenv.config();
const app = express();
app.use(express.json());


async function main():Promise<void>{
  app.use("/users", userRouter);
  app.use("/feed", feedRouter);
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