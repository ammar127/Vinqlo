import { Campus, Degree } from "./campus";
import { Community } from "./community";

export interface User {
    token:string;
    firstName:string;
    lastName:string;
    image?: String;
    email:string;
    password:string;
    bio:string;
    degree:Degree;
    campus:Campus;
    phone:string;
    communities: Community[];
    saved:string;
    role:number;
    strikes:number;
    verified:string;
}
