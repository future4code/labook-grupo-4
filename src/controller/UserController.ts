import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { Authenticator } from "../services/Authenticator"

export class UserController {

  signup(req: Request, res: Response) {
    try {
      new UserBusiness().signup(req.body.name, req.body.email, req.body.password)
        .then((result) => {
          res.status(200).send({ token: new Authenticator().generateToken({ id: result.id }) });
        })
    } catch (err) {
      res.status(400).send({ err: err });
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const userBusiness = new UserBusiness()
      const logged = await userBusiness.login(email, password)

      const authenticator = new Authenticator()
      const token = authenticator.generateToken({ id: logged.id })

      res.status(200).send({ token })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  }
}