import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private api:ApiService) { }
  get(slug:string)
  {
    return this.api.get('/posts/'+slug);
  }
}
