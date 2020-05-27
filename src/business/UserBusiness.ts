import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {

  public async signup(name: string, email: string, password: string) {
    const id = new IdGenerator().createID()
    const hashPassword = await new HashManager().hash(password)
    new UserDatabase().signup(id, name, email, hashPassword);
    return { id: id };
  }
  public async login(email: string, password: string) {
    const userDatabase = new UserDatabase()
    const user = await userDatabase.getUserByEmail(email)

    const hashManager = new HashManager()
    const comparePassword = await hashManager.compare(password, user.password)

    if (!comparePassword) {
      throw new Error("Informação incorreta")
    }
    return {id: user.id}
  }
}