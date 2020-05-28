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
        INSERT INTO ${FeedDatabase.USER_TABLE_NAME} (id, photo, description, created_date, type, id_user)
        VALUES ('${id}', '${photo}', '${description}', '${created_date}', '${type}', '${user_id}')
        `);

    }

    public async getAllPost(
        idUser: string,
        idFriends: string[],
    ): Promise<any> {
        const feed: any = []
        feed.push(await super.getConnection().select("*")
            .from(FeedDatabase.USER_TABLE_NAME)
            .where({id_user: idUser}))
        const feedFriends: any = []


        for (let i = 0; i < idFriends.length; i++) {
            feedFriends.push(await super.getConnection().select("*")
                .from(FeedDatabase.USER_TABLE_NAME)
                .where({id_user: idFriends[i]}))

        }

        for(let i = 0; i < feedFriends.length; i++){
            for(let j = 0; j < feedFriends[i].length; j++){
                feed[0].push(feedFriends[i][j])
            }
        }

        return feed;

    }

}