import express from "express";
import { FollowController } from "../controller/FollowController";

//linha responsável por criar um módulo de rotas no express
export const followRouter = express.Router();

followRouter.post("/follow", new FollowController().followUser);
followRouter.delete("/unfollow", new FollowController().unfollowUser);