import { BaseDataBase } from "./BaseDatabase";

export class UserDatabase extends BaseDataBase {
  private static USER_TABLE_NAME = "user_labook"

  public async signup(id: string, name: string, email: string, password: string): Promise<void> {
    return await super.getConnection().raw(`INSERT INTO ${UserDatabase.USER_TABLE_NAME} (id, name, email, password)
        VALUES ('${id}', '${name}', '${email}', '${password}')`);
  }
  public async getUserByEmail(email: string): Promise<any> {
    const user = await super.getConnection()
      .select("*")
      .from(UserDatabase.USER_TABLE_NAME)
      .where({ email })
    
    return user[0]
  }
}
