import {Request, Response} from "express";
import {IdGenerator} from "../services/IdGenerator";
import {Authenticator} from "../services/Authenticator";
import {FeedBusiness} from "../business/FeedBusiness";
import {FollowBusiness} from "../business/FollowBusiness";
import moment from "moment";

export class FeedController {

    async createPost(req: Request, res: Response) {
        try {
            const id = new IdGenerator().createID()
            const userId = new Authenticator().verifyToken(req.headers.authorization as string).id;
            const date = moment().format("YYYY-MM-DD");
            await new FeedBusiness().createPost(id, req.body.photo, req.body.descripition, date, req.body.type, userId);
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
            for(let i = 0; i < post[0].length; i++){
                const formatedDate = moment(post[0][i].created_date,"YYYY-MM-DD").format("DD/MM/YYYY")
                post[0][i].created_date = formatedDate
            }
            res.status(200).send({post});
        } catch (err) {
            res.status(400).send({err: err.message})
        }
    }

    async getPostByFilter(req: Request, res: Response) {
        try {
            if (req.body.type === "normal"|| req.body.type === "evento") {
                throw new Error("Informe se o tipo do post é normal ou evento")
            }
            if (req.body.type === "") {
                throw new Error("Informe pelo menos um tipo de post")
            }
            const id = new Authenticator().verifyToken(req.headers.authorization as string).id
            const friends = await new FollowBusiness().getFriend(id)
            const post = await new FeedBusiness().getAllPostByFilter(id, friends, req.body.type)
            for(let i = 0; i < post[0].length; i++){
                const formatedDate = moment(post[0][i].created_date,"YYYY-MM-DD").format("DD/MM/YYYY")
                post[0][i].created_date = formatedDate
            }
            res.status(200).send({post});
        } catch (err) {
            res.status(400).send({err: err.message})
        }
    }
}