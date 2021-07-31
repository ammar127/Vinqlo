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

  getAll(path: string) {return this.api.get(path);}
  toggleLike(type:number,slug:string){
    return this.api.get(`/posts/like/${type}/${slug}`)
  }
  searchByName(word:string){  return this.api.get('/users/search/'+word)}
}
