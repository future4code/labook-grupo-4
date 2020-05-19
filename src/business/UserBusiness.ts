import { UserDatabase } from "../data/UserDatabase";

export class UserBusiness{

    public async signup(id:string, name: string, email: string, password:string){
        return await new UserDatabase().signup(id, name, email, password);
    }
}