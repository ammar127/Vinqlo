import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private api:ApiService) { }
  postComment(body:any)
  {
    return this.api.post('/comments',body)
  }
}
