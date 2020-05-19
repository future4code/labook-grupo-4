import { BaseDataBase } from "./BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class FeedDatabase extends BaseDataBase {
  private static USER_TABLE_NAME = "posts_labook";

  public async createPost(
    id: string,
    photo: string,
    description: string,
    created_date: string,
    type: string,
    user_id: string): Promise<void> {
      
    await super.getConnection().raw(`
        INSERT INTO ${FeedDatabase.USER_TABLE_NAME} (id, photo, description, created_date, type, user_id)
        VALUES ('${id}', '${photo}', '${description}', '${created_date}', '${type}', '${user_id}')
        `);
  }

}