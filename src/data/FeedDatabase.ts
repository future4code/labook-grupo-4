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

        feed.push(await super.getConnection().raw(`SELECT * FROM ${FeedDatabase.USER_TABLE_NAME} 
        WHERE id_user = "${idUser}"`))
        const feedFriends: any =[]
        const ids = ["41a0618d-167e-4c23-8720-b1f658c36fff","380e8bfa-913c-4a4a-8a9d-4dfede8195cf"]

        for (let i = 0; i < ids.length; i++) {
            console.log(idFriends[i])
            let buffer = await super.getConnection().raw(`SELECT * FROM ${FeedDatabase.USER_TABLE_NAME} 
        WHERE id_user = "${ids[i]}" `);
            if (buffer.length > 0) {
                feedFriends.push(buffer)
            }
        }

        const feedFormated: any = []
        for(let i = 0; i < feed.length; i++) {

            feedFormated.push(feed[0][i])
        }
        for(let i = 0; i < feed.length; i++) {

            feedFormated.push(feedFriends[0][i])
        }

        return feedFormated;

    }

}