import { BaseDataBase } from "./BaseDatabase";
import {v4} from "uuid";

export class UserDatabase extends BaseDataBase{
    tableName: string = "Users_arq";

    public async signup(id:string, name: string, email: string, password:string):Promise<void>{
        return await super.getConnection().raw(`INSERT INTO Users_arq (id, name, email)
        VALUES ('${id}', '${name}', '${email}', '${password}')`);
    }

}