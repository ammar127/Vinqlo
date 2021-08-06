import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private api:ApiService) { }

  createPost(formData:any): Observable<any>{ return this.api.post('/posts',formData);}
  get(slug:string)  {
    return this.api.get('/posts/'+slug);
  }
  getAll(path: string,page:number,type:number,query:string) {return this.api.get(`${path}?page=${page}&type=${type}${query!==''?'&title='+query:''}`);}
  toggleLike(type:number,slug:string){ return this.api.get(`/posts/like/${type}/${slug}`) }
  toggleSave(type:number,slug:string){ return this.api.get(`/posts/save/${type}/${slug}`) }
  searchByName(word:string){  return this.api.get('/users/search/'+word)}
  getNoComment(page:number){ return this.api.get(`/posts/get/noComment?limit=3&page=${page}`)}
}
