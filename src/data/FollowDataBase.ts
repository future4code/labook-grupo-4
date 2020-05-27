import { BaseDataBase } from "./BaseDatabase";
// import { token } from "../services/Authenticator";
​
export class FollowDatabase extends BaseDataBase{
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
        id: string,
    ): Promise<any> {
        const friends = await this.getConnection().raw(`SELECT user_to_follow_id FROM ${FollowDatabase.USER_TABLE_NAME} 
        WHERE user_id = ${id}`);
        console.log(friends);
        return friends
    }
}