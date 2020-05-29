import {FollowDatabase}  from "../data/FollowDataBase";

export class FollowBusiness{

    public async followUser(
        
        id: string,
        userId: string,
        userToFollowId: string
    ) {
        return await new FollowDatabase().followUser(id, userId, userToFollowId);
    }
    public async getFriend(id: string){
        return  await new FollowDatabase().getAllFriends(id)
    }

    public async unfollowUser(
        
        userId: string,
        userToFollowId: string
    ) {
        return await new FollowDatabase().unfollowUser(userId, userToFollowId);
    }

}