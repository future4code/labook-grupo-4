import {BaseDataBase} from "./BaseDatabase";
// import { token } from "../services/Authenticator";
​
export class FollowDatabase extends BaseDataBase {
​
    private static USER_TABLE_NAME: string = "LabookUserFollow"
​

    public async followUser(
        id: string,
        userId: string,
        userToFollowId: string
    ): Promise<void> {
        await this.getConnection().raw(`INSERT INTO ${FollowDatabase.USER_TABLE_NAME} (id, user_id, user_to_follow_id)
            VALUES ('${id}', '${userId}', '${userToFollowId}')`);
    }

​

    public async getAllFriends(
        user_id: string,
    ): Promise<any> {
        const buffer = await this.getConnection().select("user_to_follow_id")
            .from(FollowDatabase.USER_TABLE_NAME)
            .where({user_id})

        let friends: any = []
        if (buffer.length > 0) {
            friends = buffer.map(item => {
                return item.user_to_follow_id;
            })
        }
        return friends
    }

    public async unfollowUser(
        userId: string,
        userToFollowId: string
    ): Promise<boolean> {
        const friendExist = await this.getConnection().raw(`SELECT * FROM ${FollowDatabase.USER_TABLE_NAME}
           WHERE user_id = '${userId}' AND user_to_follow_id = '${userToFollowId}'`);
        if (friendExist[0].length > 0) {
            await this.getConnection().raw(`DELETE FROM ${FollowDatabase.USER_TABLE_NAME}
        WHERE user_id = '${userId}' AND user_to_follow_id = '${userToFollowId}'`);
            return true
        } else {
            return false
        }


    }

}