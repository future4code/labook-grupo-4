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
        user_id: string,
    ): Promise<any> {
        const buffer = await this.getConnection().select("user_to_follow_id")
            .from(FollowDatabase.USER_TABLE_NAME)
            .where({user_id})

        let friends: any = []
        if(buffer.length > 0){
            friends = buffer.map(item =>{
                return item.user_to_follow_id;
            })
        }
        return friends
    }
}