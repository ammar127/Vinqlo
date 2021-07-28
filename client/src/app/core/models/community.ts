import { Category } from './category';
import { User } from "./User";

export interface Community
{
    name:string;
    slug:string;
    by:User;
    category:Category;
    members:User[];
    membersCount:number;
}
