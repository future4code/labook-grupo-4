import { FeedDatabase } from "../data/FeedDatabase";

export class FeedBusiness{

    public async createPost(
        id: string,
        photo: string,
        description: string,
        created_date: string,
        type: string,
        user_id: string
    ) {
        return new FeedDatabase().createPost(id, photo, description, created_date, type, user_id);
    }
}