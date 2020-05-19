import {Request, Response} from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { FeedBusiness } from "../business/FeedBusiness";

export class FeedController {

    createPost(req: Request, res: Response) {
        try {
            const id = new IdGenerator().createID()

            const userId = new Authenticator().verifyToken(req.headers.authorization as string).id;

            new FeedBusiness().createPost(id, req.body.photo, req.body.descripition, req.body.createdData, req.body.type, userId);

            res.status(200).send({ message: "Post criado com sucesso"});

        } catch (err) {
            res.status(400).send({ err: err.message })
        }
    }
}