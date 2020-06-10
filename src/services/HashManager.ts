import * as bcrypt from "bcryptjs";

export class HashManager {
  public async hash(s: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST)
    const salt = await bcrypt.genSalt(rounds) 
    const hash = await bcrypt.hash(s, salt)
    return hash
  }
  public async compare(s:string, hash:string):Promise<boolean>{
    return await bcrypt.compare(s, hash)
  }
}