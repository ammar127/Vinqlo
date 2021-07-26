export interface Campus
{
    name:string;
    campus:string;
    degrees: Degree[]
    slug:string;
}
export interface Degree
{
    name:string;
    slug:string;
}