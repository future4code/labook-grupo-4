import {Request, Response} from "express";
import { UserBusiness } from "../business/UserBusiness";
import { IdGenerator } from "../services/IdGenerator";

export class UserController{
    
    signup(req: Request, res: Response){
        try{
          const id = String(new IdGenerator().createID)
          
          console.log(id, req.body.name, req.body.email, req.body.password)

           new UserBusiness().signup(id, req.body.name, req.body.email, req.body.password)
            .then((result)=>{
                res.status(200).send({ message: "Usuário criado com sucesso" });
            })
        }catch(err){
            res.status(400).send({ err: err });
        }
    }
}