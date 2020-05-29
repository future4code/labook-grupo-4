import {Request, Response} from "express";
import {IdGenerator} from "../services/IdGenerator";
import {Authenticator} from "../services/Authenticator";
import {FeedBusiness} from "../business/FeedBusiness";
import {FollowBusiness} from "../business/FollowBusiness";

export class FeedController {

    async createPost(req: Request, res: Response) {
        try {
            const id = new IdGenerator().createID()
            const userId = new Authenticator().verifyToken(req.headers.authorization as string).id;
            await new FeedBusiness().createPost(id, req.body.photo, req.body.descripition, req.body.createdData, req.body.type, userId);
            res.status(200).send({message: "Post criado com sucesso"});

        } catch (err) {
            res.status(400).send({err: err.message})
        }
    }

    async getPost(req: Request, res: Response) {
        try {
            const id = new Authenticator().verifyToken(req.headers.authorization as string).id
            const friends = await new FollowBusiness().getFriend(id)
            const post = await new FeedBusiness().getAllPost(id, friends)
            res.status(200).send({post});
        } catch (err) {
            res.status(400).send({err: err.message})
        }
    }

    async getPostByFilter(req: Request, res: Response) {
        try {
            const id = new Authenticator().verifyToken(req.headers.authorization as string).id
            const friends = await new FollowBusiness().getFriend(id)
            const post = await new FeedBusiness().getAllPostByFilter(id, friends, req.body.type)
            res.status(200).send({post});
        } catch (err) {
            res.status(400).send({err: err.message})
        }
    }
}