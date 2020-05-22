import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { Authenticator } from "../services/Authenticator"

export class UserController {

  signup(req: Request, res: Response) {
    try {
          console.log(req.body.name, req.body.email, req.body.password)

      new UserBusiness().signup(req.body.name, req.body.email, req.body.password)
        .then((result) => {
          res.status(200).send({token: new Authenticator().generateToken({id: result.id})});
        })
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
//   login = async (req: Request, res: Response) => {
//     try {

//       if (!req.body.email || !req.body.password) {
//         throw new Error(" Invalid email or password")
//       }
//       new UserBusiness().login(req.body.email, req.body.password)
//         .then((result) => {
//           //res.status(200).send({ message: "Usuário logado com sucesso" });
//         })
//     } catch (err) {
//       res.status(400).send({ err: err });

//     }
//   }
}