import {BaseDataBase} from "./BaseDatabase";

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
    
    public async getAllPost(
        idUser: string,
        idFriends: string[],
    ): Promise<any> {
      const feed: any = []
      feed.push(await super.getConnection().raw(`SELECT * FROM ${FeedDatabase.USER_TABLE_NAME} 
        WHERE id_user = ${idUser}`))
      for(let i = 0; i < idFriends.length; i++) {
        const buffer = await super.getConnection().raw(`SELECT * FROM ${FeedDatabase.USER_TABLE_NAME} 
        WHERE id_user = ${idFriends[i]}`);
        if(buffer.length > 0) {
          feed.push(buffer)
        }
      }
      return feed[0][0];

    }

}