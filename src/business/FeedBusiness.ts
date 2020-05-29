import { FeedDatabase } from "../data/FeedDatabase";
import moment from "moment";

export class FeedBusiness{

    public async createPost(
        id: string,
        photo: string,
        description: string,
        created_date: string,
        type: string,
        user_id: string
    ) {
        const formatedDate = moment(created_date,"DD/MM/YYYY").format("YYYY-MM-DD")
        return new FeedDatabase().createPost(id, photo, description, formatedDate, type, user_id);
    }
    public async getAllPost(id: string,idFriends:[])  {
        return new FeedDatabase().getAllPost(id,idFriends);
    }
    public async getAllPostByFilter(id: string,idFriends:[], type: string) {
        return new FeedDatabase().getAllPostByFilter(id,idFriends,type);
    }
}