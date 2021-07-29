import { Community } from './community';
import { Comment } from './comment';
import { User } from './User';

export interface Post
{
    community:Community;
    title:string;
    body:string;
    tags:string[];
    image:string;
    slug:string;
    isLike:boolean;
    likeCount:number;
    by:User;
    comments:Comment[];
    time?: string;
}
