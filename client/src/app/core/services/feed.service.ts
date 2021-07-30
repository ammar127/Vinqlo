import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private apiService:ApiService) { }
  createPost(formData:any): Observable<any>
  {
    return this.apiService.post('/posts',formData);
  }
  getAllPosts():Observable<any>
  {
    return this.apiService.get('/posts/get/feed');
  }
}