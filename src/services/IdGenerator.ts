import { v4 } from "uuid";

export class IdGenerator {
  public createID():string{
    return v4();
  }
}