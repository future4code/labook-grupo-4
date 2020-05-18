import { v4 } from "uuid";

const id = v4();

export class IdGenerator {
  public createID():string{
    return id
  }
}