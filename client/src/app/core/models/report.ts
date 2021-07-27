import { User } from "./User";

export interface Report
{
    slug:string;
    body:string;
    post:string;
    user:string;
    by:User;
    time:Date;
}
