import express from "express";
import { FeedController } from "../controller/FeedController";

//linha responsável por criar um módulo de rotas no express
export const feedRouter = express.Router();

feedRouter.post("/create-post", new FeedController().createPost)
feedRouter.get("/get-post", new FeedController().getPost)