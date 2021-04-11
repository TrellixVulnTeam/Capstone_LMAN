import { Comment } from "./comment";
import { Image } from "./image";

export class PostDetail{
    id: number;
    accountPost: number;
    postedBy: '';
    dateCreated: Date;
    content: ''
    listImage: Array<Image> = new Array<Image>();
    totalLike: number;
    rateAverage: number;
    listComment: Array<Comment> = new Array<Comment>();
}