import express from "express";
import { FeedController } from "../controller/FeedController";

//linha responsável por criar um módulo de rotas no express
export const userRouter = express.Router();

userRouter.post("/create-post", new FeedController().createPost)