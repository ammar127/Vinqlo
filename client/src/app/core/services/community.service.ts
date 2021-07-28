import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {


  constructor(private api:ApiService) { }
  getAll()
  {
    return this.api.get('/communities/get/all');
  }
  getFollowed() {return this.api.get('/communities/followed')}

}