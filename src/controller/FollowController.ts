import {Request, Response} from "express";
import {IdGenerator} from "../services/IdGenerator";
import {Authenticator} from "../services/Authenticator";
import {FollowBusiness} from "../business/FollowBusiness";

​
export class FollowController {
​

    followUser(req: Request, res: Response) {
        try {
            const userToFollowId = req.body.userToFollowId
​
            if (!userToFollowId || userToFollowId === "") {
                throw new Error("Informe o usuario desejado para fazer amizade")
            }
​
            const userId = new Authenticator().verifyToken(req.headers.authorization as string).id;
​
            const id = new IdGenerator().createID()
​
            new FollowBusiness().followUser(
                id,
                userId,
                userToFollowId
            ).then(result => {
                res.status(200).send({message: "Amizade feita com sucesso"})
            })
​
        } catch (err) {
            res.status(400).send({err: err.message})
        }
    }
}